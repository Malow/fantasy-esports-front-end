import { Component } from '@angular/core';
import { Routes, ParamMap, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { LeagueService } from '../../shared/services/league.service';

@Component({
  selector: 'league-page',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent {
  league$: any;

  constructor(private route: ActivatedRoute, private leagueService: LeagueService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.league$ = this.leagueService.getLeague(params['id']);
    });
  }
}
