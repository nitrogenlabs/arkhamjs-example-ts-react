import gulp from 'gulp';
import config from '../config';
import plumber from 'gulp-plumber';
import util from 'gulp-util';
import image from 'gulp-image';

gulp.task('img:copy', () => {
  return gulp.src(config.path.src.img.files)
    .pipe(plumber({errorHandler: util.log}))
    .pipe(gulp.dest(config.path.dist.img));
});

gulp.task('img:watch', ['img:copy'], () => {
  return gulp.watch(config.path.src.img.files, ['img:copy']);
});

gulp.task('img:compress', () => {
  return gulp.src(config.path.src.img.files)
    .pipe(plumber({errorHandler: util.log}))
    .pipe(image())
    .pipe(gulp.dest(config.path.dist.img));
});
