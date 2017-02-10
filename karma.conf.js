// Karma configuration
import config from './build/config';

module.exports = function(cfg) {
  cfg.set({
    files: [
      {pattern: 'node_modules/bluebird/js/browser/bluebird.js', watched: false, included: true, served: true},
      {pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', watched: false, included: true, served: true},
      {pattern: 'node_modules/phantomjs-polyfill-find/find-polyfill.js', watched: false, included: true, served: true},
      {pattern: 'node_modules/whatwg-fetch/fetch.js', watched: false, included: true, served: true},
      {
        pattern: 'node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
        watched: false,
        included: true,
        served: true
      },
      {pattern: 'test/data/icons.svg', watched: false, included: false, served: true},
      {pattern: config.path.test.unit, watched: false, included: true, served: true}
    ],
    preprocessors: {
      [config.path.test.unit]: ['webpack'],
      'src/**/*.js': ['coverage']
    },
    proxies: {
      '/icons.svg': '/base/test/data/icons.svg'
    },
    singleRun: true,
    autoWatch: false,
    basePath: '.',
    frameworks: ['mocha', 'sinon', 'chai'],

    plugins: [
      'karma-webpack',
      'karma-babel-preprocessor',
      'karma-mocha',
      'karma-sinon',
      'karma-chai',
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-mocha-reporter',
      'karma-sourcemap-loader'
    ],

    client: {
      chai: {
        includeStack: false
      },
      useIframe: false
    },

    logLevel: cfg.LOG_ERROR,

    browsers: ['PhantomJSCustom'],
    customLaunchers: {
      PhantomJSCustom: {
        base: 'PhantomJS',
        options: {
          settings: {
            loadImages: false,
            webSecurityEnabled: false,
            resourceTimeout: 10000
          }
        },
        debug: false
      }
    },
    phantomjsLauncher: {
      exitOnResourceError: false
    },
    browserDisconnectTimeout: 30000,
    browserNoActivityTimeout: 30000,
    captureTimeout: 30000,
    concurrency: 1,

    reporters: ['mocha', 'progress', 'coverage'],
    mochaReporter: {
      output: 'minimal',
      showDiff: true
    },
    coverageReporter: {
      dir: 'coverage',
      instrumenters: {isparta: require('isparta')},
      instrumenter: {'src/**/*.js': ['isparta']},
      instrumenterConfig: {embedSource: true},
      reporters: [{type: 'html', subdir: 'unit'}]
    },

    // Webpack
    webpack: config.webpack.test,
    webpackMiddleware: {
      noInfo: true
    }
  });
};
