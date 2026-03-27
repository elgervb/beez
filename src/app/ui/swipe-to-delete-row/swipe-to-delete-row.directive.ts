import { Directive, OnDestroy, computed, input, output, signal } from '@angular/core';

@Directive({
  selector: '[beeSwipeToDeleteRow]',
  standalone: true,
  host: {
    '[class.swiping]': 'isSwiping()',
    '[class.swipe-out]': 'isSwipingOut()',
    '[style.transform]': 'transform()',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'onPointerUp($event)',
    '(pointercancel)': 'onPointerCancel($event)',
    '(dragstart)': 'onDragStart($event)',
    '(touchstart)': 'onTouchStart($event)',
    '(touchmove)': 'onTouchMove($event)',
    '(touchend)': 'onTouchEnd($event)',
    '(touchcancel)': 'onTouchCancel()'
  }
})
export class SwipeToDeleteRowDirective implements OnDestroy {
  readonly beeSwipeToDeleteRow = input.required<string>();
  readonly swipeThreshold = input<number>(72);
  readonly swipeOutDurationMs = input<number>(240);
  readonly swipeIgnoreSelector = input<string>('.card-actions');

  readonly beeSwipeDelete = output<string>();

  private touchStartX: number | null = null;
  private pointerStartX: number | null = null;
  private pointerId: number | null = null;
  private pointerDragging = false;
  private readonly pointerDragStartThresholdPx = 8;
  private readonly offset = signal<number>(0);
  private readonly swipingOut = signal<boolean>(false);
  private swipeOutTimer: ReturnType<typeof setTimeout> | null = null;

  readonly isSwiping = computed(() => this.offset() < 0 && !this.swipingOut());
  readonly isSwipingOut = computed(() => this.swipingOut());
  readonly transform = computed(() => `translateX(${this.offset()}px)`);

  onPointerDown(event: PointerEvent): void {
    if (event.pointerType === 'touch') return;
    if (event.button !== 0) return;
    if (this.shouldIgnoreTarget(event.target as Element | null)) return;

    this.pointerStartX = event.clientX;
    this.pointerId = event.pointerId;
    this.pointerDragging = false;
  }

  onPointerMove(event: PointerEvent): void {
    if (event.pointerType === 'touch') return;
    if (this.pointerStartX === null || this.pointerId !== event.pointerId) return;

    const delta = event.clientX - this.pointerStartX;
    if (!this.pointerDragging) {
      if (delta > -this.pointerDragStartThresholdPx) return;
      this.pointerDragging = true;
      this.setPointerCapture(event.currentTarget, event.pointerId);
    }

    this.offset.set(Math.min(0, delta));
    event.preventDefault();
  }

  onPointerUp(event: PointerEvent): void {
    if (event.pointerType === 'touch') return;
    if (this.pointerStartX === null || this.pointerId !== event.pointerId) return;

    if (!this.pointerDragging) {
      this.pointerStartX = null;
      this.pointerId = null;
      this.pointerDragging = false;
      this.offset.set(0);
      this.releasePointerCapture(event.currentTarget, event.pointerId);
      return;
    }

    event.preventDefault();
    this.finishSwipe();
    this.releasePointerCapture(event.currentTarget, event.pointerId);
  }

  onPointerCancel(event: PointerEvent): void {
    if (event.pointerType === 'touch') return;
    if (this.pointerId !== event.pointerId) return;

    this.pointerStartX = null;
    this.pointerId = null;
    this.pointerDragging = false;
    this.offset.set(0);
    this.releasePointerCapture(event.currentTarget, event.pointerId);
  }

  onTouchStart(event: TouchEvent): void {
    if (this.shouldIgnoreTouch(event)) return;
    this.touchStartX = event.touches[0]?.clientX ?? null;
  }

  onDragStart(event: DragEvent): void {
    event.preventDefault();
  }

  onTouchMove(event: TouchEvent): void {
    if (this.touchStartX === null) return;
    const x = event.touches[0]?.clientX;
    if (x === undefined) return;
    this.offset.set(Math.min(0, x - this.touchStartX));
  }

  onTouchEnd(event: TouchEvent): void {
    void event;
    if (this.touchStartX === null) return;
    this.finishSwipe();
  }

  onTouchCancel(): void {
    this.touchStartX = null;
    this.pointerDragging = false;
    this.offset.set(0);
  }

  ngOnDestroy(): void {
    this.clearSwipeTimer();
  }

  private shouldIgnoreTouch(event: TouchEvent): boolean {
    const target = event.target as Element | null;
    return this.shouldIgnoreTarget(target);
  }

  private shouldIgnoreTarget(target: Element | null): boolean {
    const selector = this.swipeIgnoreSelector().trim();
    if (!selector) return false;
    return !!target?.closest(selector);
  }

  private finishSwipe(): void {
    const currentOffset = this.offset();
    this.offset.set(0);
    this.touchStartX = null;
    this.pointerStartX = null;
    this.pointerId = null;
    this.pointerDragging = false;

    if (currentOffset > -this.swipeThreshold()) return;

    this.swipingOut.set(true);
    this.clearSwipeTimer();
    this.swipeOutTimer = setTimeout(() => {
      this.beeSwipeDelete.emit(this.beeSwipeToDeleteRow());
      this.swipingOut.set(false);
      this.swipeOutTimer = null;
    }, this.swipeOutDurationMs());
  }

  private setPointerCapture(currentTarget: EventTarget | null, pointerId: number): void {
    const element = currentTarget as Element | null;
    if (!element || !('setPointerCapture' in element)) return;
    (element as Element & { setPointerCapture(id: number): void }).setPointerCapture(pointerId);
  }

  private releasePointerCapture(currentTarget: EventTarget | null, pointerId: number): void {
    const element = currentTarget as Element | null;
    if (!element || !('releasePointerCapture' in element)) return;
    (element as Element & { releasePointerCapture(id: number): void }).releasePointerCapture(pointerId);
  }

  private clearSwipeTimer(): void {
    if (this.swipeOutTimer === null) return;
    clearTimeout(this.swipeOutTimer);
    this.swipeOutTimer = null;
  }
}
