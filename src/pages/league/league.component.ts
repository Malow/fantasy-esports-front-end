import { Component } from '@angular/core';
import { Routes, ParamMap, ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { LeagueService, LEAGUE_ROLES } from '../../shared/services/league.service';
import { ManagerService } from '../../shared/services/manager.service';
import { AccountService, UserResult } from '../../shared/services/account.service';
import { Manager } from '../../shared/models/manager.model';
import { League } from '../../shared/models/league.model';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'league-page',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent {
  league$: any;
  managers$: any;
  searchResult$: Observable<UserResult>;
  managers: Manager[];

  leagueId: string;
  accountId: string;

  constructor(private route: ActivatedRoute, private leagueService: LeagueService, private accountService: AccountService, private router: Router, private managerService: ManagerService) {
  }

  ngOnInit() {
    this.accountId = this.accountService.accountId;

    this.route.params.subscribe((params) => {
      this.leagueId = params['id'];
      this.league$ = this.leagueService.getLeague(this.leagueId);
      this.managers$ = this.leagueService.getManagers(this.leagueId);
    });
  }

  getOwner(managers: Array<Manager>): Manager {
    return managers.find((manager) => manager.leagueRole === LEAGUE_ROLES.OWNER);
  }

  getUser(): any {
    return this.accountService.getUser();
  }

  isInvited(managers: Manager[]): boolean {
    let myManager = managers.find((manager) => manager.accountId === this.accountId);
    return (myManager && myManager.leagueRole === LEAGUE_ROLES.INVITED);
  }

  joinLeague(managers: Manager[]) {
    this.managerService.joinLeague(managers.find((manager) => manager.accountId === this.accountId).id).subscribe((response) => {
      this.managers$ = this.leagueService.getManagers(this.leagueId);
      console.debug(LeagueComponent.name, response);
    }, (err) => {
      console.error(LeagueComponent.name, err.error.httpStatus);
    });
  }

  inviteManager(managerName: string, league: League) {
    this.accountService.findUser(managerName).subscribe((response: UserResult) => {
      if (response.accounts.length === 1) {
        this.leagueService.inviteManager(response.accounts[0].accountId, league.id).subscribe((data) => console.log(data));
      } else {
        console.error('Be more specific.');
      }
    })
  }

  findUsers(searchId: string) {
    if(searchId && searchId.length > 2) {
      this.searchResult$ = this.accountService.findUser(searchId);
    }
  }
}
