import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPage } from './detail.page';
import { DetailPageRouting } from './detail.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    DetailPageRouting,
    FormsModule
  ],
  declarations: [DetailPage]
})

export class DetailPageModule {}
