import { Injectable } from '@angular/core';
import { I18NextService } from 'angular-i18next';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private currentLang: string;

  constructor(private i18NextService: I18NextService) {}

  changeLanguage(lang?: string): Observable<void> {
    if (lang && this.currentLang !== lang) {
      this.currentLang = lang;

      this.i18NextService.changeLanguage(lang);
      const promise = this.i18NextService.loadLanguages(lang)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
        .then(() => {});
      return from(promise);
    }
    return of(void 0);
  }

}
