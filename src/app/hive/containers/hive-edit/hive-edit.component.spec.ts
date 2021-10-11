import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nextTestingModule } from 'src/app/shared/testing/i18next/i18next.testing.module';
import { HiveService } from '../../services/hive.service';

import { HiveEditComponent } from './hive-edit.component';

describe('HiveEditComponent', () => {
  let component: HiveEditComponent;
  let fixture: ComponentFixture<HiveEditComponent>;
  let route: ActivatedRoute;
  const hiveService: Partial<HiveService> = {
    getHive: jest.fn()
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ HiveEditComponent ],
      imports: [
        I18nextTestingModule,
        RouterTestingModule
      ],
      providers: [ { provide: HiveService, useValue: hiveService } ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiveEditComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load a hive', () => {
    const hiveId = 'qId';
    jest.spyOn(route.snapshot.paramMap, 'get').mockReturnValue(hiveId);
    component.ngOnInit();

    expect(hiveService.getHive).toHaveBeenCalledWith(hiveId);
  });
});
