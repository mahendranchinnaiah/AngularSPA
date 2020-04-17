import { PaginatedResult } from './../../_models/pagination';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  userParams: any = {};
  pagination: Pagination;
  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });

    if (this.user.gender != null) {
      this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    }
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    // this.route.data.subscribe(data => {
      //  this.users = data.users.result;
    // });

    // this.LoadUsers();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.LoadUsers();
    // console.log(this.pagination.currentPage);
  }

  resetFilters() {
    if (this.user.gender != null) {
      this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    }
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.LoadUsers();
  }
  LoadUsers() {
     this.userService.getUsers(this.pagination.currentPage,
      this.pagination.itemsPerPage, this.userParams)
     .subscribe(
      (res: PaginatedResult< User[]>) =>  {
        this.users = res.result;
        this.pagination = res.pagination;
        }, error => { this.alertify.error(error);
       });

  }


}
