import util from 'gulp-util';
import config from './config';
import {Server} from 'http';
import express from 'express';
import history from 'connect-history-api-fallback';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import useragent from 'express-useragent';

// Hot reloading
const enableHot = true;

// Express
const app = express();
const server = Server(app);
const port = config.port[config.env];

// User Agent
app.use(useragent.express());

// Body
app.use(bodyParser.json({limit: '1mb'}));

// SPA History
app.use(history());

// Static files
app.use(express.static(config.absolute(config.directories[config.env])));

// Webpack middleware
const compiler = webpack(config.webpack[config.env], error => {
  if(error) {
    throw new util.PluginError('webpack', error);
  }
});

let webpackDevConfig, webpackHotConfig;

if(enableHot) {
  webpackDevConfig = {
    contentBase: false,
    publicPath: config.webpack.development.output.publicPath,
    filename: 'app.js',
    hot: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    },
    quiet: false,
    lazy: false,
    noInfo: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    historyApiFallback: true,
    headers: {'Access-Control-Allow-Origin': '*'}
  };

  webpackHotConfig = {
    name: 'app',
    log: util.log,
    reload: false,
    dynamicPublicPath: true,
    heartbeat: 10 * 1000,
    timeout: 2000,
    overlay: false
  };
} else {
  webpackDevConfig = {
    contentBase: config.directories.src,
    publicPath: `http://localhost:${port}/js`,
    hot: true,
    inline: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    },
    lazy: true,
    noInfo: true,
    historyApiFallback: true,
    headers: {'Access-Control-Allow-Origin': '*'}
  };

  webpackHotConfig = {
    log: util.log,
    reload: true,
    dynamicPublicPath: true,
    heartbeat: 10 * 1000
  };
}

const webpackDev = webpackDevMiddleware(compiler, webpackDevConfig);
const webpackHot = webpackHotMiddleware(compiler, webpackHotConfig);

app.use(webpackDev);
app.use(webpackHot);

// Dynamic SPA route
app.get('*', (req, res) => {
  const filename = config.absolute(config.directories[config.env], 'index.html');
  res.write(webpackDev.fileSystem.readFileSync(filename));
  res.end();
});

// Recompile on load
const runServer = () => {
  server
    .listen(port, () => {
      util.log('---------------------------------------');
      util.log('|  DEVELOPMENT                        |');
      util.log('|  Local: http://localhost:%d', server.address().port);
      util.log('---------------------------------------');
    })
    .on('error', error => {
      util.log('[express]', error.message);
    });
};

if(enableHot) {
  webpackDev.waitUntilValid(() => {
    // Invalidate webpack
    webpackDev.invalidate();

    // Run server on default port
    runServer();
  });
} else {
  runServer();
}
