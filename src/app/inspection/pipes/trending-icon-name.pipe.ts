import { Pipe, PipeTransform } from '@angular/core';
import { Inspection } from '../models';


export enum TrendingIconName {
  up = 'trending_up',
  down = 'trending_down',
  equal = 'compare_arrows'
}

@Pipe({
  name: 'trendingIconName'
})
export class TrendingIconNamePipe implements PipeTransform {

  transform(inspection: Inspection, inspectionList?: Inspection[]): unknown {
    const index = inspectionList?.indexOf(inspection);
    const isLastInspection = index && index + 1 === inspectionList?.length;

    if (inspectionList && index !== undefined && index !== -1 && !isLastInspection) {
      const compareTo = inspectionList[index + 1];

      if (compareTo) {
        const health1 = inspection.health;
        const health2 = compareTo.health;
        return health1 > health2 ? TrendingIconName.up : health1 < health2 ? TrendingIconName.down : TrendingIconName.equal;
      }
    }

    return TrendingIconName.equal;
  }

}
