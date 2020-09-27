import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPage } from './login.page';
import { LoginPageRouting } from './login.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SocialLoginComponent } from './components/social-login/social-login.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    LoginPageRouting,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule
  ],
  declarations: [
    LoginPage,
    SocialLoginComponent
  ]
})

export class LoginPageModule {}
