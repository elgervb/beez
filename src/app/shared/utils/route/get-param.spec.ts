import { ActivatedRouteSnapshot, ParamMap } from '@angular/router';
import { transform } from '@elgervb/mock-data';
import { getParam } from './get-param';

const paramMap = (params: { [key: string]: any }) => (transform<any, ParamMap>({
  get: (key: string) => params[key],
  has: (key: string) => params.hasOwnProperty(key),
}));

describe('getParam', () => {

  it('should get param', () => {
    const route = transform<ActivatedRouteSnapshot>({ paramMap: paramMap({ a: 1 }) });

    expect(getParam(route, 'a')).toBe(1);
  });

  it('should get param from children', () => {
    const child = transform<ActivatedRouteSnapshot>({ paramMap: paramMap({ a: 1 }), children: [] });
    const route = transform<ActivatedRouteSnapshot>({ children: [child] });

    expect(getParam(route, 'b')).toBe(null);
    expect(getParam(route, 'a')).toBe(1);
  });

  it('should get param from childrens children', () => {
    const childChild = transform<ActivatedRouteSnapshot>({ paramMap: paramMap({ a: 1 }), children: [] });
    const child = transform<ActivatedRouteSnapshot>({ paramMap: paramMap({}), children: [childChild] });
    const route = transform<ActivatedRouteSnapshot>({ children: [child] });

    expect(getParam(route, 'b')).toBe(null);
    expect(getParam(route, 'a')).toBe(1);
  });
});
