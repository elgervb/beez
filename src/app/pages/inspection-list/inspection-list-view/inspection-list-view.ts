import { Component, ElementRef, input, output } from '@angular/core';
import { Inspection } from '../../../data/models';
import { RelativeDatePipe } from '../../../ui/pipes/relative-date.pipe';
import { BadgeComponent } from '../../../ui/badge/badge';
import { SwipeToDeleteRowDirective } from '../../../ui/swipe-to-delete-row/swipe-to-delete-row.directive';
import { EmptyStateComponent } from '../../../ui/empty-state/empty-state';

@Component({
  selector: 'bee-inspection-list-view',
  imports: [RelativeDatePipe, BadgeComponent, SwipeToDeleteRowDirective, EmptyStateComponent],
  templateUrl: './inspection-list-view.html',
  styleUrl: './inspection-list-view.css',
  host: { '(keydown)': 'onKeydown($event)' }
})
export class InspectionListViewComponent {
  readonly inspections = input.required<Inspection[]>();
  readonly selectedIds = input<string[]>([]);
  readonly editInspection = output<Inspection>();
  readonly deleteInspection = output<string>();
  readonly toggleSelected = output<{ id: string; checked: boolean }>();
  readonly addRequested = output<void>();

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  onSelectionToggle(event: Event, id: string): void {
    event.stopPropagation();
    this.toggleSelected.emit({ id, checked: !this.selectedIds().includes(id) });
  }

  onSelectionKeyToggle(event: KeyboardEvent, id: string): void {
    if (event.key !== ' ' && event.key !== 'Enter') return;
    event.preventDefault();
    this.toggleSelected.emit({ id, checked: !this.selectedIds().includes(id) });
  }

  onKeydown(event: KeyboardEvent): void {
    const items = Array.from(
      this.el.nativeElement.querySelectorAll<HTMLElement>('li.inspection-card')
    );
    if (!items.length) return;

    const focused = document.activeElement as HTMLElement;
    const currentLi = focused.closest<HTMLElement>('li.inspection-card');
    const currentIndex = currentLi ? items.indexOf(currentLi) : -1;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      items[(currentIndex + 1) % items.length].focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      items[(currentIndex - 1 + items.length) % items.length].focus();
    } else if (currentIndex >= 0 && focused === currentLi) {
      const inspection = this.inspections()[currentIndex];
      if (!inspection) return;
      if (event.key === 'e' || event.key === 'E') {
        event.preventDefault();
        this.editInspection.emit(inspection);
      } else if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        this.deleteInspection.emit(inspection.id);
      }
    }
  }

}
