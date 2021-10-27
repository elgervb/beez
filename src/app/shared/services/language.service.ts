import { registerLocaleData } from '@angular/common';
import { Injectable } from '@angular/core';
// import { registerLocaleData } from '@angular/common';
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
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const promise = this.i18NextService.loadLanguages(lang, () => {})
        .then(() => this.localeInitializer(lang))
      // eslint-disable-next-line @typescript-eslint/no-empty-function
        .then(() => {});
      return from(promise);
    }
    return of(void 0);
  }

  /** https://medium.com/angular-in-depth/dynamic-import-of-locales-in-angular-b994d3c07197 */
  private localeInitializer(localeId: string): Promise<unknown> {
    // eslint-disable-next-line function-paren-newline
    return import(
      /* webpackInclude: /(nb|sv)\.js$/ */
      `@angular/common/locales/${localeId}`)
      .then(module => registerLocaleData(module.default));
  }

}
