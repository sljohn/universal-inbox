'use strict';

const gulp = require('gulp');
const jshint = require('gulp-jshint');
const del = require('del');

gulp.task('clean', function () {
  return del(['public/dist']);
});

gulp.task('lint', function () {
  const stream = gulp.src([
    './server/*.js',
    './server/*/*.js',
    './client/*.js',
    './client/app/*.js',
    './client/app/*/*.js',
    './public/*.js',
    './public/app/*.js',
    './public/app/*/*.js',
  ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));

  return stream;
});

gulp.task('default', ['clean', 'lint']);
