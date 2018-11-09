import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LeagueService } from '../../shared/services/league.service';
import { League } from '../../shared/models/league.model';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'leagues-page',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent {
  leagues$;
  leagues: Array<League>;

  constructor(private router: Router, private leagueService: LeagueService, private calendar: NgbCalendar) {
    this.leagues = [];
  }

  ngOnInit() {
    this.leagues$ = this.leagueService.getLeagues();
  }

  goToLeague(league) {
    this.router.navigate(['leagues/', league.id]);
  }

  fromDate: NgbDate;
  toDate: NgbDate;
}
