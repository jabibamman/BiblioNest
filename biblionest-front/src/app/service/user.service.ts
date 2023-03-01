import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  connectUser(user: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    const body = {
      username: user.username,
      email: user.email,
      password: user.password
    };

    return this.http.post('http://localhost:3000/auth/signin', body, this.httpOptions);
  }

  createUser(user: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    const body = {
      username: user.username,
      email: user.email,
      password: user.password
    };

    return this.http.post('http://localhost:3000/auth/signup', body, this.httpOptions);
  }
}