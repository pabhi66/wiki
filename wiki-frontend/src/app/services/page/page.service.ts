import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import * as constants from '../../app.constants';

const loginOptions = new RequestOptions({
  'withCredentials': true
});

@Injectable()
export class PageService {

  constructor(private http: Http) {}

  getAll() {
    return this.http.get(constants.BASEURL + '/pages').map((response: Response) => response.json());
  }

  getById(pageid: string) {
    return this.http.get(constants.BASEURL + '/pages/' + pageid).map((response: Response) => response.json());
  }

  getCurrent(pageid: string) {
    return this.http.get(constants.BASEURL + '/pages/' + pageid + '/current').map((response: Response) => response.json());
  }

  getRevision(pageid: string, revisionid: string) {
    return this.http.get(constants.BASEURL + '/pages/' + pageid + '/revisions/' + revisionid).map((response: Response) => response.json());
  }

  addArticle(title: string) {
    return this.http.post(constants.BASEURL + '/pages', title, loginOptions);
  }
}
