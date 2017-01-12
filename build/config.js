import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import appPackage from '../package.json';
import Immutable from 'immutable';

let config = {
  version: appPackage.version,
  env: process.env.NODE_ENV || 'development',
  title: 'ArkhamJS Skeleton',
  name: 'arkhamjs-skeleton',
  url: 'arkhamjs.com',
  port: {
    development: 5000,
    production: 3000
  },

  filenames: {
    entry: 'app.js',
    index: 'index.html',
    icons: 'icons.svg',
    scss: 'core.scss'
  },

  directories: {
    src: 'src',
    dist: 'dist',
    development: 'dist/dev',
    preprod: 'dist/preprod',
    production: 'dist/prod',
    test: 'test'
  },

  allowedOrigins: {
    development: [
      'localhost'
    ],
    production: [
      'arkhamjs.com'
    ]
  }
};

// External files
config.external = {
  js: [],
  css: [
    '/css/core.css'
  ]
};

// Utilities
const basePath = path.resolve(__dirname, '../');
config.absolute = (...args) => [basePath, ...args].join('/');
config.relative = (...args) => ['.', ...args].join('/');

config.path = {
  src: {
    entry: config.absolute(config.directories.src, config.filenames.entry),
    js: config.relative(config.directories.src, '**/*.js'),
    html: config.relative(config.directories.src, '**/*.html'),
    scss: {
      main: config.relative(config.directories.src, 'styles/', config.filenames.scss),
      files: [
        config.relative(config.directories.src, 'styles/**/*.scss')
      ],
      includes: []
    },
    img: {
      files: [
        config.relative(config.directories.src, 'img/**/*.{png,jpg,gif,svg}'),
        config.relative(config.directories.src, 'views/**/*.{png,jpg,gif,svg}'),
        config.relative(config.directories.src, 'favicon.ico')
      ]
    },
    fonts: {
      dir: config.relative(config.directories.src, 'fonts/'),
      files: []
    },
    icons: {
      files: [
        config.relative(config.directories.src, 'icons/*.svg')
      ]
    }
  },

  dist: {
    css: config.relative(config.directories[config.env], 'css/'),
    fonts: config.relative(config.directories[config.env], 'fonts/'),
    icons: config.relative(config.directories[config.env], 'icons/'),
    img: config.relative(config.directories[config.env], 'img/')
  },

  tmp: 'tmp',
  doc: './doc',
  test: {
    e2e: config.relative(config.directories.test, 'e2e/**/*.js'),
    unit: config.relative(config.directories.test, 'unit/**/*.spec.js'),
    entry: config.relative(config.directories.test, 'unit/index.js')
  }
};

// SCSS
config.scss = {
  dev: {
    errLogToConsole: true,
    outputStyle: 'expanded',
    includePaths: []
  },
  dist: {
    errLogToConsole: true,
    outputStyle: 'compressed',
    includePaths: []
  }
};

// Autoprefixer
config.autoprefixer = [
  'last 5 Chrome versions',
  'last 5 Firefox versions',
  'last 2 Safari versions',
  'Explorer >= 10'
];

// Documentation
config.yuidoc = {
  parser: {
    project: {
      name: config.title,
      description: 'Documentation',
      version: config.version,
      url: 'http://yuilibrary.com/projects/yuidoc',
      logo: 'http://yuilibrary.com/img/yui-logo.png',
      options: {
        external: {
          data: 'http://yuilibrary.com/yui/docs/api/data.json'
        },
        linkNatives: true,
        attributesEmit: true,
        outdir: 'docs/api'
      }
    }
  },
  render: {}
};

// Webpack common config
const webpackConfig = Immutable.fromJS({
  entry: {
    app: [
      config.path.src.entry
    ],
    vendor: [
      'arkhamjs',
      'babel-polyfill',
      'bluebird',
      'react',
      'react-dom',
      'react-router',
      'whatwg-fetch'
    ]
  },
  output: {
    filename: '[name].js',
    publicPath: '/js'
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.json'
    ],
    modulesDirectories: [
      config.directories.src,
      'node_dev',
      'node_modules'
    ],
    alias: {
      actions: config.absolute(config.directories.src, 'actions'),
      components: config.absolute(config.directories.src, 'components'),
      config: config.absolute(config.directories.src, 'config', config.env),
      constants: config.absolute(config.directories.src, 'constants'),
      services: config.absolute(config.directories.src, 'services'),
      stores: config.absolute(config.directories.src, 'stores'),
      views: config.absolute(config.directories.src, 'views'),
      errors: config.absolute(config.directories.src, 'errors'),
      styles: config.absolute(config.directories.src, 'styles'),
      test: config.absolute(config.directories.test),
      dev: config.absolute('node_dev'),
      'react/lib/Object.assign': 'object-assign'
    }
  },
  module: {
    preLoaders: [
      {
        loader: 'json-loader',
        test: /\.json$/
      },
      {
        loader: 'eslint-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  eslint: {
    configFile: '.eslintrc'
  }
});

config.webpack = {};

// Webpack - Development
config.webpack.development = webpackConfig
  .mergeDeep({
    debug: true,
    devtool: false,
    eslint: {emitWarning: true},
    output: {path: config.absolute(config.directories.development, 'js')},
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
        'APP_VERSION': JSON.stringify(config.version),
        'window.APP_VERSION': JSON.stringify(config.version)
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.ProvidePlugin({'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'}),
      new HtmlWebpackPlugin({
        title: config.title,
        template: config.absolute(config.directories.src, config.filenames.index),
        hash: false,
        filename: config.absolute(config.directories[config.env], config.filenames.index),
        inject: false,
        external: config.external
      }),
      new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js')
    ]
  })
  .toJS();
config.webpack.development.entry.app.push('webpack-hot-middleware/client');

// Webpack - Test
config.webpack.test = webpackConfig
  .delete('entry')
  .delete('output')
  .delete('plugins')
  .mergeDeep({
    debug: true,
    devtool: 'cheap-module-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('preprod'),
        'APP_VERSION': JSON.stringify(config.version),
        'window.APP_VERSION': JSON.stringify(config.version)
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.ProvidePlugin({'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'}),
      new HtmlWebpackPlugin({
        title: config.title,
        template: config.absolute(config.directories.src, config.filenames.index),
        hash: false,
        filename: config.absolute(config.directories[config.env], config.filenames.index),
        inject: false,
        external: config.external
      }),
    ],
    eslint: {configFile: '.eslintrc'}
  })
  .toJS();

// Webpack - Pre-production
config.webpack.preprod = webpackConfig
  .mergeDeep({
    eslint: {failOnError: true},
    output: {path: config.absolute(config.directories.preprod, 'js')},
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('preprod'),
        'APP_VERSION': JSON.stringify(config.version),
        'window.APP_VERSION': JSON.stringify(config.version)
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.ProvidePlugin({'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'}),
      new HtmlWebpackPlugin({
        title: config.title,
        template: config.absolute(config.directories.src, config.filenames.index),
        hash: false,
        filename: config.absolute(config.directories[config.env], config.filenames.index),
        inject: false,
        external: config.external
      }),
      new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js')
    ]
  })
  .toJS();

// Webpack - Production
config.webpack.production = webpackConfig
  .mergeDeep({
    eslint: {failOnError: true},
    output: {path: config.absolute(config.directories.production, 'js')},
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'APP_VERSION': JSON.stringify(config.version),
        'window.APP_VERSION': JSON.stringify(config.version)
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.ProvidePlugin({'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'}),
      new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js'),
      new HtmlWebpackPlugin({
        title: config.title,
        template: config.absolute(config.directories.src, config.filenames.index),
        hash: false,
        filename: config.absolute(config.directories[config.env], config.filenames.index),
        inject: false,
        external: config.external
      }),
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        },
        minimize: {
          warnings: false
        },
        sourceMap: false,
        compress: {
          unused: true,
          dead_code: true,
          warnings: false
        }
      })
    ]
  })
  .toJS();

export default config;
