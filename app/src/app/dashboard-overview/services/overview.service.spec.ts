import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OverviewService } from './overview.service';

describe('OverviewService', () => {
  let service: OverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(OverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
