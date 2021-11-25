import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CenteredLayoutComponent } from './centered-layout.component';

describe('CenteredLayoutComponent', () => {
  let component: CenteredLayoutComponent;
  let fixture: ComponentFixture<CenteredLayoutComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    declarations: [CenteredLayoutComponent],
    imports: [RouterTestingModule],
    teardown: { destroyAfterEach: false }
})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenteredLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
