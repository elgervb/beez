import { Component, ElementRef, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { Hive } from '../../../data/models';
import { BadgeComponent } from '../../../ui/badge/badge';

@Component({
  selector: 'bee-hive-list-view',
  imports: [RouterLink, BadgeComponent, TitleCasePipe],
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

  // ── Swipe-to-delete ─────────────────────────────────────────────────────────
  private swipeStartX: number | null = null;
  readonly swipeOffsets = signal<Record<string, number>>({});
  readonly swipingOutId = signal<string | null>(null);

  onTouchStart(id: string, event: TouchEvent): void {
    if (this.isActionTouch(event)) return;
    this.swipeStartX = event.touches[0].clientX;
  }

  onTouchMove(id: string, event: TouchEvent): void {
    if (this.isActionTouch(event) || this.swipeStartX === null) return;
    const delta = Math.min(0, event.touches[0].clientX - this.swipeStartX);
    this.swipeOffsets.update((o) => ({ ...o, [id]: delta }));
  }

  onTouchEnd(id: string, hive: Hive, event: TouchEvent): void {
    if (this.isActionTouch(event)) {
      this.swipeStartX = null;
      return;
    }

    const offset = this.swipeOffsets()[id] ?? 0;
    this.swipeOffsets.update((o) => { const n = { ...o }; delete n[id]; return n; });
    this.swipeStartX = null;
    if (offset < -72) {
      this.swipingOutId.set(id);
      setTimeout(() => {
        this.deleteHive.emit(hive.id);
        this.swipingOutId.set(null);
      }, 240);
    }
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

  swipeOffset(id: string): number {
    return this.swipeOffsets()[id] ?? 0;
  }

  private isActionTouch(event: TouchEvent): boolean {
    const target = event.target as Element | null;
    return !!target?.closest('.card-actions');
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
