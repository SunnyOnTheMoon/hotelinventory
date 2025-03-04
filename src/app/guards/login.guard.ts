import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../login/login.service';


export const loginGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService) as LoginService;
  const router = inject(Router) as Router;
  if (loginService.isLoggedIn) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
