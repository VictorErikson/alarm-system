import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  router.navigate(['/']);  // Redirect to start page (e.g., login)
  return false;
};



// import { Injectable } from '@angular/core';
// import { CanActivate, CanActivateFn, Router } from '@angular/router';
// import { AuthService } from './auth.service';

// // @Injectable({ providedIn:'root' })
// // export const AuthGuard: CanActivateFn = (route, state) => {
// //   return true;
// // };
// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//   constructor(
//     private auth: AuthService,
//     private router: Router
//   ) {}

//   canActivate(): boolean {
//     if (this.auth.isLoggedIn()) {
//       return true;
//     }
//     this.router.navigate(['/']);    // redirect to start‐page (login)
//     return false;
//   }
// }