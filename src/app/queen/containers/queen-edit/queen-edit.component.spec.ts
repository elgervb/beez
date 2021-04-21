import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueenEditComponent } from './queen-edit.component';
import { Store, StoreModule } from '@ngrx/store';

describe('QueenEditComponent', () => {
  let component: QueenEditComponent;
  let fixture: ComponentFixture<QueenEditComponent>;
  let store: Store;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [QueenEditComponent]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueenEditComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
