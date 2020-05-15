import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { Error404Component } from './error404/error404.component';
import { HelpComponent } from '@shared/components/help/help.component';
import { IonicModule } from '@ionic/angular';
import { EditComponent } from './modals/edit/edit.component';
import { PreviewComponent } from './modals/preview/preview.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { CreateComponent } from './modals/create/create.component';

@NgModule({
  declarations: [
  Error404Component,
  HelpComponent,
  EditComponent,
  PreviewComponent,
  CreateComponent
],
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forChild()
  ]
})

export class ComponentsModule { }
