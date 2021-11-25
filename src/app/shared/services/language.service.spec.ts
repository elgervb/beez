import { TestBed } from '@angular/core/testing';
import { I18NextService } from 'angular-i18next';
import { Observable } from 'rxjs';

import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  const i18NextService= {
    changeLanguage: jest.fn(),
    loadLanguages: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [ { provide: I18NextService, useValue: i18NextService } ],
      teardown: { destroyAfterEach: false }
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change language', () => {
    i18NextService.loadLanguages.mockResolvedValue({});

    const result = service.changeLanguage('nl');

    expect(result).toBeInstanceOf(Observable);
  });
});
