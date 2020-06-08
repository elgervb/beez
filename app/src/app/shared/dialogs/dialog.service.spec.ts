import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import { DialogModule } from '@angular/cdk-experimental/dialog';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DialogModule
      ]
    });
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
