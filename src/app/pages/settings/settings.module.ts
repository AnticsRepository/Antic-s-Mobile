import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsPageRouting } from './settings.routing';
import { SettingsPage } from './settings.page';
import { IonicModule } from '@ionic/angular';
import { LayoutModule } from '@shared/components/layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SettingsPage],
  imports: [
    CommonModule,
    SettingsPageRouting,
    IonicModule,
    SharedModule,
    LayoutModule,
    FormsModule
  ]
})

export class SettingsPageModule { }
