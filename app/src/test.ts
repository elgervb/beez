// tslint:disable-next-line: no-import-side-effect
import 'jest-preset-angular';

// tslint:disable: no-any
const storageMock = () => {
  let storage: any = {};
  return {
    getItem: (key: any) => (key in storage ? storage[key] : null),
    setItem: (key: any, value: any) => (storage[key] = value || ''),
    // tslint:disable-next-line: no-dynamic-delete
    removeItem: (key: any) => delete storage[key],
    clear: () => (storage = {})
  };
};

Object.defineProperty(window, 'localStorage', { value: storageMock() });
Object.defineProperty(window, 'sessionStorage', { value: storageMock() });

Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'getComputedStyle', {
  value: () =>
    ({
      display: 'none',
      appearance: ['-webkit-appearance']
    })
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});
Object.defineProperty(document.body.style, 'transform', {
  value: () =>
    ({
      enumerable: true,
      configurable: true
    })
});
