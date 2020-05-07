import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from '@app/app.config';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '@core/services/storage/storage.service';

@Injectable()

export class LanguageService {

  constructor(
    private translateService: TranslateService,
    private ls: StorageService,
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {
    this.setDefault();
  }

  private setDefault() {
    if (!this.translateService.getDefaultLang()) {
      this.translateService
      .setDefaultLang(this.appConfig.DEFAULT_LANGUAGE);
    }
    this.translateService.use(
      this.ls.get('lang') ||
      this.appConfig.DEFAULT_LANGUAGE
    );
  }

  public change(lang: string): void {
    this.translateService.use(lang);
    this.ls.setKey('lang', lang);
  }

  public getCurrent(): string {
    return this.translateService.currentLang;
  }
}
