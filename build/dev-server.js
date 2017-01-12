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

const webpackDev = webpackDevMiddleware(compiler, {
  contentBase: config.directories.src,
  publicPath: `http://localhost:${port}/js/`,
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
  watchOptions: {
    aggregateTimeout: 300,
    poll: false
  },
  historyApiFallback: true
});

const webpackHot = webpackHotMiddleware(compiler, {
  log: util.log,
  reload: false,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
  timeout: 2000,
  overlay: false
});

app.use(webpackDev);
app.use(webpackHot);

// Dynamic SPA route
app.get('*', (req, res) => {
  const filename = config.absolute(config.directories[config.env], 'index.html');
  res.write(webpackDev.fileSystem.readFileSync(filename));
  res.end();
});

// Run server on default port
server.listen(port, () => {
  util.log('---------------------------------------');
  util.log('|  DEVELOPMENT                        |');
  util.log('|  Local: http://localhost:%d', server.address().port);
  util.log('---------------------------------------');
})
  .on('error', error => {
    util.log('[express]', error.message);
  });
