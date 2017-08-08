import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';

gulp.task('default', ['development']);
gulp.task('development', (done: () => void) => {
  runSequence(
    'clean',
    ['js:copy', 'css:watch', 'img:watch'],
    'server:dev',
    done
  );
});

gulp.task('compile', (done: () => void) => {
  runSequence(
    'clean',
    ['js:webpack', 'js:copy', 'css:compress', 'img:compress'],
    done
  );
});

gulp.task('production', (done: () => void) => {
  runSequence(
    'clean',
    ['js:webpack', 'js:copy', 'css:compress', 'img:compress'],
    'server:prod',
    done
  );
});
