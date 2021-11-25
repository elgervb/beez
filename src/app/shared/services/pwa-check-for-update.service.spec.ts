import { TestBed } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';
import { MaterialModule } from 'components';

import { PwaCheckForUpdateService } from './pwa-check-for-update.service';

describe('PwaCheckForUpdateService', () => {
  let service: PwaCheckForUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [{ provide: SwUpdate, useValue: {} },],
    imports: [MaterialModule],
    teardown: { destroyAfterEach: false }
});
    service = TestBed.inject(PwaCheckForUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
