import { ActivatedRouteSnapshot } from '@angular/router';

export const getParam = (route: ActivatedRouteSnapshot, param: string): string | null =>
  route.paramMap?.get(param) || route.children.reduce<string | null>((acc: string | null, child: ActivatedRouteSnapshot) =>
    acc ? acc : child.paramMap.has(param) ? child.paramMap.get(param) : getParam(child, param)
    , null);
