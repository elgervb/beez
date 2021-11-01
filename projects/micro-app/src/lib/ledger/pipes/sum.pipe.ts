import { Pipe, PipeTransform } from '@angular/core';
import { LedgerEntry } from '../models';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {

  transform(value: LedgerEntry[] | null): number | null {
    if (value && value.length > 0) {
      return value.reduce((acc, cur) => acc + cur.amount, 0);
    }

    return null;
  }

}
