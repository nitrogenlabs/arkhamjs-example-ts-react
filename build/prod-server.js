import util from 'gulp-util';
import config from './config';
import {Server} from 'http';
import express from 'express';
import history from 'connect-history-api-fallback';
import bodyParser from 'body-parser';
import useragent from 'express-useragent';

maskErrors(schema);

// Express
const app = express();
const server = Server(app);
const port = config.port.production;

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
  const filename = config.absolute(config.directories[config.env], 'index.html');
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
  .on('error', error => {
    util.log('[express]', error.message);
  });
