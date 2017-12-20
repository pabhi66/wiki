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

import { PayloadAction } from '../interfaces/payloadaction.interface';
import { PageService } from '../../services/page/page.service';
import * as Page from '../actions/page.action';
import * as constants from '../../app.constants';


@Injectable()
export class PageEffects {
constructor(
    private actions$: Actions,
    private _pageService: PageService,
    private router: Router
) {}

@Effect() reqPage$: Observable<Action> = this.actions$.ofType(Page.REQ_PAGE)
    .switchMap( (action: PayloadAction): ObservableInput<Action> => {
        return this._pageService.getById(action.payload.shortRoute)
        .mergeMap( (pageData) => {
            return Observable.from([
                Page.updatePageDetails(
                    pageData[0].title,
                    constants.PAGESURL + '/' + action.payload.shortRoute,
                    action.payload.shortRoute,
                    pageData[0].revisionid,
                    pageData[0].modified,
                    pageData[0].author,
                    pageData[0].pagedata,
                    pageData[0].revisions.route,
                ),
                Page.pageCompleted()
            ]);
        })
        .catch((err) => {
            return of(Page.pageFailed());
        });
    });

@Effect() newPage$: Observable<Action> = this.actions$.ofType(Page.NEW_PAGE)
    .switchMap( (action: PayloadAction): ObservableInput<Action> => {
        return this._pageService.addArticle(action.payload.title)
        .mergeMap( (newPageData) => {
            return of(Page.newPageCompleted(newPageData.msg));
        })
        .catch((err) => {
            return of(Page.newPageFailed());
        });
    });

@Effect({dispatch: false})
newPageComplete$: Observable<Action>= this.actions$.ofType(Page.NEW_PAGE_COMPLETED)
    .do( (action: PayloadAction) => this.router.navigate([
        'pages',
        action.payload.newPageRoute.split('/').reverse()[0]
    ]));

}
