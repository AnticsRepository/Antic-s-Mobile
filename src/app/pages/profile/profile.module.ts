import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePage } from './profile.page';
import { ProfilePageRouting } from './profile.routing';
import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '@shared/components/layout/layout.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ProfilePageRouting,
    SharedModule,
    LayoutModule
  ],
  declarations: [ProfilePage]
})

export class ProfilePageModule {}
