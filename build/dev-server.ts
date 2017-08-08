import * as bodyParser from 'body-parser';
import * as history from 'connect-history-api-fallback';
import * as express from 'express';
import * as useragent from 'express-useragent';
import * as util from 'gulp-util';
import {Server} from 'http';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import {config} from './config';

// Hot reloading
const enableHot: boolean = true;

// Express
const app = express();
const server: Server = new Server(app);
const port: number = config.port[config.env];

// User Agent
app.use(useragent.express());

// Body
app.use(bodyParser.json({limit: '1mb'}));

// SPA History
app.use(history());

// Static files
app.use(express.static(config.absolute(config.directories[config.env])));

// Webpack middleware
const compiler = webpack(config.webpack[config.env], (error: Error) => {
  if(error) {
    throw new util.PluginError('webpack', error);
  }
});

let webpackDevConfig: object;
let webpackHotConfig: object;

if(enableHot) {
  webpackDevConfig = {
    contentBase: false,
    filename: 'app.js',
    headers: {'Access-Control-Allow-Origin': '*'},
    historyApiFallback: true,
    hot: true,
    lazy: false,
    noInfo: false,
    publicPath: config.webpack.development.output.publicPath,
    quiet: false,
    stats: {
      chunkModules: false,
      chunks: false,
      colors: true,
      hash: false,
      modules: false,
      timings: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  };

  webpackHotConfig = {
    dynamicPublicPath: true,
    heartbeat: 10 * 1000,
    log: util.log,
    name: 'app',
    overlay: false,
    reload: false,
    timeout: 2000
  };
} else {
  webpackDevConfig = {
    contentBase: config.directories.src,
    headers: {'Access-Control-Allow-Origin': '*'},
    historyApiFallback: true,
    hot: true,
    inline: true,
    lazy: true,
    noInfo: true,
    publicPath: `http://localhost:${port}/js`,
    stats: {
      chunkModules: false,
      chunks: false,
      colors: true,
      hash: false,
      modules: false,
      timings: true
    }
  };

  webpackHotConfig = {
    dynamicPublicPath: true,
    heartbeat: 10 * 1000,
    log: util.log,
    reload: true
  };
}

const webpackDev = webpackDevMiddleware(compiler, webpackDevConfig);
const webpackHot = webpackHotMiddleware(compiler, webpackHotConfig);

app.use(webpackDev);
app.use(webpackHot);

// Dynamic SPA route
app.get('*', (req, res) => {
  const filename: string = config.absolute(config.directories[config.env], 'index.html');
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
    .on('error', (error: Error) => {
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
