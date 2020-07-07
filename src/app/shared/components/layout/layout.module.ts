import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    PageHeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule
  ],
  exports: [
    PageHeaderComponent
  ]
})

export class LayoutModule { }
