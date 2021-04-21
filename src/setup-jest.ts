import 'jest-preset-angular/setup-jest';
import { randomString, register } from '@elgervb/mock-data';

// mocks
register('queen', {
  id: () => randomString(16),
  name: () => `${randomString(4)} ${randomString(6)}`
});
