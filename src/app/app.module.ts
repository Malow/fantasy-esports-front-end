import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginActivate } from '../shared/components/login-activate.component';
import { AccountService } from '../shared/services/account.service';
import { LeagueService } from '../shared/services/league.service';
import { ManagerService } from '../shared/services/manager.service';

//Pages
import { LeaguesComponent } from '../pages/leagues/leagues.component';
import { LeagueComponent } from '../pages/league/league.component';
import { HomeComponent } from '../pages/home/home.component';
import { NotFoundComponent } from '../errorpages/not-found.component';
import { LoginComponent } from '../pages/login/login.component';

//Components
import { TodaysMatchesComponent } from '../pages/home/components/todays-matches/todays-matches.component';
import { PreviousMatchesComponent } from '../pages/home/components/previous-matches/previous-matches.component';
import { NewsComponent } from '../pages/home/components/news/news.component';
import { CreateLeague } from '../pages/leagues/components/create-league/create-league.component';

//Pipes
import { HumanizeBooleanPipe } from '../shared/pipes/humanize-boolean.pipe';
import { FilterManagerPipe } from '../shared/pipes/filter-manager-pipe';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full', canActivate: [LoginActivate]},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [LoginActivate]},
  { path: 'leagues', component: LeaguesComponent, canActivate: [LoginActivate]},
  { path: 'leagues/:id', component: LeagueComponent, canActivate: [LoginActivate]},
  { path: '**', component: NotFoundComponent }
];

// Add an icon to the library for convenient access in other components
library.add(faSpinner, faCalendarAlt);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LeaguesComponent,
    HomeComponent,
    LoginComponent,
    LeagueComponent,
    TodaysMatchesComponent,
    PreviousMatchesComponent,
    NewsComponent,
    CreateLeague,
    HumanizeBooleanPipe,
    FilterManagerPipe
  ],
  imports: [
    NgbModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AccountService,
    LeagueService,
    LoginActivate,
    ManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
