import * as gulp from 'gulp';
import * as autoprefixer from 'gulp-autoprefixer';
import * as flatten from 'gulp-flatten';
import * as plumber from 'gulp-plumber';
import * as rename from 'gulp-rename';
import * as replace from 'gulp-replace';
import * as sass from 'gulp-sass';
import * as svgmin from 'gulp-svgmin';
import * as svgstore from 'gulp-svgstore';
import * as util from 'gulp-util';
import {config} from '../config';

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
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename(config.filenames.icons))
    .pipe(gulp.dest(config.absolute(config.path.dist.icons)));
});

gulp.task('icons:copy', () => {
  return gulp.src(['./node_modules/nl-fluid/lib/icons.svg'])
    .pipe(gulp.dest(config.absolute(config.path.dist.icons)));
});
