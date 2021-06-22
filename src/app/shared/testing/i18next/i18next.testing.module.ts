import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { defaultInterpolationFormat, I18NextModule, I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

export const appInit = (i18next: ITranslationService) => () => i18next.init({
  fallbackLng: 'en',
  debug: false,
  returnEmptyString: false,
  interpolation: { format: I18NextModule.interpolationFormat(defaultInterpolationFormat) },
});

export const localeIdFactory = (i18next: ITranslationService) => i18next.language;

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  }];

@NgModule({
  exports: [
    I18NextModule,
  ],
  imports: [
    CommonModule,
    I18NextModule.forRoot(),
  ],
  providers: [
    I18N_PROVIDERS
  ]
})
export class I18nextTestingModule { }
