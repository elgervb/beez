import { Component, ElementRef, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Apiary } from '../../../data/models';

@Component({
  selector: 'bee-apiary-list-view',
  imports: [RouterLink],
  templateUrl: './apiary-list-view.html',
  styleUrl: './apiary-list-view.css',
  host: { '(keydown)': 'onKeydown($event)' }
})
export class ApiaryListViewComponent {
  readonly apiaries = input.required<Apiary[]>();
  readonly hiveCounts = input.required<Partial<Record<string, number>>>();
  readonly editApiary = output<Apiary>();
  readonly deleteApiary = output<string>();
  readonly addRequested = output<void>();

  constructor(private el: ElementRef<HTMLElement>) {}

  // ── Swipe-to-delete ─────────────────────────────────────────────────────────
  private swipeStartX: number | null = null;
  private swipeTargetId: string | null = null;
  readonly swipeOffsets = signal<Record<string, number>>({});
  readonly swipingOutId = signal<string | null>(null);

  onTouchStart(id: string, event: TouchEvent): void {
    this.swipeStartX = event.touches[0].clientX;
    this.swipeTargetId = id;
  }

  onTouchMove(id: string, event: TouchEvent): void {
    if (this.swipeStartX === null) return;
    const delta = Math.min(0, event.touches[0].clientX - this.swipeStartX);
    this.swipeOffsets.update((o) => ({ ...o, [id]: delta }));
  }

  onTouchEnd(id: string, apiary: Apiary): void {
    const offset = this.swipeOffsets()[id] ?? 0;
    this.swipeOffsets.update((o) => { const n = { ...o }; delete n[id]; return n; });
    this.swipeStartX = null;
    this.swipeTargetId = null;
    if (offset < -72) {
      this.swipingOutId.set(id);
      setTimeout(() => {
        this.deleteApiary.emit(apiary.id);
        this.swipingOutId.set(null);
      }, 240);
    }
  }

  swipeOffset(id: string): number {
    return this.swipeOffsets()[id] ?? 0;
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
      const apiary = this.apiaries()[currentIndex];
      if (!apiary) return;
      if (event.key === 'e' || event.key === 'E') {
        event.preventDefault();
        this.editApiary.emit(apiary);
      } else if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        this.deleteApiary.emit(apiary.id);
      }
    }
  }
}
