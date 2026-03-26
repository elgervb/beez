import { Component, computed, input } from '@angular/core';
import { Inspection } from '../../data/models';

const BROOD: Record<string, number> = { excellent: 3, good: 2, poor: 1 };
const STORES: Record<string, number> = { high: 3, medium: 2, low: 1 };

function toPoints(values: number[], w: number, h: number, pad: number): string {
  const n = values.length;
  if (n < 2) return '';
  return values
    .map((v, i) => {
      const x = (i / (n - 1)) * (w - pad * 2) + pad;
      const y = h - pad - ((v - 1) / 2) * (h - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

@Component({
  selector: 'bee-inspection-sparkline',
  template: `
    @if (hasData()) {
      <svg class="sparkline" [attr.viewBox]="'0 0 ' + W + ' ' + H" aria-hidden="true" [attr.width]="W" [attr.height]="H">
        @if (broodPoints()) {
          <polyline [attr.points]="broodPoints()" class="spark-brood" fill="none" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" />
        }
        @if (storesPoints()) {
          <polyline [attr.points]="storesPoints()" class="spark-stores" fill="none" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" />
        }
      </svg>
      <div class="spark-legend">
        <span class="spark-dot brood"></span>Brood
        <span class="spark-dot stores"></span>Stores
      </div>
    }
  `,
  styles: [`
    :host { display: flex; align-items: center; gap: 0.5rem; }
    .sparkline { overflow: visible; }
    .spark-brood { stroke: #c87800; }
    .spark-stores { stroke: #3a7abf; }
    .spark-legend { display: flex; align-items: center; gap: 0.3rem; font-size: 0.65rem; color: #666; }
    .spark-dot { display: inline-block; width: 0.5rem; height: 0.5rem; border-radius: 50%; }
    .spark-dot.brood { background: #c87800; margin-left: 0.35rem; }
    .spark-dot.stores { background: #3a7abf; margin-left: 0.35rem; }
  `]
})
export class InspectionSparklineComponent {
  readonly inspections = input.required<Inspection[]>();

  readonly W = 80;
  readonly H = 28;

  private readonly sorted = computed(() =>
    [...this.inspections()].sort((a, b) => a.date.localeCompare(b.date)).slice(-10)
  );

  readonly hasData = computed(() => this.sorted().length >= 2);
  readonly broodPoints = computed(() => toPoints(this.sorted().map(i => BROOD[i.broodPattern] ?? 2), this.W, this.H, 3));
  readonly storesPoints = computed(() => toPoints(this.sorted().map(i => STORES[i.storesLevel] ?? 2), this.W, this.H, 3));
}
