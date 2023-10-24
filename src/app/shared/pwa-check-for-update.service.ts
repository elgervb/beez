import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concat, filter, first, interval } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PwaCheckForUpdateService {

  private readonly checkInterval = 6 * 60 * 60 * 1000

  constructor(private appRef: ApplicationRef, private swUpdate: SwUpdate, private snackbar: MatSnackBar) {}

  enableCheck(): void {
    if (this.swUpdate.isEnabled) {
      // update when needed
      this.swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(() => {
        const snack = this.snackbar.open('Update Available', 'Reload');
        snack
          .onAction()
          .subscribe(() => {
            this.swUpdate.activateUpdate().then(() => document.location.reload());
          });
      });

      // check for update
      const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
      const everySixHours$ = interval(this.checkInterval);
      const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

      everySixHoursOnceAppIsStable$.subscribe(() => this.swUpdate.checkForUpdate());

      // unrecoverable
      this.swUpdate.unrecoverable
        .subscribe(event => {
          const snack = this.snackbar.open(`Unrecoverable error ${event.reason}`, 'Reload');
          snack
            .onAction()
            .subscribe(() => document.location.reload());
        });
    }
  }
}
