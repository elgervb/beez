import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueenOverviewComponent } from './queen-overview.component';
import { QueenService } from '../../services/queen.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DialogModule } from '@angular/cdk-experimental/dialog';

describe('QueenOverviewComponent', () => {
  let component: QueenOverviewComponent;
  let fixture: ComponentFixture<QueenOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QueenOverviewComponent],
      imports: [
        RouterTestingModule,
        SharedModule,
        DialogModule,
        HttpClientTestingModule
      ],
      providers: [QueenService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueenOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
