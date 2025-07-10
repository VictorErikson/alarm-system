import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../app.config';

export interface SignupDto {
  name: string;
  surname: string;
  email: string;
  phone: string;
  personalNumber: string;
  address: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) {}

  signup(data: SignupDto): Observable<any> {
    const url = `${API_BASE_URL}/api/auth/signup`;
    console.log('HTTP', 'POST', url, data);
    return this.http.post(url, data);
  }
  // signup(data: SignupDto): Observable<any> {
  //   return this.http.post(`${API_BASE_URL}/api/auth/signup`, data);
  // }
}