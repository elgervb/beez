import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from '../../data/translation.service';

@Pipe({
  name: 'i18n',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private readonly i18n = inject(TranslationService);

  transform(key: string, params?: Record<string, string | number>): string {
    // Explicitly read the signal to create a dependency for change detection
    this.i18n.currentLang();
    return this.i18n.t(key, params);
  }
}
