import { Component, input, output } from '@angular/core';

/**
 * Reusable action column for swipe-card rows.
 * Renders an optional selection checkbox, an edit button, and a delete button.
 */
@Component({
  selector: 'bee-row-actions',
  imports: [],
  templateUrl: './row-actions.html',
  styleUrl: './row-actions.css'
})
export class RowActionsComponent {
  readonly selectable = input(false);
  readonly selected = input(false);
  readonly selectAriaLabel = input('');
  readonly editAriaLabel = input('');
  readonly deleteAriaLabel = input('');

  readonly toggleSelected = output<boolean>();
  readonly editItem = output<void>();
  readonly deleteItem = output<void>();

  onToggle(event: Event): void {
    event.stopPropagation();
    this.toggleSelected.emit(!this.selected());
  }

  onKeyToggle(event: KeyboardEvent): void {
    if (event.key !== ' ' && event.key !== 'Enter') return;
    event.preventDefault();
    this.toggleSelected.emit(!this.selected());
  }
}
