import {merge} from 'lodash';

interface AppConfig {
  readonly appId?: string;
  readonly appName?: string;
  readonly env?: string;
}

interface EnvConfig {
  readonly default: AppConfig;
  readonly development: AppConfig;
  readonly preprod: AppConfig;
  readonly production: AppConfig;
  readonly test: AppConfig;
}

const values: EnvConfig = {
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

export const config: AppConfig = merge(values.default, values[process.env.NODE_ENV || 'development']);
