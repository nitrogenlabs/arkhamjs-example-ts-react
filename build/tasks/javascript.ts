import * as gulp from 'gulp';
import * as util from 'gulp-util';
import * as webpack from 'webpack';
import {config} from '../config';

gulp.task('js:webpack', ['js:copy'], (done: () => void) => {
  // Run Webpack
  webpack(config.webpack[config.env], (error, stats) => {
    if(error) {
      throw new util.PluginError('webpack', error);
    }
    
    util.log('[webpack]', stats.toString({
      color: true
    }));
    
    done();
  });
});

// Copy JS
gulp.task('js:copy', ['js:editor'], () => {
  const externalFiles: string[] = config.external.js
    .map((u: string) => {
      if(u && u.substr(0, 4) !== 'http') {
        return config.relative(u);
      }
      
      return null;
    })
    .filter((u: string) => !!u);
  
  return gulp.src(externalFiles)
    .pipe(gulp.dest(config.absolute(config.directories[config.env], 'js')));
});

gulp.task('js:editor', () => {
  return gulp.src(['./node_modules/alloyeditor/dist/alloy-editor/**/*'])
    .pipe(gulp.dest(config.absolute(config.directories[config.env], 'alloyeditor')));
});
