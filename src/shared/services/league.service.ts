import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { League } from '../models/league.model';

export enum URI {
  LEAGUES = '/league',
}

@Injectable()
export class LeagueService extends HttpService {
  constructor(protected httpClient: HttpClient, private router: Router) {
    super(httpClient);
  }

  getLeagues(): Observable<Array<League>> {
    return this.get<Array<League>>(URI.LEAGUES);
  }
}
