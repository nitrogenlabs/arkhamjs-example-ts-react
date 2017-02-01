import config from '../config';
import del from 'del';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import karma from 'karma';
import plumber from 'gulp-plumber';
import runSequence from 'run-sequence';
import util from 'gulp-util';
import vinylPaths from 'vinyl-paths';

// Tests
// Run all javascript tests
gulp.task('test', done => {
  runSequence(
    'test:clean',
    'js:karma',
    done
  );
});

// ESLint
gulp.task('js:eslint', () => {
  return gulp.src(config.path.src.js)
    .pipe(plumber({errorHandler: util.log}))
    .pipe(eslint())
    .pipe(eslint.format());
});

// Karma unit tests
gulp.task('js:karma', done => {
  new karma.Server(config.karma, status => {
    done();
    process.exit(status);
  }).start();
});

// Deletes all test files
gulp.task('test:clean', () => {
  return gulp.src(`${config.relative('coverage')}/*`, {dot: true, read: false})
    .pipe(vinylPaths(del));
});