import { Component, ElementRef, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { Hive } from '../../../data/models';
import { BadgeComponent } from '../../../ui/badge/badge';
import { SwipeToDeleteRowDirective } from '../../../ui/swipe-to-delete-row/swipe-to-delete-row.directive';
import { EmptyStateComponent } from '../../../ui/empty-state/empty-state';

@Component({
  selector: 'bee-hive-list-view',
  imports: [RouterLink, BadgeComponent, TitleCasePipe, SwipeToDeleteRowDirective, EmptyStateComponent],
  templateUrl: './hive-list-view.html',
  styleUrl: './hive-list-view.css',
  host: { '(keydown)': 'onKeydown($event)' }
})
export class HiveListViewComponent {
  readonly apiaryId = input.required<string>();
  readonly hives = input.required<Hive[]>();
  readonly inspectionLabels = input.required<Partial<Record<string, string>>>();
  readonly healthScores = input.required<Partial<Record<string, number>>>();
  readonly trendLabels = input.required<Partial<Record<string, 'Improving' | 'Stable' | 'Declining'>>>();
  readonly dueLabels = input.required<Partial<Record<string, string>>>();
  readonly isDueByHive = input.required<Partial<Record<string, boolean>>>();
  readonly selectedIds = input<string[]>([]);
  readonly editHive = output<Hive>();
  readonly deleteHive = output<string>();
  readonly addRequested = output<void>();
  readonly toggleSelected = output<{ id: string; checked: boolean }>();

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  healthVariant(score: number): 'danger' | 'warning' | 'success' {
    if (score < 50) return 'danger';
    if (score <= 70) return 'warning';
    return 'success';
  }

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
    const links = Array.from(
      this.el.nativeElement.querySelectorAll<HTMLAnchorElement>('li.card-row .card-link')
    );
    if (!links.length) return;

    const focused = document.activeElement as HTMLElement;
    const currentIndex = links.indexOf(focused as HTMLAnchorElement);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      links[(currentIndex + 1) % links.length].focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      links[(currentIndex - 1 + links.length) % links.length].focus();
    } else if (currentIndex >= 0) {
      const hive = this.hives()[currentIndex];
      if (!hive) return;
      if (event.key === 'e' || event.key === 'E') {
        event.preventDefault();
        this.editHive.emit(hive);
      } else if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        this.deleteHive.emit(hive.id);
      }
    }
  }
}
