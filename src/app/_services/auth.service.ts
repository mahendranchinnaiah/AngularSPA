import { User } from './../_models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodeToken: any;


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
        this.decodeToken = this.jwtHelper.decodeToken(user.token);
      }
    })
  );
}

register(user: User) {
  return this.http.post(this.baseUrl + 'register', user);
}

loggedIn() {
  const token = localStorage.getItem('token');
  // console.log(this.jwtHelper.decodeToken(token));
  return !this.jwtHelper.isTokenExpired(token);
}

}
