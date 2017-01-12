import gulp from 'gulp';
import config from '../config';
import util from 'gulp-util';
import webpack from 'webpack';

gulp.task('js:webpack', ['js:copy'], done => {
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
  const externalFiles = config.external.js.map(u => {
    if(u.substr(0, 4) !== 'http') {
      return config.relative(u);
    }
  }).filter(u => u);

  return gulp.src(externalFiles)
    .pipe(gulp.dest(config.absolute(config.directories[config.env], 'js')));
});

gulp.task('js:editor', () => {
  return gulp.src(['./node_modules/alloyeditor/dist/alloy-editor/**/*'])
    .pipe(gulp.dest(config.absolute(config.directories[config.env], 'alloyeditor')));
});
