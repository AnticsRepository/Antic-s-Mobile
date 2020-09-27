// APP_CONFIG: Injection token to hold application-wide configuration properties that can be injected into other
// application elements such as components or services.

import { InjectionToken } from '@angular/core';

export interface AppConfig {
  TITLE: string;
  DEFAULT_LANGUAGE: string;
  PLATFORM: string;
}

export const APP_CONSTANTS: AppConfig = {
  TITLE: 'Antic\'s Mobile Creator',
  DEFAULT_LANGUAGE: 'es',
  PLATFORM: 'Mobile'
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');
