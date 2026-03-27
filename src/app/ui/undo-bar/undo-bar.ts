import { Component, input, output } from '@angular/core';

@Component({
  selector: 'bee-undo-bar',
  standalone: true,
  templateUrl: './undo-bar.html',
  styleUrl: './undo-bar.css'
})
export class UndoBarComponent {
  readonly message = input.required<string>();
  readonly actionLabel = input<string>('Undo');
  readonly ariaLive = input<'off' | 'polite' | 'assertive'>('polite');

  readonly action = output<void>();
}
