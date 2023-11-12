import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { AppComponent } from './app.component';

import { PwaCheckForUpdateService } from './shared/pwa-check-for-update.service';


describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [ RouterTestingModule ],
    mocks: [ PwaCheckForUpdateService ]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
