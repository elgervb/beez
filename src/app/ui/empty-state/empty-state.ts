import { Component, input, output } from '@angular/core';

@Component({
  selector: 'bee-empty-state',
  standalone: true,
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css'
})
export class EmptyStateComponent {
  readonly iconPath = input.required<string>();
  readonly title = input.required<string>();
  readonly hint = input.required<string>();
  readonly actionLabel = input.required<string>();
  readonly iconViewBox = input<string>('0 0 24 24');

  readonly action = output<void>();
}
