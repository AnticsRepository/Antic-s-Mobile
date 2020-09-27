import { InjectionToken } from '@angular/core';
import { APP_CONSTANTS } from '../../../app.config';

export interface ModuleConfig {
  KEY: string;
}

export interface StorageConfig extends ModuleConfig {
  LANGUAGE: string;
  THEME: string;
  REMEMBER: boolean;
}

export const STORAGE_CONSTANTS: StorageConfig = {
  KEY: 'storage',
  THEME: 'dark',
  LANGUAGE: APP_CONSTANTS.DEFAULT_LANGUAGE,
  REMEMBER: false,
};

export class Storage {
  lang = APP_CONSTANTS.DEFAULT_LANGUAGE;
  token = null;
  user = null;
  remember = STORAGE_CONSTANTS.REMEMBER;
  theme = STORAGE_CONSTANTS.THEME;
}

export let STORAGE_CONFIG = new InjectionToken<StorageConfig>('storage.config');
