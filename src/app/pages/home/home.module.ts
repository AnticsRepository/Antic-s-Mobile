import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePage } from './home.page';
import { HomePageRouting } from './home.routing';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    HomePageRouting
  ],
  declarations: [HomePage]
})

export class HomePageModule {}
