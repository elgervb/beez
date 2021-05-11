import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { QueenService } from '../../services/queen.service';
import { QueenEditComponent } from './queen-edit.component';

describe('QueenEditComponent', () => {
  let component: QueenEditComponent;
  let fixture: ComponentFixture<QueenEditComponent>;
  let route: ActivatedRoute;
  const queenService: Partial<QueenService> = {
    getQueen: jest.fn()
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [QueenEditComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: QueenService, useValue: queenService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueenEditComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load a queen', () => {
    const queenId = 'qId';
    jest.spyOn(route.snapshot.paramMap, 'get').mockReturnValue(queenId);
    component.ngOnInit();

    expect(queenService.getQueen).toHaveBeenCalledWith(queenId);
  });
});
