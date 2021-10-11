import { Pipe, PipeTransform } from '@angular/core';
import { Inspection } from '../models';

@Pipe({
  name: 'honeyProgress'
})
export class HoneyProgressPipe implements PipeTransform {

  transform(inspection: Inspection): string {
    return inspection.honey && inspection.honeyClosed ? `${inspection.honey} / ${inspection.honeyClosed}` : 'n/a';
  }
}
