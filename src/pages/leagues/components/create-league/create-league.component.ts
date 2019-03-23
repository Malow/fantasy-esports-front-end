import { Component, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LeagueService } from '../../../../shared/services/league.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { League } from '../../../../shared/models/league.model';

@Component({
  selector: 'create-league',
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        height: '*'
      })),
      state('closed', style({
        opacity: 0,
        height: '0'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('* => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.css']
})
export class CreateLeague {
  createLeague: boolean;

  @Output() addLeagueEvent: EventEmitter<League> = new EventEmitter();

  constructor(private leagueService: LeagueService) {
    this.createLeague = false;
  }

  createNewLeague(leagueName: string, fromNgbDate: NgbDate, toNgbDate: NgbDate) {
    this.leagueService.createLeague({name: leagueName,
      startDate: new Date(toNgbDate.year, toNgbDate.month-1, toNgbDate.day),
      endDate: new Date(fromNgbDate.year, fromNgbDate.month-1, fromNgbDate.day)}).subscribe((data) => {
        this.addLeagueEvent.emit(data);
        this.createLeague = false;
      });
  }


}
