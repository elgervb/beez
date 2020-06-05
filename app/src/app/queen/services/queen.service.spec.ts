import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { QueenService } from './queen.service';

describe('QueenService', () => {
  let service: QueenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(QueenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
