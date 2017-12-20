import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import * as constants from '../../app.constants';
import { User } from '../../models/user';
import { NOOP } from '@angular/core/src/view/util';

const loginOptions = new RequestOptions({
  'withCredentials': true
});

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  getById(_id: string) {
    const url = constants.USERSURL + '/' + _id;
    return this.http.get(url, loginOptions)
    .map(response => response.json());
  }

  login(username: string, password: string) {

    const body = `{"uid":"${username}","psw":"${password}"}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.post(constants.LOGINURL, body, options)
    .map(response => response.json());
  }

  logout() {
    return this.http.put(constants.LOGOUTURL, null, loginOptions)
    .map(response => response.json());
  }

  signup(user: User) {
    return this.http.post(constants.SIGNUPURL, user, loginOptions)
    .map(response => response.json());
  }

}
