import { Directive, OnDestroy, computed, inject, input, output, signal } from '@angular/core';
import { HapticFeedbackService } from '../../data/haptic-feedback.service';

@Directive({
  selector: '[beeSwipeToDeleteRow]',
  standalone: true,
  host: {
    '[class.swiping]': 'isSwiping()',
    '[class.swiping-left]': 'isSwipingLeft()',
    '[class.swiping-right]': 'isSwipingRight()',
    '[class.swipe-out]': 'isSwipingOut()',
    '[style.--swipe-offset]': 'offsetPx()',
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
  private readonly haptics = inject(HapticFeedbackService);

  readonly beeSwipeToDeleteRow = input.required<string>();
  readonly swipeThreshold = input<number>(72);
  readonly swipeOutDurationMs = input<number>(240);
  readonly swipeIgnoreSelector = input<string>('.card-actions');
  readonly enableSwipeEdit = input<boolean>(true);
  readonly hapticDurationMs = input<number>(10);

  readonly beeSwipeDelete = output<string>();
  readonly beeSwipeEdit = output<string>();

  private touchStartX: number | null = null;
  private pointerStartX: number | null = null;
  private pointerId: number | null = null;
  private pointerDragging = false;
  private readonly pointerDragStartThresholdPx = 8;
  private readonly offset = signal<number>(0);
  private readonly swipingOut = signal<boolean>(false);
  private swipeOutTimer: ReturnType<typeof setTimeout> | null = null;

  readonly isSwiping = computed(() => this.offset() !== 0 && !this.swipingOut());
  readonly isSwipingLeft = computed(() => this.offset() < 0 && !this.swipingOut());
  readonly isSwipingRight = computed(() => this.offset() > 0 && !this.swipingOut());
  readonly isSwipingOut = computed(() => this.swipingOut());
  readonly offsetPx = computed(() => `${this.offset()}px`);

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
      if (Math.abs(delta) < this.pointerDragStartThresholdPx) return;
      this.pointerDragging = true;
      this.setPointerCapture(event.currentTarget, event.pointerId);
    }

    this.offset.set(delta);
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
    this.offset.set(x - this.touchStartX);
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

    if (currentOffset >= this.swipeThreshold() && this.enableSwipeEdit()) {
      this.triggerHaptic();
      this.beeSwipeEdit.emit(this.beeSwipeToDeleteRow());
      return;
    }

    if (currentOffset > -this.swipeThreshold()) return;

    this.swipingOut.set(true);
    this.clearSwipeTimer();
    this.swipeOutTimer = setTimeout(() => {
      this.triggerHaptic();
      this.beeSwipeDelete.emit(this.beeSwipeToDeleteRow());
      this.swipingOut.set(false);
      this.swipeOutTimer = null;
    }, this.swipeOutDurationMs());
  }

  private triggerHaptic(): void {
    const duration = this.hapticDurationMs();
    this.haptics.vibrate(duration);
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
