import * as del from 'del';
import * as gulp from 'gulp';
import * as plumber from 'gulp-plumber';
import tslint from 'gulp-tslint';
import * as util from 'gulp-util';
import * as runSequence from 'run-sequence';
import * as vinylPaths from 'vinyl-paths';
import {config} from '../config';

// Tests
// Run all javascript tests
gulp.task('test', (done: () => void) => {
  runSequence(
    'test:clean',
    done
  );
});

// TSLint
gulp.task('js:tslint', () => {
  return gulp.src(config.path.src.ts)
    .pipe(plumber({errorHandler: util.log}))
    .pipe(tslint({
      formatter: 'verbose'
    }));
});

// Deletes all test files
gulp.task('test:clean', () => {
  return gulp.src(`${config.relative('coverage')}/*`, {dot: true, read: false})
    .pipe(vinylPaths(del));
});
