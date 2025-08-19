// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { tap, map, catchError } from 'rxjs/operators';
// import { Observable, of } from 'rxjs';
// import { environment } from '../../environments/environments';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private readonly TOKEN_KEY = 'jwt';

//   constructor(private http: HttpClient) {}

//   login(email: string, password: string): Observable<boolean> {
//     return this.http
//       .post<{ token: string }>('/api/auth/login', { email, password })
//       .pipe(
//         tap(res => sessionStorage.setItem(this.TOKEN_KEY, res.token)),
//         map(() => true),
//         catchError(() => of(false))
//       );
//   }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { API_BASE_URL } from '../app.config';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'jwt';

  constructor(private http: HttpClient, private router: Router) {}

  // login(email: string, password: string): Observable<boolean> {
  //   return this.http
  //     .post<{ token: string }>(`${API_BASE_URL}/api/auth/login`, { email, password })
  //     .pipe(
  //       tap(res => sessionStorage.setItem(this.TOKEN_KEY, res.token)),
  //       map(() => true),
  //       catchError(() => of(false))
  //     );
  // }
  login(email: string, password: string): Observable<boolean> {
  const url = `${API_BASE_URL}/auth/login`;
  const body = { email, password };
  console.log('HTTP', 'POST', url, body);
  return this.http
    .post<{ token: string }>(url, body)
    .pipe(
      tap(res => {
        console.log('← response token:', res.token);
        sessionStorage.setItem(this.TOKEN_KEY, res.token);
      }),
      map(() => true),
      catchError(err => {
        console.error('← login error', err);
        return of(false);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/']);
  }
}