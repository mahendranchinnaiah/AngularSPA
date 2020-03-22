import { User } from './../../_models/user';
import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  user: User;
  // galleryOptions: NgxGalleryOptions[];
  // galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertifyService: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    //  this.loadUser();

    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

  }

    /*
    this.galleryOptions = [
      {
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
  }
  ];
    this.galleryImages = this.getImages();
  }
  getImages() {
    const imageurls = [];
    for (const photo of this.user.photos) {
      imageurls.push(
        {
          small: photo.url,
          medium: photo.url,
          big: photo.url,
          description: photo.description

        }
      );
      return imageurls;
    }
    }
    */

  // members/4

  /*
  loadUser() {
  return this.userService.getUser(+this.route.snapshot.params.id).subscribe(
    (user: User) => {
      this.user = user;
    }, logerror => {
      this.alertifyService.error(logerror);
    });
  }
*/

}
