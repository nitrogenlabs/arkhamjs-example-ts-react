import {get, merge} from 'lodash';

export interface AppConfig {
  readonly appId?: string;
  readonly appName?: string;
  readonly env?: string;
}

export interface EnvConfig {
  readonly default: AppConfig;
  readonly development: AppConfig;
  readonly preprod: AppConfig;
  readonly production: AppConfig;
  readonly test: AppConfig;
}

export class Config {
  static values: EnvConfig = {
    default: {
      env: process.env.NODE_ENV
    },
    development: {
      appId: 'arkhamjs-skeleton',
      appName: 'Arkham Skeleton'
    },
    preprod: {
      appId: 'arkhamjs-skeleton',
      appName: 'Arkham Skeleton'
    },
    production: {
      appId: 'arkhamjs-skeleton',
      appName: 'Arkham Skeleton'
    },
    test: {
      appId: 'arkhamjs-skeleton',
      appName: 'Arkham Skeleton'
    }
  };
  
  static get(path: string | string[]): any {
    const environment: string = process.env.NODE_ENV || 'development';
    const configValues: object = merge(this.values.default, this.values[environment], {environment});
    return get(configValues, path);
  }
}
