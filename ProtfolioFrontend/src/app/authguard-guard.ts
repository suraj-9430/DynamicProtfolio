import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const islog = sessionStorage.getItem("islog");

  // CASE 1: User NOT logged in → only allow '/'
  if (islog !== 'true') {
    if (state.url !== '/') {
      alert("Please Login First");
      router.navigate(['/']);
      return false;
    }
    return true;
  }

  // CASE 2: User IS logged in → redirect '/' → '/main'
  // if (islog === 'true' && state.url === '/') {
  //   console.log(islog, state.url,"tduuuuuuuuuuuuuuu" )
  //   router.navigate(['/main']);
  //   return false;
  // }

  // CASE 3: Logged in → allow access to all routes
  return true;
};
