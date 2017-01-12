import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('default', ['development']);
gulp.task('development', done => {
  runSequence(
    'clean',
    ['js:copy', 'css:watch', 'img:watch'],
    'server:dev',
    done
  );
});

gulp.task('production', done => {
  runSequence(
    'clean',
    ['js:webpack', 'js:copy', 'css:compress', 'img:compress'],
    'server:prod',
    done
  );
});