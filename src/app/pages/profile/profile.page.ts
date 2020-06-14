import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/core/services/user/user.service';
import { User } from '@shared/interfaces/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})

export class ProfilePage implements OnInit {

  user: User;

  constructor(private userSrv: UserService) {}

  ngOnInit() {
    this.user = this.userSrv.getUser();
    console.log(this.user)
  }

}
