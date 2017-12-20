import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IStore } from '../../../state/interfaces/store.interface';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<IStore>) {
    this.loggedIn$ = this.store.select(s => s.userReducer.loggedIn);
  }
  ngOnInit() {}
}
