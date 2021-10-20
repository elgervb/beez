
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PwaCheckForUpdateService } from './shared/services/pwa-check-for-update.service';

@Component({
  selector: 'bee-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  title = 'beez';

  // allthough not being used, DI is calling the constructor ...
  /* eslint-disable @typescript-eslint/no-unused-vars */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(_: PwaCheckForUpdateService) { }
  /* eslint-enable @typescript-eslint/no-unused-vars */

}
