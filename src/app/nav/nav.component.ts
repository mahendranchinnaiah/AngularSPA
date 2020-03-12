import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor( private authService: AuthService) { }

  ngOnInit() {
  }

  login() {

    this.authService.login(this.model).subscribe( next => {
        console.log('Logged in successfully');
      }, Error => {
        console.log(Error) ;
    } );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logOut() {
    localStorage.removeItem('token');
    console.log('logged out');
  }

}
