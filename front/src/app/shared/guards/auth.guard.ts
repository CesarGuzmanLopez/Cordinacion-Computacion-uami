import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AppSessionService } from 'src/app/shared/services/session/app-session-local.service';
import { inject } from '@angular/core';
export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): Promise<boolean> => {
  const AppSession = inject(AppSessionService);
  const router = inject(Router);
  return AppSession.isAuthenticated().then((isAuthenticated) => {
    if (!isAuthenticated) {
      router.navigate(['/']);
      return false;
    }
    return true;
  });
};
export const canActivateChild: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => AuthGuard(route, state);
