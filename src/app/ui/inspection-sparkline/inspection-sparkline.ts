import { Component, computed, input } from '@angular/core';
import { Inspection } from '../../data/models';
import { TranslatePipe } from '../pipes/translate.pipe';

const BROOD: Record<string, number> = { excellent: 3, good: 2, poor: 1 };
const STORES: Record<string, number> = { high: 3, medium: 2, low: 1 };

function toHoneyScale(level: number): number {
  const clamped = Math.max(0, Math.min(100, level));
  // Map 0..100 to the same 1..3 visual scale used by brood/stores.
  return 1 + (clamped / 100) * 2;
}

function toPoints(values: number[], w: number, h: number, pad: number, minV: number, maxV: number): string {
  const n = values.length;
  if (n < 2) return '';
  const range = maxV - minV || 1;
  return values
    .map((v, i) => {
      const x = (i / (n - 1)) * (w - pad * 2) + pad;
      const y = h - pad - ((v - minV) / range) * (h - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

@Component({
  selector: 'bee-inspection-sparkline',
  imports: [TranslatePipe],
  template: `
    @if (hasData()) {
      <div class="spark-wrap">
        <svg class="sparkline" [attr.viewBox]="'0 0 ' + W + ' ' + H" preserveAspectRatio="none" aria-hidden="true">
          @if (broodPoints()) {
            <polyline [attr.points]="broodPoints()" class="spark-brood" fill="none" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" />
          }
          @if (storesPoints()) {
            <polyline [attr.points]="storesPoints()" class="spark-stores" fill="none" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" />
          }
          @if (honeyPoints()) {
            <polyline [attr.points]="honeyPoints()" class="spark-honey" fill="none" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" />
          }
        </svg>
        <div class="spark-legend">
          <span class="spark-dot brood"></span>{{ 'inspection.sparklineBrood' | i18n }}
          <span class="spark-dot stores"></span>{{ 'inspection.sparklineStores' | i18n }}
          <span class="spark-dot honey"></span>{{ 'inspection.sparklineHoney' | i18n }}
        </div>
      </div>
    }
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .spark-wrap {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
      width: 100%;
    }
    .sparkline {
      display: block;
      width: 100%;
      aspect-ratio: 10 / 1;
      overflow: visible;
    }
    .spark-brood { stroke: #c87800; }
    .spark-stores { stroke: #3a7abf; }
    .spark-honey { stroke: #2f9d6a; }
    .spark-legend {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.65rem;
      color: #666;
      flex-wrap: wrap;
      order: -1;
    }
    .spark-dot { display: inline-block; width: 0.5rem; height: 0.5rem; border-radius: 50%; }
    .spark-dot.brood { background: #c87800; margin-left: 0.35rem; }
    .spark-dot.stores { background: #3a7abf; margin-left: 0.35rem; }
    .spark-dot.honey { background: #2f9d6a; margin-left: 0.35rem; }

    @media (min-width: 960px) {
      .spark-wrap {
        flex-direction: row;
        align-items: center;
        gap: 1rem;
      }

      .sparkline {
        flex: 1;
        min-width: 0;
        aspect-ratio: 10 / 1;
        height: auto;
      }

      .spark-legend {
        order: 0;
        flex-wrap: nowrap;
      }
    }
  `]
})
export class InspectionSparklineComponent {
  readonly inspections = input.required<Inspection[]>();

  readonly W = 80;
  readonly H = 56;

  private readonly sorted = computed(() =>
    [...this.inspections()].sort((a, b) => a.date.localeCompare(b.date)).slice(-10)
  );

  readonly hasData = computed(() => this.sorted().length >= 2);

  private readonly sharedRange = computed(() => {
    const ins = this.sorted();
    const all = [
      ...ins.map(i => BROOD[i.broodPattern] ?? 2),
      ...ins.map(i => STORES[i.storesLevel] ?? 2),
      ...ins.map(i => toHoneyScale(i.honeyLevel ?? 50))
    ];
    return { min: Math.min(...all), max: Math.max(...all) };
  });

  readonly broodPoints = computed(() => {
    const { min, max } = this.sharedRange();
    return toPoints(this.sorted().map(i => BROOD[i.broodPattern] ?? 2), this.W, this.H, 1, min, max);
  });
  readonly storesPoints = computed(() => {
    const { min, max } = this.sharedRange();
    return toPoints(this.sorted().map(i => STORES[i.storesLevel] ?? 2), this.W, this.H, 1, min, max);
  });
  readonly honeyPoints = computed(() => {
    const { min, max } = this.sharedRange();
    return toPoints(this.sorted().map(i => toHoneyScale(i.honeyLevel ?? 50)), this.W, this.H, 1, min, max);
  });
}
