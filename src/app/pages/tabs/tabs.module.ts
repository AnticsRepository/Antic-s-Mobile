import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsPageRouting } from './tabs.routing';
import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TabsPageRouting
  ],
  declarations: [TabsPage]
})

export class TabsPageModule {}
