import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HapticFeedbackService {
  vibrate(durationMs = 10): void {
    if (durationMs <= 0) return;
    if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return;
    navigator.vibrate(durationMs);
  }
}
