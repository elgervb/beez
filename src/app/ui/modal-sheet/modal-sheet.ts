import { CdkTrapFocus } from '@angular/cdk/a11y';
import { Component, HostListener, input, output } from '@angular/core';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'bee-modal-sheet',
  standalone: true,
  imports: [CdkTrapFocus, TranslatePipe],
  templateUrl: './modal-sheet.html',
  styleUrl: './modal-sheet.css'
})
export class ModalSheetComponent {
  readonly title = input.required<string>();
  readonly dismiss = output<void>();

  @HostListener('window:keydown.escape', ['$event'])
  onEscapeKey(event: Event): void {
    event.preventDefault();
    this.dismiss.emit();
  }
}
