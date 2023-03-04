import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {CommonService} from "./common.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private common: CommonService) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  connectUser(user: {
    email: string;
    password: string;
  }): Observable<any> {
    const body = {
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

  isLogged(): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': 'Bearer ' + token
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get('http://localhost:3000/profile', requestOptions);
  };

  navigateIfError(apiResponse: Observable<any>){
    apiResponse.subscribe(
      (response:any) => {},
      (error:any) => {
        console.error(error);
        this.common.navigate('');
      }
    );
  }
}
