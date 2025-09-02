import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { API_BASE_URL } from '../app.config';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  //private readonly urlGet = `${API_BASE_URL}/api/get`;
  private readonly urlGet = `${API_BASE_URL}/central-units/customer/units`;
  private readonly urlPost = `${API_BASE_URL}/api/post`;
  private readonly urlPostCU = `${API_BASE_URL}/central-units/register`;
  private dataSignal = signal<any[]>([]);
  readonly getDataSignal = this.dataSignal;

  constructor(private http: HttpClient) {
    this.fetch();
  }

   fetch() {
    this.http.get<any[]>(this.urlGet).subscribe(data => {
      this.dataSignal.set(data);
      console.log("fetched data: ", this.dataSignal());
    });
  }

  //skippa denna?
  // GET data as a signal
  // getDataSignal() {
  //   return toSignal(this.http.get(this.urlGet));
  // }

  // Manual POST request
  postData(payload: any) {
    console.log(payload);
    return this.http.post(this.urlPost, payload);
  }
  postCU(payload: any): Observable<string> {
    console.log(payload);
    return this.http.post(this.urlPostCU, payload, {
      responseType: 'text' as const
    });
  // postCU(payload: any) {
  //   console.log(payload);
  //   return this.http.post(this.urlPostCU, payload);
  }
}