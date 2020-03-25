import { AuthService } from './../_services/auth.service';
import { error } from '@angular/compiler/src/util';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';


@Injectable()
export class MemberEditResolver implements Resolve<User> {
 constructor( private userService: UserService, private alertify: AlertifyService,
              private router: Router, private authService: AuthService) {}
resolve(route: ActivatedRouteSnapshot): Observable<User> {
  return this.userService.getUser(this.authService.decodeToken.nameid).pipe(
    catchError(error => {
      this.alertify.error('Problem retrieving your data');
      this.router.navigate(['/members']);
      return of(null);
    })
  );
}

}
