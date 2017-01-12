import gulp from 'gulp';
import config from '../config';
import plumber from 'gulp-plumber';
import util from 'gulp-util';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import flatten from 'gulp-flatten';
import replace from 'gulp-replace';
import rename from 'gulp-rename';
import svgstore from 'gulp-svgstore';
import svgmin from 'gulp-svgmin';

gulp.task('css:copy', ['fonts', 'icons'], () => {
  return gulp.src(config.path.src.scss.main)
    .pipe(plumber({errorHandler: util.log}))
    .pipe(sass(config.scss.dev))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulp.dest(config.absolute(config.path.dist.css)));
});

gulp.task('css:watch', ['css:copy'], () => {
  return gulp.watch(config.path.src.scss.files, ['css:copy']);
});

gulp.task('css:compress', ['fonts', 'icons'], () => {
  return gulp.src(config.path.src.scss.main)
    .pipe(plumber({errorHandler: util.log}))
    .pipe(sass(config.scss.dist))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulp.dest(config.absolute(config.path.dist.css)));
});

gulp.task('fonts', () => {
  return gulp.src(config.path.src.fonts.files)
    .pipe(plumber({errorHandler: util.log}))
    .pipe(flatten())
    .pipe(gulp.dest(config.absolute(config.path.dist.fonts)));
});

// Icons
gulp.task('icons', () => {
  return gulp.src(config.path.src.icons.files)
    .pipe(replace('fill="#000"', ''))
    .pipe(svgmin())
    .pipe(svgstore({inlineSvg:true}))
    .pipe(rename(config.filenames.icons))
    .pipe(gulp.dest(config.absolute(config.path.dist.icons)));
});

gulp.task('icons:copy', () => {
  return gulp.src(['./node_modules/nl-fluid/lib/icons.svg'])
    .pipe(gulp.dest(config.absolute(config.path.dist.icons)));
});
