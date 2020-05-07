import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { NavController } from '@ionic/angular';

@Injectable({providedIn: 'root'})

export class UserGuard implements CanLoad {

  constructor(
    private nav: NavController,
    private user: UserService
  ) { }

  canLoad(): boolean {
    return !this.user.getUser() ?
           (this.nav.navigateRoot('login'), false) : true;
  }

}
