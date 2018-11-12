import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { League } from '../models/league.model';
import { Manager } from '../models/manager.model';

export enum URI {
  LEAGUES = '/league',
  LEAGUE = '/league/:id',
  MANAGERS = '/league/:id/manager'
}

export enum LEAGUE_ROLES {
  OWNER = 'OWNER'
}

@Injectable()
export class LeagueService extends HttpService {
  constructor(protected httpClient: HttpClient, private router: Router) {
    super(httpClient);
  }

  getLeague(leagueId: string): Observable<League> {
    return this.get<League>(URI.LEAGUE, {id: leagueId});
  }

  getLeagues(): Observable<Array<League>> {
    return this.get<Array<League>>(URI.LEAGUES);
  }

  createLeague(body): Observable<any> {
    return this.post(URI.LEAGUES, body);
  }

  getManagers(leagueId: string): Observable<Array<Manager>> {
    return this.get<Array<Manager>>(URI.MANAGERS, {id: leagueId});
  }
}
