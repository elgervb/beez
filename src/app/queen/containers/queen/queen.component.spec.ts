import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { QueenService } from '../../services/queen.service';
import { QueenComponent } from './queen.component';

describe('QueenComponent', () => {
  let component: QueenComponent;
  let fixture: ComponentFixture<QueenComponent>;
  const queenService = {
    getQueens: jest.fn(),
    deleteQueen: jest.fn()
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [QueenComponent],
      imports: [
        MaterialModule,
        RouterTestingModule,
        SharedModule,
      ],
      providers: [
        { provide: QueenService, useValue: queenService }
      ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueenComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
