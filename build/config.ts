import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import {cloneDeep} from 'lodash';
import * as path from 'path';
import * as webpack from 'webpack';
import * as jsonPackage from '../package.json';

const appPackage: any = {...jsonPackage};

const configBase = {
  absolute: (...args) => [path.resolve(__dirname, '../'), ...args].join('/'),
  allowedOrigins: {
    development: [
      'localhost'
    ],
    production: [
      'arkhamjs.com'
    ]
  },
  autoprefixer: [
    'last 5 Chrome versions',
    'last 5 Firefox versions',
    'last 2 Safari versions',
    'Explorer >= 10'
  ],
  directories: {
    development: 'dist/dev',
    dist: 'dist',
    preprod: 'dist/preprod',
    production: 'dist/prod',
    src: 'src',
    test: 'test'
  },
  env: process.env.NODE_ENV || 'development',
  external: {
    css: [
      '/css/core.css'
    ],
    js: []
  },
  filenames: {
    entry: 'app.tsx',
    icons: 'icons.svg',
    index: 'index.html',
    scss: 'core.scss'
  },
  name: 'arkhamjs-skeleton',
  port: {
    development: 5000,
    production: 3000
  },
  relative: (...args) => ['.', ...args].join('/'),
  title: 'ArkhamJS Skeleton',
  url: 'arkhamjs.com',
  version: appPackage.version
};

const configModules = {
  karma: {
    configFile: configBase.absolute('karma.conf.js')
  },
  scss: {
    dev: {
      errLogToConsole: true,
      includePaths: [],
      outputStyle: 'expanded'
    },
    dist: {
      errLogToConsole: true,
      includePaths: [],
      outputStyle: 'compressed'
    }
  }
};

const configPath = {
  dist: {
    css: configBase.relative(configBase.directories[configBase.env], 'css/'),
    fonts: configBase.relative(configBase.directories[configBase.env], 'fonts/'),
    icons: configBase.relative(configBase.directories[configBase.env], 'icons/'),
    img: configBase.relative(configBase.directories[configBase.env], 'img/')
  },
  docs: './docs',
  src: {
    entry: configBase.absolute(configBase.directories.src, configBase.filenames.entry),
    fonts: {
      dir: configBase.relative(configBase.directories.src, 'fonts/'),
      files: []
    },
    html: configBase.relative(configBase.directories.src, '**/*.html'),
    icons: {
      files: [
        configBase.relative(configBase.directories.src, 'icons/*.svg')
      ]
    },
    img: {
      files: [
        configBase.relative(configBase.directories.src, 'img/**/*.{png,jpg,gif,svg}'),
        configBase.relative(configBase.directories.src, 'views/**/*.{png,jpg,gif,svg}'),
        configBase.relative(configBase.directories.src, 'favicon.ico')
      ]
    },
    scss: {
      files: [
        configBase.relative(configBase.directories.src, 'styles/**/*.scss')
      ],
      includes: [],
      main: configBase.relative(configBase.directories.src, configBase.filenames.scss)
    },
    ts: configBase.relative(configBase.directories.src, '**/*.ts')
  },
  test: {
    e2e: configBase.relative(configBase.directories.test, 'e2e/**/*.js'),
    unit: configBase.relative(configBase.directories.test, 'unit/index.js')
  },
  tmp: 'tmp'
};

// Webpack common config
const webpackConfig = {
  devtool: 'source-map',
  entry: {
    app: [
      configPath.src.entry
    ],
    vendor: [
      'arkhamjs',
      'lodash',
      'prop-types',
      'react',
      'react-addons-css-transition-group',
      'react-dom',
      'react-router-dom'
    ]
  },
  externals: {},
  module: {
    rules: [
      {
        loader: 'awesome-typescript-loader',
        test: /\.tsx?$/
      },
      {
        enforce: 'pre',
        loader: 'source-map-loader',
        test: /\.js$/
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: configBase.absolute(configBase.directories[configBase.env], 'js'),
    publicPath: '/js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'APP_VERSION': JSON.stringify(configBase.version),
      'process.env.NODE_ENV': JSON.stringify(configBase.env),
      'window.APP_VERSION': JSON.stringify(configBase.version)
    }),
    new HtmlWebpackPlugin({
      external: configBase.external,
      filename: configBase.absolute(configBase.directories[configBase.env], configBase.filenames.index),
      hash: false,
      inject: false,
      template: configBase.absolute(configBase.directories.src, configBase.filenames.index),
      title: configBase.title
    }),
    new webpack.ProvidePlugin({fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'})
  ],
  resolve: {
    alias: {
      actions: configBase.absolute(configBase.directories.src, 'actions'),
      components: configBase.absolute(configBase.directories.src, 'components'),
      config: configBase.absolute(configBase.directories.src, 'config'),
      errors: configBase.absolute(configBase.directories.src, 'errors'),
      services: configBase.absolute(configBase.directories.src, 'services'),
      stores: configBase.absolute(configBase.directories.src, 'stores'),
      views: configBase.absolute(configBase.directories.src, 'views')
    },
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.json'
    ],
    modules: [
      configBase.directories.src,
      'node_modules'
    ]
  }
};

const configWebpack = {
  development: cloneDeep(webpackConfig),
  preprod: cloneDeep(webpackConfig),
  production: cloneDeep(webpackConfig),
  test: cloneDeep(webpackConfig)
};

// Webpack - Development
configWebpack.development.devtool = 'eval';
configWebpack.development.plugins.push(
  new webpack.LoaderOptionsPlugin({debug: true}),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'})
);
configWebpack.development.entry.app.concat('webpack-hot-middleware/client');
configWebpack.development.entry.vendor.push('webpack-hot-middleware/client');

// Webpack - Test
delete configWebpack.test.entry;
delete configWebpack.test.output;
configWebpack.test.devtool = 'cheap-module-source-map';
configWebpack.test.plugins.push(new webpack.LoaderOptionsPlugin({debug: true}));

// Webpack - Pre-production
configWebpack.preprod.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'})
);

// Webpack - Production
configWebpack.production.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      dead_code: true,
      unused: true
    },
    output: {
      comments: false
    }
  })
);

export const config = {...configBase, ...configModules, path: configPath, webpack: configWebpack};
