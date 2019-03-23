import {Pipe, PipeTransform} from '@angular/core';
import { Manager } from '../models/manager.model';
import { LEAGUE_ROLES } from '../services/league.service';

@Pipe({name: 'filterManagers'})
export class FilterManagerPipe implements PipeTransform {
    transform(managers: Manager[], leagueRole: LEAGUE_ROLES | LEAGUE_ROLES[]) {
      if (Array.isArray(leagueRole)) {
        return managers.filter((manager) => leagueRole.includes(manager.leagueRole as LEAGUE_ROLES));
      } else {
        return managers.filter((manager) => manager.leagueRole === leagueRole);
      }
    }
}
