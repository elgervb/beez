import { Injectable, signal } from '@angular/core';

type SupportedLang = 'en' | 'nl';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private i18nFiles: Record<SupportedLang, Record<string, string>> = {
    en: {},
    nl: {}
  };

  currentLang = signal<SupportedLang>('en');

  constructor() {
    this.initializeLocale();
  }

  private initializeLocale(): void {
    // Get browser language
    const browserLang = this.getBrowserLanguage();
    const savedLang = localStorage.getItem('beez-lang') as SupportedLang | null;
    const lang = savedLang || browserLang;

    this.currentLang.set(lang);
  }

  private getBrowserLanguage(): SupportedLang {
    const browserLang = (navigator.language || 'en').split('-')[0].toLowerCase();
    return browserLang === 'nl' ? 'nl' : 'en';
  }

  async loadLanguage(lang: SupportedLang): Promise<void> {
    if (this.i18nFiles[lang] && Object.keys(this.i18nFiles[lang]).length > 0) {
      this.currentLang.set(lang);
      return;
    }

    try {
        const response = await fetch(this.resolveAssetUrl(`assets/i18n/${lang}.json`));
      if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
      const data = await response.json();
      this.i18nFiles[lang] = data;
      this.currentLang.set(lang);
      localStorage.setItem('beez-lang', lang);
    } catch (error) {
      console.error(`Error loading language ${lang}:`, error);
      // Fallback to English
      if (lang !== 'en' && this.i18nFiles['en']) {
        this.currentLang.set('en');
      }
    }
  }

    private resolveAssetUrl(relativePath: string): string {
      const normalizedPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
      return new URL(normalizedPath, document.baseURI).toString();
    }
  t(key: string, params?: Record<string, string | number>): string {
    const lang = this.currentLang();
    const inCurrent = this.i18nFiles[lang]?.[key];
    const inFallback = this.i18nFiles['en']?.[key];

    if (inCurrent === undefined && inFallback === undefined) {
      console.error(`[i18n] Missing translation key: "${key}"`);
    } else if (lang !== 'en' && inCurrent === undefined) {
      console.error(`[i18n] Missing "${lang}" translation for key: "${key}" (falling back to "en")`);
    }

    let text = inCurrent ?? inFallback ?? key;

    // Replace parameters if provided
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{{${k}}}`, String(v));
      });
    }

    return text;
  }

  setLanguage(lang: SupportedLang): void {
    this.loadLanguage(lang);
  }

  getSupportedLanguages(): SupportedLang[] {
    return ['en', 'nl'];
  }
}
