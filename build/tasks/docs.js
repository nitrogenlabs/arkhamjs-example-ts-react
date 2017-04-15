import gulp from 'gulp';
import config from '../config';
import esdoc from 'esdoc';
import publisher from 'esdoc/out/src/Publisher/publish';

// Uses ESDoc to generate documentation to doc/api.json
gulp.task('docs', done => {
  const opts = {
    title: config.title,
    source: config.directories.src,
    destination: config.path.docs,
    excludes: ['config', 'index.js', 'app.js', '\\Constants\\.(js)$', '\\Store\\.(js)$'],
    experimentalProposal: {
      classProperties: true,
      objectRestSpread: true,
      decorators: true,
      doExpressions: true,
      functionBind: true,
      asyncGenerators: true,
      exportExtensions: true,
      dynamicImport: true
    }
  };
  
  esdoc.generate(opts, (results, asts, config) => {
    publisher(results, asts, config);
    done();
  });
});
