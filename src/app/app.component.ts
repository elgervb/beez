import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PwaCheckForUpdateService } from './shared/services/pwa-check-for-update.service';

@Component({
  selector: 'bee-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'beez';

  constructor(_: PwaCheckForUpdateService) { }

  ngOnInit(): void {

  }
}
