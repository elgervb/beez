import { Component, computed, input } from '@angular/core';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type BadgeSize = 'small' | 'medium' | 'large' | 'xs';
export type BadgeStyle = 'solid' | 'outline' | 'soft';
export type BadgeIcon = 'check' | 'warning' | 'error' | 'info' | 'success';

@Component({
  selector: 'bee-badge',
  standalone: true,
  templateUrl: './badge.html',
  styleUrl: './badge.css'
})
export class BadgeComponent {
  readonly variant = input<BadgeVariant>('default');
  readonly size = input<BadgeSize>('medium');
  readonly label = input.required<string>();
  readonly icon = input<BadgeIcon | null>(null);
  readonly appearance = input<BadgeStyle>('solid');
  readonly circular = input<boolean>(false);
  readonly pulse = input<boolean>(false);
  readonly bgColor = input<string | null>(null);
  readonly textColor = input<string | null>(null);

  readonly iconMap: Record<BadgeIcon, string> = {
    check: 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z',
    warning: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
    error: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
    info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
    success: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
  };

  readonly computedClasses = computed(() => {
    const classes = [
      'badge',
      `badge-${this.variant()}`,
      `badge-${this.size()}`,
      `badge-style-${this.appearance()}`
    ];
    if (this.circular()) classes.push('badge-circular');
    if (this.pulse()) classes.push('badge-pulse');
    return classes.join(' ');
  });

  readonly iconPath = computed(() => {
    const icon = this.icon();
    return icon ? this.iconMap[icon] : null;
  });

  readonly accessibleLabel = computed(() => {
    const variantLabels: Record<BadgeVariant, string> = {
      success: 'Status is good',
      warning: 'Warning - needs attention',
      danger: 'Error or critical issue',
      info: 'Information',
      default: 'Label',
      neutral: 'metadata'
    };
    return `${variantLabels[this.variant()]}: ${this.label()}`;
  });
}
