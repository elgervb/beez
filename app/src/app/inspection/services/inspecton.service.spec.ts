import { TestBed } from '@angular/core/testing';

import { InspectonService } from './inspecton.service';

describe('InspectonService', () => {
  let service: InspectonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspectonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
