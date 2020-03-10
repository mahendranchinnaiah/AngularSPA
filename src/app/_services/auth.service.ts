import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
//import {RequestOptions, Request, RequestMethod} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';

constructor(private http: HttpClient) { }

// tslint:disable-next-line:align
login(model: any) {
  const  headers = new  HttpHeaders().set('X-CustomHttpHeader', 'CUSTOM_VALUE');

 //const headers = new Headers({ 'Content-Type': 'application/json' });
  // const options = new RequestOptions({ headers: headers });
  return this.http.post(this.baseUrl + 'login', model ).pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
      }
    })
  );
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model);
}

}
