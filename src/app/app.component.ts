import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { APP_CONSTANTS } from './app.config';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '@core/services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  showSplash = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private ls: StorageService
  ) {
    this.checkTheme();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      timer(3000).subscribe(() => {
        this.showSplash = false;
      });
    });
    this.translate.setDefaultLang(APP_CONSTANTS.DEFAULT_LANGUAGE);
    this.translate.use(APP_CONSTANTS.DEFAULT_LANGUAGE);
  }

  private checkTheme(): void {
    if (this.ls.get('theme') === 'dark') {
      document.body.classList.add('dark');
    }
  }

}
