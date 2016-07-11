'use strict';

const gulp = require('gulp');
const jshint = require('gulp-jshint');

gulp.task('default', function () {
  // place code for your default task here
});

gulp.task('jshint', function () {
  gulp.src('./server/controllers/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
