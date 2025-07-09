import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'jwt';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<{ token: string }>('/api/auth/login', { email, password })
      .pipe(
        tap(res => sessionStorage.setItem(this.TOKEN_KEY, res.token)),
        map(() => true),
        catchError(() => of(false))
      );
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}