import { InjectionToken } from '@angular/core';

export interface CoreModuleConfig {
  WEBSTORAGE_CONFIG: IWebstorageConfig;
  TRANSLATE_CONFIG: {
    I18N_PATH: string,
    SUFFIX_FILE: string
  };
}

export const CORE_MODULE_CONSTANTS: CoreModuleConfig = {
  WEBSTORAGE_CONFIG: {
    prefix: 'antic\'s',
    separator: '.',
    caseSensitive: false
  },
  TRANSLATE_CONFIG: {
    I18N_PATH: 'assets/i18n/',
    SUFFIX_FILE: '-lang.json'
  }
};

interface IWebstorageConfig {
  prefix: string;
  separator: string;
  caseSensitive: boolean;
}

export let CORE_MODULE_CONFIG = new InjectionToken<CoreModuleConfig>('core.module.config');
