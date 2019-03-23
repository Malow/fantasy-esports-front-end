import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Manager } from '../models/manager.model';
import { LEAGUE_ROLES } from './league.service';

export enum URI {
  MANAGER = '/manager/:id'
}

@Injectable()
export class ManagerService extends HttpService {
  constructor(protected httpClient: HttpClient, private router: Router) {
    super(httpClient);
  }

  joinLeague(managerId: string): Observable<any> {
    return this.patch(URI.MANAGER, {leagueRole: LEAGUE_ROLES.MEMBER}, {id: managerId});
  }
}
