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
    unit: config.relative(config.directories.test, 'unit/index.js')
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
    publicPath: '/js',
    path: config.absolute(config.directories[config.env], 'js')
  },
  resolve: {
    extensions: [
      '.js',
      '.json'
    ],
    modules: [
      config.directories.src,
      'node_modules'
    ],
    alias: {
      actions: config.absolute(config.directories.src, 'actions'),
      components: config.absolute(config.directories.src, 'components'),
      config: config.absolute(config.directories.src, 'config', config.env),
      constants: config.absolute(config.directories.src, 'constants'),
      errors: config.absolute(config.directories.src, 'errors'),
      services: config.absolute(config.directories.src, 'services'),
      stores: config.absolute(config.directories.src, 'stores'),
      styles: config.absolute(config.directories.src, 'styles'),
      test: config.absolute(config.directories.test),
      views: config.absolute(config.directories.src, 'views'),
      'react/lib/Object.assign': 'object-assign'
    }
  },
  module: {
    rules: [
      {
        use: [{loader: 'eslint-loader', options: {configFile: '.eslintrc', emitWarning: true, failOnError: true}}],
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        use: [{loader: 'babel-loader', options: {presets: ['es2015', 'react', 'stage-0']}}],
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.env),
      'APP_VERSION': JSON.stringify(config.version),
      'window.APP_VERSION': JSON.stringify(config.version)
    }),
    new HtmlWebpackPlugin({
      title: config.title,
      template: config.absolute(config.directories.src, config.filenames.index),
      hash: false,
      filename: config.absolute(config.directories[config.env], config.filenames.index),
      inject: false,
      external: config.external
    }),
    new webpack.ProvidePlugin({'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'})
  ]
});

config.webpack = {};

// Webpack - Development
config.webpack.development = webpackConfig
  .mergeDeep({devtool: 'eval'})
  .toJS();
config.webpack.development.plugins.push(
  new webpack.LoaderOptionsPlugin({debug: true}),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'})
);
config.webpack.development.entry.app.concat('webpack-hot-middleware/client');
config.webpack.development.entry.vendor.push('webpack-hot-middleware/client');

// Webpack - Test
config.webpack.test = webpackConfig
  .delete('entry')
  .delete('output')
  .mergeDeep({
    devtool: 'cheap-module-source-map',
    externals: {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    }
  })
  .toJS();
config.webpack.test.plugins.push(new webpack.LoaderOptionsPlugin({debug: true}));
config.webpack.test.module.rules.push({
  use: [{loader: 'isparta-loader'}],
  test: /\.js$/,
  include: path.resolve(`${config.directories.src}/`),
  enforce: 'post'
});

// Webpack - Pre-production
config.webpack.preprod = webpackConfig.toJS();
config.webpack.preprod.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'})
);

// Webpack - Production
config.webpack.production = webpackConfig.toJS();
config.webpack.production.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    compress: {
      unused: true,
      dead_code: true
    }
  })
);

// Karma
config.karma = {
  configFile: config.absolute('karma.conf.js')
};

export default config;
