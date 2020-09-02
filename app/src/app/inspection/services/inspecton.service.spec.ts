import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { InspectionService } from './inspecton.service';

describe('InspectonService', () => {
  let service: InspectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(InspectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
