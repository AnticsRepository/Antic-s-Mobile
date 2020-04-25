import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { Error404Component } from './error404/error404.component';
import { HelpComponent } from '@shared/components/help/help.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
  Error404Component,
  HelpComponent
],
  imports: [
    CommonModule,
    SharedModule,
    IonicModule
  ]
})

export class ComponentsModule { }
