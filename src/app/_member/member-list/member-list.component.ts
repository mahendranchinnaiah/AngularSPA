import { Router, ActivatedRoute } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.data.subscribe(data => this.users = data.users);

     this.LoadUsers();
  }







  LoadUsers() {
     this.userService.getUsers().subscribe(
       (users: User[]) =>  { this.users = users;
       // tslint:disable-next-line: no-shadowed-variable
       }, error => { this.alertify.error(error);
      });

  }


}
