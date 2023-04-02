import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../model/register';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  registerURL: string;

  constructor(private http: HttpClient) {
    this.registerURL = 'http://localhost:5000/api/users/register';
  }

  registerUser(reg: Register): Observable<Register> {
    return this.http.post<Register>(this.registerURL, reg);
  }
}
