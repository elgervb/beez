import { Component } from '@angular/core';
import { PwaCheckForUpdateService } from './shared/pwa-check-for-update/pwa-check-for-update.service';

@Component({
  selector: 'bee-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'beez';

  constructor(private pwaCheckForUpdate: PwaCheckForUpdateService) {
    this.pwaCheckForUpdate.enableCheck();
  }
}
