import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concat, filter, first, interval, switchMap, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PwaCheckForUpdateService {

  private readonly checkInterval = 6 * 60 * 60 * 1000;

  constructor(private appRef: ApplicationRef, private swUpdate: SwUpdate, private snackbar: MatSnackBar) {}

  enableCheck(): void {
    if (this.swUpdate.isEnabled) {
      // update when needed
      this.swUpdate.versionUpdates
        .pipe(
          filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
          switchMap(() => this.snackbar.open('Update Available', 'Reload').onAction()),
          tap(() => this.swUpdate.activateUpdate().then(() => document.location.reload()))
        )
        .subscribe();

      // check for update
      const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
      const everySixHours$ = interval(this.checkInterval);
      const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

      everySixHoursOnceAppIsStable$.subscribe(() => this.swUpdate.checkForUpdate());

      // unrecoverable
      this.swUpdate.unrecoverable
        .pipe(
          switchMap(event => this.snackbar.open(`Unrecoverable error ${event.reason}`, 'Reload').onAction()),
          tap(() => document.location.reload())
        )
        .subscribe();
    }
  }

}
