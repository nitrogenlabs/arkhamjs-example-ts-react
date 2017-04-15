// Karma configuration
import config from './build/config';

module.exports = cfg => {
  cfg.set({
    autoWatch: false,
    basePath: '.',
    browsers: ['ChromeCustom'],
    browserDisconnectTimeout: 30000,
    browserNoActivityTimeout: 30000,
    captureTimeout: 30000,
    client: {
      chai: {
        includeStack: false
      },
      useIframe: false
    },
    concurrency: 1,
    coverageReporter: {
      dir: 'coverage',
      instrumenters: {isparta: require('isparta')},
      instrumenter: {'src/**/*.js': ['isparta']},
      instrumenterConfig: {embedSource: true},
      reporters: [{type: 'html', subdir: 'unit'}]
    },
    customLaunchers: {
      ChromeCustom: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          '--remote-debugging-port=9222 https://chromium.org',
          process.env.TRAVIS ? '--no-sandbox' : ''
        ]
      }
    },
    files: [
      {pattern: 'node_modules/bluebird/js/browser/bluebird.js', watched: false, included: true, served: true},
      {pattern: 'node_modules/whatwg-fetch/fetch.js', watched: false, included: true, served: true},
      {pattern: 'test/data/icons.svg', watched: false, included: false, served: true},
      {pattern: config.path.test.unit, watched: false, included: true, served: true}
    ],
    frameworks: ['mocha', 'sinon', 'chai'],
    logLevel: cfg.LOG_ERROR,
    plugins: [
      'karma-webpack',
      'karma-babel-preprocessor',
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-sinon',
      'karma-chai',
      'karma-coverage',
      'karma-mocha-reporter',
      'karma-sourcemap-loader'
    ],
    preprocessors: {
      [config.path.test.unit]: ['webpack'],
      'src/**/*.js': ['coverage']
    },
    proxies: {
      '/icons.svg': '/base/test/data/icons.svg'
    },
    mochaReporter: {
      colors: true,
      output: 'minimal',
      showDiff: true
    },
    reporters: ['mocha', 'coverage'],
    singleRun: true,

    // Webpack
    webpack: config.webpack.test,
    webpackMiddleware: {
      noInfo: true
    }
  });
};
