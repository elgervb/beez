import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { I18NextModule } from 'angular-i18next';
import { MaterialModule } from '../../material/material.module';
import { BottomSheetComponent, SheetAction } from './bottom-sheet.component';

describe('BottomSheetComponent', () => {
  let component: BottomSheetComponent;
  let fixture: ComponentFixture<BottomSheetComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ BottomSheetComponent ],
      imports: [ I18NextModule.forRoot(), MaterialModule ],
      providers: [ { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} } ],
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
