import * as del from 'del';
import * as gulp from 'gulp';
import * as vinylPaths from 'vinyl-paths';
import {config} from '../config';

// Deletes all files in the output path
gulp.task('clean', () => {
  return gulp.src([
      config.absolute(config.directories.dist) + '/*'
    ], {dot: true, read: false})
    .pipe(vinylPaths(del));
});
