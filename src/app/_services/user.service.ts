import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';

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

getUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>> {
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
  let params = new HttpParams();
  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if (userParams != null) {
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
  }
    // return this.http.get<User[]>(this.baseurl + 'users', options);
  return this.http.get<User[]>(this.baseurl + 'users', { observe: 'response', params}).
    pipe(
      map(response => {
        paginatedResult.result = response.body;
        if(response.headers.get('Pagination')!=null){
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
}
getUser(id): Observable<User> {
  // return this.http.get<User>(this.baseurl + 'users/' + id, options);
  return this.http.get<User>(this.baseurl + 'users/' + id);
}

updateUser(id: number, user: User) {
  return this.http.put(this.baseurl + 'users/'+ id, user);
}

}

