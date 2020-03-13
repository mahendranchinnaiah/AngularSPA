import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
             private route: Router,
              private alertify: AlertifyService) {}
  canActivate(): boolean {

    if (this.auth.loggedIn()) {
        return true;
      }
    this.alertify.error('You shall not allowed!!!');
    this.route.navigate['/home'];

    return false;
  }

}
