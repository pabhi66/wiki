import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { reducers, metaReducers } from './state/reducers';
import { UserEffects } from './state/effects/user.effect';
import { PagesEffects } from './state/effects/pages.effect';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { RoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { UserService } from './services/user/user.service';
import { PageService } from './services/page/page.service';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { AboutComponent } from './components/shared/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ArticleComponent } from './components/article/article.component';
import { PageEffects } from './state/effects/page.effect';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    ArticleComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      reducers,
      {metaReducers}
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    RoutingModule,
    EffectsModule.forRoot([
      UserEffects,
      PagesEffects,
      PageEffects,
    ]),
  ],
  providers: [UserService, PageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
