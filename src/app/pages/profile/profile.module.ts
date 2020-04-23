import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePage } from './profile.page';
import { ProfilePageRouting } from './profile.routing';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ProfilePageRouting
  ],
  declarations: [ProfilePage]
})

export class ProfilePageModule {}
