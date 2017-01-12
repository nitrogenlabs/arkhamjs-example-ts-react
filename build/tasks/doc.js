import gulp from 'gulp';
import config from '../config';
import plumber from 'gulp-plumber';
import util from 'gulp-util';
import yuidoc from 'gulp-yuidoc';

// uses yui to generate documentation to doc/api.json
gulp.task('doc', () => {
  return gulp.src(config.directories.src)
    .pipe(plumber({errorHandler: util.log}))
    .pipe(yuidoc.parser(config.yuidoc.parser, 'api.json'))
    .pipe(yuidoc.reporter())
    .pipe(yuidoc.generator())
    .pipe(gulp.dest(config.path.doc));
});