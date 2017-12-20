import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IStore } from '../../state/interfaces/store.interface';
import { Observable } from 'rxjs/Observable';
import { IPageContent } from '../../state/interfaces/page-content.interface';
import { reqPage } from '../../state/actions/page.action';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {

  page$: Observable<IPageContent>;

  constructor(private store: Store<IStore>, private _route: ActivatedRoute) {
    this.page$ = this.store.select(s => s.pageReducer);
  }

  ngOnInit() {
    this._route.params
      .map(p => p.link)
      .subscribe(link => {
        this.store.dispatch(reqPage(link));
      });
  }

}
