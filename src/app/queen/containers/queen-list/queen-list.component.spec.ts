import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MaterialModule } from 'components';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18nextTestingModule } from 'src/app/shared/testing/i18next/i18next.testing.module';
import { QueenService } from '../../services/queen.service';
import { QueenListComponent } from './queen-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('QueenListComponent', () => {
  let component: QueenListComponent;
  let fixture: ComponentFixture<QueenListComponent>;
  const queenService = {
    getQueens: jest.fn(),
    deleteQueen: jest.fn()
  };

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ QueenListComponent ],
      imports: [
        I18nextTestingModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
        SharedModule,
      ],
      providers: [ { provide: QueenService, useValue: queenService } ],
      schemas: [ NO_ERRORS_SCHEMA ],
      teardown: { destroyAfterEach: false }
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueenListComponent);
    component = fixture.componentInstance;

    queenService.getQueens.mockReturnValue(of());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
