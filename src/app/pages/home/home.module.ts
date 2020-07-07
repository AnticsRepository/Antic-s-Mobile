import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePage } from './home.page';
import { HomePageRouting } from './home.routing';
import { PipesModule } from '@shared/pipes/pipes.module';
import { LayoutModule } from '@shared/components/layout/layout.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    HomePageRouting,
    PipesModule,
    LayoutModule,
    TranslateModule
  ],
  declarations: [HomePage]
})

export class HomePageModule {}
