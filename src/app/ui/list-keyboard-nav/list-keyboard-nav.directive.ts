import { Directive, ElementRef, inject, input, output } from '@angular/core';

/**
 * Adds keyboard navigation to a list component:
 * - ArrowUp / ArrowDown  → move focus between items matching `focusSelector`
 * - E                    → emit `editItem` for the currently focused item
 * - Delete / Backspace   → emit `deleteItem` for the currently focused item
 *
 * Works with both "focus is the item" and "focus is inside the item" patterns
 * by using `Element.contains()` to find the matching parent.
 */
@Directive({
  selector: '[beeListKeyboardNav]',
  host: { '(keydown)': 'onKeydown($event)' }
})
export class ListKeyboardNavDirective<T> {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  /** CSS selector that identifies each navigable row inside the host element. */
  readonly focusSelector = input.required<string>();
  /** Items array — must be in the same order as the DOM rows. */
  readonly items = input.required<T[]>();

  readonly editItem = output<T>();
  readonly deleteItem = output<T>();

  onKeydown(event: KeyboardEvent): void {
    const selector = this.focusSelector();
    const rows = Array.from(this.el.nativeElement.querySelectorAll<HTMLElement>(selector));
    if (!rows.length) return;

    const focused = document.activeElement as HTMLElement;
    const currentIndex = rows.findIndex((row) => row === focused || row.contains(focused));

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      rows[(currentIndex + 1) % rows.length].focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      rows[(currentIndex - 1 + rows.length) % rows.length].focus();
    } else if (currentIndex >= 0) {
      const item = this.items()[currentIndex];
      if (!item) return;
      if (event.key === 'e' || event.key === 'E') {
        event.preventDefault();
        this.editItem.emit(item);
      } else if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        this.deleteItem.emit(item);
      }
    }
  }
}
