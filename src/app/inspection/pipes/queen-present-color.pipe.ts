import { Pipe, PipeTransform } from '@angular/core';
import { Inspection } from '../models';

export enum QueenPresentColors {
  present = 'green',
  maybe = 'orange',
  missing = 'red'
}

@Pipe({
  name: 'queenPresentColor'
})
export class QueenPresentColorPipe implements PipeTransform {

  transform(inspection: Inspection): QueenPresentColors {
    return inspection.queen || inspection.eggs ? QueenPresentColors.present :
      inspection.larva ? QueenPresentColors.maybe : QueenPresentColors.missing;
  }
}

