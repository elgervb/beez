import { TestBed } from '@angular/core/testing';

import { HiveService } from './hive.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HiveService', () => {
  let service: HiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(HiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
