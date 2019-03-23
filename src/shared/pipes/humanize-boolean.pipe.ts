import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'humanizeBoolean'})
export class HumanizeBooleanPipe implements PipeTransform {
    transform(value) {
        return value ? 'Yes' : 'No';
    }
}
