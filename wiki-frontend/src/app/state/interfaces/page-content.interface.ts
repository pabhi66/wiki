import { IPage } from './page.interface';

export interface Revisions {
  route: string;
  RevisionId: number;
}

export interface IPageContent extends IPage {
  revisionid: number;
  modified: Date;
  author: number;
  pagedata: string;
  revisions: Revisions[];
  getPageContentInProgress: boolean;
  getPageContentFailed: boolean;
}
