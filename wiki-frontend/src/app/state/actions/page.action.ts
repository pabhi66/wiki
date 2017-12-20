import { Action } from '@ngrx/store';
import { PayloadAction } from '../interfaces/payloadaction.interface';
import { IPageContent, Revisions } from '../interfaces/page-content.interface';

export const UPDATE_PAGE_DETAILS = 'UPDATE_PAGE_DETAILS';
export const REQ_PAGE = 'REQ_PAGE';
export const PAGE_COMPLETED = 'PAGE_COMPLETED';
export const PAGE_FAILED = 'PAGE_FAILED';
export const NEW_PAGE = 'NEW_PAGE';
export const NEW_PAGE_COMPLETED = 'NEW_PAGE_COMPLETED';
export const NEW_PAGE_FAILED = 'NEW_PAGE_FAILED';

export const updatePageDetails = (
  title: string,
  route: string,
  shortRoute: string,
  revisionid: number,
  modified: Date,
  author: number,
  pagedata: string,
  revisions: Revisions[],
): PayloadAction => {
  return {
    type: UPDATE_PAGE_DETAILS,
    payload: {
      title,
      route,
      shortRoute,
      revisionid,
      modified,
      author,
      pagedata,
      revisions,
    }
  };
};

export const reqPage = ( shortRoute: string ): PayloadAction => {
  return {
    type: REQ_PAGE,
    payload: {
      shortRoute: shortRoute,
    },
  };
};

export const pageCompleted = (): Action => {
  return {
    type: PAGE_COMPLETED,
  };
};

export const pageFailed = (): Action => {
  return {
    type: PAGE_FAILED,
  };
};

export const newPage = ( title: string ): PayloadAction => {
  return {
    type: NEW_PAGE,
    payload: {
      title,
    },
  };
};

export const newPageCompleted = ( newPageRoute: string ): PayloadAction => {
  return {
    type: NEW_PAGE_COMPLETED,
    payload: {
      newPageRoute,
    }
  };
};

export const newPageFailed = (): Action => {
  return {
    type: NEW_PAGE_FAILED,
  };
};
