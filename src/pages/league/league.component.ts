import { Component } from '@angular/core';
import { Routes, ParamMap, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { LeagueService, LEAGUE_ROLES } from '../../shared/services/league.service';
import { AccountService } from '../../shared/services/account.service';
import { Manager } from '../../shared/models/manager.model';

@Component({
  selector: 'league-page',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent {
  league$: any;
  managers$: any;

  accountId: string;

  constructor(private route: ActivatedRoute, private leagueService: LeagueService, private authService: AccountService) {
  }

  ngOnInit() {
    this.accountId = this.authService.accountId;

    this.route.params.subscribe((params) => {
      this.league$ = this.leagueService.getLeague(params['id']);
      this.managers$ = this.leagueService.getManagers(params['id']);
    });
  }

  isOwner(managers: Array<Manager>): boolean {
    return managers.find((manager) => manager.leagueRole === LEAGUE_ROLES.OWNER)['accountId'] === this.accountId;
  }
}
