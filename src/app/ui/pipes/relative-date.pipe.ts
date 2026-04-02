import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from '../../data/translation.service';

@Pipe({ name: 'relativeDate', standalone: true })
export class RelativeDatePipe implements PipeTransform {
  private readonly i18n = inject(TranslationService);

  transform(isoDate: string): string {
    // Parse as local date to avoid UTC midnight timezone shift
    const [y, m, d] = isoDate.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.round((today.getTime() - date.getTime()) / 86_400_000);

    if (diffDays === 0) return this.i18n.t('common.today');
    if (diffDays === 1) return this.i18n.t('common.yesterday');
    if (diffDays < 7) return this.i18n.t('common.daysAgo', { days: diffDays });

    const locale = this.i18n.currentLang() === 'nl' ? 'nl-NL' : 'en-GB';
    if (diffDays < 365) return date.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
    return date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  }
}
