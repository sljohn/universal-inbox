'use strict';

const gulp = require('gulp');
const jshint = require('gulp-jshint');

gulp.task('default', function () {
  // place code for your default task here
});

gulp.task('lint', function () {
  gulp.src([
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
});
