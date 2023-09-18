import { TestBed } from '@angular/core/testing';

import { PwaCheckForUpdateService } from './pwa-check-for-update.service';

describe('PwaCheckForUpdateService', () => {
  let service: PwaCheckForUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PwaCheckForUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
