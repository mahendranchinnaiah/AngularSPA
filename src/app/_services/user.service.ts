import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';

/*
const options = {
  headers: new HttpHeaders({
      // tslint:disable-next-line:object-literal-key-quotes
      Authorization : 'Bearer ' + localStorage.getItem('token')
    })
};
*/

@Injectable({
  providedIn: 'root'
})
export class UserService {
baseurl = environment.apiURl;
constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {
    // return this.http.get<User[]>(this.baseurl + 'users', options);
    return this.http.get<User[]>(this.baseurl + 'users');
}
getUser(id): Observable<User> {
  // return this.http.get<User>(this.baseurl + 'users/' + id, options);
  return this.http.get<User>(this.baseurl + 'users/' + id);
}

updateUser(id: number, user: User) {
  return this.http.put(this.baseurl + 'users/'+ id, user);
}

}

