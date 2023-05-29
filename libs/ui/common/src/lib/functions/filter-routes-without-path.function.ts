import { TIconicRoute } from '../types/iconic-route.type';

export function filterRoutesWithoutPath(routes: TIconicRoute[]) {
  return routes.filter((r) => !!r.path);
}
