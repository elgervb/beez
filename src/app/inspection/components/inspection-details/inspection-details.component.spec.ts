import { ComponentFixture, TestBed } from '@angular/core/testing';
import { from } from '@elgervb/mock-data';
import { I18nextTestingModule } from 'src/app/shared/testing/i18next/i18next.testing.module';
import { Inspection } from '../../models';

import { InspectionDetailsComponent } from './inspection-details.component';

describe('InspectionDetailsComponent', () => {
  let component: InspectionDetailsComponent;
  let fixture: ComponentFixture<InspectionDetailsComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    declarations: [InspectionDetailsComponent],
    imports: [I18nextTestingModule],
    teardown: { destroyAfterEach: false }
})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionDetailsComponent);
    component = fixture.componentInstance;
    component.inspection = from<Inspection>('inspection');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
