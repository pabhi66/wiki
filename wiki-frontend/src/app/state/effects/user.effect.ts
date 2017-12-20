import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { Observable, ObservableInput } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { PayloadAction } from '../interfaces/payloadaction.interface';
import { UserService } from '../../services/user/user.service';
import * as User from '../actions/user.action';

@Injectable()
export class UserEffects {
constructor(
    private actions$: Actions,
    private _userService: UserService,
    private router: Router
) {}

@Effect() login$: Observable<Action> = this.actions$.ofType(User.REQ_LOGIN)
    .switchMap( (action: PayloadAction): ObservableInput<Action> => {
        return this._userService.login(action.payload.username, action.payload.password)
        .mergeMap( (loginData) => {
            return this._userService.getById(loginData.userid)
            .mergeMap( (userData) => {
                return Observable.from([
                    User.updateUserDetails(
                        loginData.userid,
                        userData.username,
                        userData.first_name,
                        userData.last_name,
                        userData.email
                    ),
                    User.loginCompleted()
                ]);
            })
            .catch((err) => {
                return of(User.loginFailed());
            });
        })
        .catch((err) => {
            return of(User.loginFailed());
        });
    });

@Effect({dispatch: false})
loginComplete$: Observable<Action>= this.actions$.ofType(User.LOGIN_COMPLETED)
    .do(_ => this.router.navigate(['/']));

@Effect()
logout$: Observable<Action>= this.actions$.ofType(User.REQ_LOGOUT)
    .switchMap( (action: Action): ObservableInput<Action> => {
        return this._userService.logout()
        .switchMap((response) => {
            return of(User.logoutCompleted());
        })
        .catch((err) => {
            console.log('create observable: ' + err);
            return of(User.logoutFailed());
        });
    })
    .catch( (err) => {
        console.log('Request: ' + err);
        return of(User.logoutFailed());
    });

@Effect({dispatch: false})
logoutComplete$: Observable<Action>= this.actions$.ofType(User.LOGOUT_COMPLETED)
    .do(_ => this.router.navigate(['/']));

}
