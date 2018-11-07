import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LeagueService } from '../../shared/services/league.service';
import { League } from '../../shared/models/league.model';

@Component({
  selector: 'leagues-page',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent {
  leagues$;
  leagues: Array<League>;
  constructor(private router: Router, private leagueService: LeagueService) {
    this.leagues = [];
  }

  ngOnInit() {
    this.leagues$ = this.leagueService.getLeagues();
  }

  getLeagues() {

    return [
      {
        icon: '/assets/images/game-icons/starcraft.png',
        name: 'ESL One Katowice 2018',
        period: '2018-02-13 - 2018-06-30',
        owner: 'MaloW',
        id: '123'
      }, {
        icon: '/assets/images/game-icons/starcraft.png',
        name: 'ESL One Katowice 2018',
        period: '2018-02-13 - 2018-06-30',
        owner: 'MaloW',
        id: '123'
      }, {
        icon: '/assets/images/game-icons/starcraft.png',
        name: 'ESL One Katowice 2018',
        period: '2018-02-13 - 2018-06-30',
        owner: 'MaloW',
        id: '123'
      }, {
        icon: '/assets/images/game-icons/starcraft.png',
        name: 'ESL One Katowice 2018',
        period: '2018-02-13 - 2018-06-30',
        owner: 'MaloW',
        id: '123'
      }, {
        icon: '/assets/images/game-icons/starcraft.png',
        name: 'ESL One Katowice 2018',
        period: '2018-02-13 - 2018-06-30',
        owner: 'MaloW',
        id: '123'
      }
    ]
  }

  goToLeague(league) {
    this.router.navigate(['leagues/', league.id]);
  }
}
