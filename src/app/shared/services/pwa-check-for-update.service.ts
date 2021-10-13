import { ApplicationRef, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PwaCheckForUpdateService {

  constructor(appRef: ApplicationRef, swUpdate: SwUpdate, snackbar: MatSnackBar,) {
    if (swUpdate.isEnabled) {
      // update when needed
      swUpdate.available.subscribe(() => {
        const snack = snackbar.open('Update Available', 'Reload');
        snack
          .onAction()
          .subscribe(() => {
            swUpdate.activateUpdate().then(() => document.location.reload());
          });
      });

      // check for update
      const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
      const everySixHours$ = interval(6 * 60 * 60 * 1000);
      const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

      everySixHoursOnceAppIsStable$.subscribe(() => swUpdate.checkForUpdate());

      // unrecoverable
      swUpdate.unrecoverable.subscribe(event => {
        const snack = snackbar.open(`Unrecoverable error ${event.reason}`, 'Reload');
        snack
          .onAction()
          .subscribe(() => document.location.reload());
      });
    }
  }

}
