import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiveOverviewComponent } from './hive-overview.component';
import { HiveService } from '../../services/hive.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogModule } from '@angular/cdk-experimental/dialog';

describe('HiveOverviewComponent', () => {
  let component: HiveOverviewComponent;
  let fixture: ComponentFixture<HiveOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HiveOverviewComponent],
      imports: [
        RouterTestingModule,
        SharedModule,
        DialogModule,
        HttpClientTestingModule
      ],
      providers: [
        HiveService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiveOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
