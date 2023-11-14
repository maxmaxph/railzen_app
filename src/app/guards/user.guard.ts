import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { forwardRef, inject } from '@angular/core';

export const userGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  const authGuardService = inject(forwardRef(() => AuthGuardService));
  const router = inject(forwardRef(() => Router));

  if (authGuardService.validateToken()) {
    return true;
  } else {
    router.navigate(['/connect'])
    return false;
  }
  
};
