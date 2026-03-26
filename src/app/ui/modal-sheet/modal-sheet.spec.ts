import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ModalSheetComponent } from './modal-sheet';

@Component({
  imports: [ModalSheetComponent],
  template: `<bee-modal-sheet title="Test" (dismiss)="dismissed = true"><button type="button">Inside</button></bee-modal-sheet>`
})
class HostComponent {
  dismissed = false;
}

describe('ModalSheetComponent', () => {
  it('dismisses on Escape key', async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();

    expect(fixture.componentInstance.dismissed).toBe(true);
  });

  it('renders modal with focus trap attribute bindings', async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const dialog = host.querySelector('.modal-sheet');
    expect(dialog).not.toBeNull();
    expect(dialog?.getAttribute('role')).toBe('dialog');
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
  });
});
