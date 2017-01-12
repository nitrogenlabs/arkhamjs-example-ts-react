import gulp from 'gulp';
import config from '../config';
import plumber from 'gulp-plumber';
import util from 'gulp-util';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';

// Tests
// Run all javascript tests
gulp.task('test', ['js:mocha']);

// Verification
// Run all test/verification tasks
gulp.task('verify', ['js:mocha', 'js:hint']);

gulp.task('js:eslint', () => {
  return gulp.src(config.path.src.js)
    .pipe(plumber({errorHandler: util.log}))
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('js:mocha', () => {
  return gulp.src(config.path.test.entry, {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});