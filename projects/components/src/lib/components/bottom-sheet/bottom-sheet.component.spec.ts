import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MaterialModule } from '../../material/material.module';
import { I18nextTestingModule } from 'src/app/shared/testing/i18next/i18next.testing.module';

import { BottomSheetComponent, SheetAction } from './bottom-sheet.component';

describe('BottomSheetComponent', () => {
  let component: BottomSheetComponent;
  let fixture: ComponentFixture<BottomSheetComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    declarations: [BottomSheetComponent],
    imports: [I18nextTestingModule, MaterialModule],
    providers: [{ provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }],
    teardown: { destroyAfterEach: false }
})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete hive action', done => {
    const sheetAction: SheetAction = { transKey: 'key', type: 'act' };
    component.action$.subscribe(action => {
      expect(action).toBe(sheetAction.type);
      done();
    });

    component.execute(sheetAction.type);
  });

});
