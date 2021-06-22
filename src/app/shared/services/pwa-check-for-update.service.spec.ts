import { TestBed } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';
import { MaterialModule } from '../material/material.module';

import { PwaCheckForUpdateService } from './pwa-check-for-update.service';

describe('PwaCheckForUpdateService', () => {
  let service: PwaCheckForUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SwUpdate, useValue: {} },
      ],
      imports: [
        MaterialModule
      ]
    });
    service = TestBed.inject(PwaCheckForUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
