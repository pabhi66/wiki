import * as Page from '../actions/page.action';
import { PayloadAction } from '../interfaces/payloadaction.interface';
import { Action } from '@ngrx/store';
import { IPageContent } from '../interfaces/page-content.interface';

const storeInitialState: IPageContent = {
  title: undefined,
  route: undefined,
  shortRoute: undefined,
  revisionid: undefined,
  modified: undefined,
  author: undefined,
  pagedata: undefined,
  revisions: [],
  getPageContentInProgress: false,
  getPageContentFailed: false,
  createPageFailed: false,
  createPageInProgress: false,
  newPageRoute: undefined,
};


export function pageReducer(state: IPageContent = storeInitialState, action: PayloadAction): IPageContent {
  if (action.type === Page.UPDATE_PAGE_DETAILS) {
    return Object.assign(
      {},
      state,
      action.payload,
    );
  }

  if (action.type === Page.REQ_PAGE) {
    return Object.assign(
      {},
      state,
      action.payload,
      {getPageContentInProgress: true}
    );
  }

  if (action.type === Page.PAGE_COMPLETED) {
    return Object.assign(
      {},
      state,
      action.payload,
      {getPageContentInProgress: false, getPageContentFailed: false}
    );
  }

  if (action.type === Page.PAGE_FAILED) {
    return Object.assign(
      {},
      state,
      {getPageContentInProgress: false, getPageContentFailed: true}
    );
  }

  if (action.type === Page.NEW_PAGE) {
    return Object.assign(
      {},
      state,
      action.payload,
      {createPageInProgress: true}
    );
  }

  if (action.type === Page.NEW_PAGE_COMPLETED) {
    return Object.assign(
      {},
      state,
      action.payload,
      {createPageInProgress: false, createPageFailed: false}
    );
  }

  if (action.type === Page.NEW_PAGE_FAILED) {
    return Object.assign(
      {},
      state,
      {createPageInProgress: false, createPageFailed: true}
    );
  }

  return state;

}
