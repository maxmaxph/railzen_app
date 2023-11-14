import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { forwardRef, inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authGuardService = inject(forwardRef(() => AuthGuardService));
  const userService = inject(forwardRef(() => UserService));
  const router = inject(forwardRef(() => Router));

 if (authGuardService.validateToken() && userService.getUserRole() === 'admin') {
   return true;
 } else {
   router.navigate(['/connect']);
   return false;
 }
};
