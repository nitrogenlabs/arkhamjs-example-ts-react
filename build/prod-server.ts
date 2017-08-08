import * as bodyParser from 'body-parser';
import * as history from 'connect-history-api-fallback';
import * as express from 'express';
import * as useragent from 'express-useragent';
import * as util from 'gulp-util';
import {Server} from 'http';
import {config} from './config';

maskErrors(schema);

// Express
const app = express();
const server: Server = new Server(app);
const port: number = config.port.production;

// User Agent
app.use(useragent.express());

// Body
app.use(bodyParser.json({limit: '1mb'}));

// SPA History
app.use(history());

// Static files
app.use(express.static(config.absolute(config.directories[config.env])));

// Dynamic SPA route
app.get('*', (req, res) => {
  const filename: string = config.absolute(config.directories[config.env], 'index.html');
  res.write(webpackDev.fileSystem.readFileSync(filename));
  res.end();
});

// Run server on default port
server
  .listen(port, () => {
    util.log('---------------------------------------');
    util.log('|  PRODUCTION                         |');
    util.log('|  Local: http://localhost:%d', server.address().port);
    util.log('---------------------------------------');
  })
  .on('error', (error: Error) => {
    util.log('[express]', error.message);
  });
