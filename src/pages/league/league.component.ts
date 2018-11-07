import { Component } from '@angular/core';
import { Routes, ParamMap, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'league-page',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent {
  leagueId: string;

  constructor(private route: ActivatedRoute) {
    this.leagueId = '';
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.leagueId = params['id'];
    });
  }
}
