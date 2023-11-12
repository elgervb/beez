import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { PwaCheckForUpdateService } from './pwa-check-for-update.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

describe('PwaCheckForUpdateService', () => {
  let spectator: SpectatorService<PwaCheckForUpdateService>;
  const createService = createServiceFactory({
    service: PwaCheckForUpdateService,
    mocks: [ SwUpdate, MatSnackBar ]
  });


  beforeEach(() => spectator = createService());

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
