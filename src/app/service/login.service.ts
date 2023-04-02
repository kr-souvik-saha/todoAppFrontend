import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginURL: string;
  constructor(private http: HttpClient) {
    this.loginURL = 'http://localhost:5000/api/users/login';
  }

  loginUser(login: Login): Observable<Login> {
    return this.http.post<Login>(this.loginURL, login);
  }
}
