'use strict';

const gulp = require('gulp');
const jshint = require('gulp-jshint');
const del = require('del');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const stripDebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');

gulp.task('clean', function () {
  return del(['public/js']);
});

gulp.task('lint', function () {
  const stream = gulp.src([
    './server/*/*.js',
    './server/*.js',
    './public/*.js',
    './public/app/*/*.js',
    './public/app/*.js',

    //'./client/*.js',
    //'./client/app/*.js',
    //'./client/app/*/*.js',
  ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));

  return stream;
});

gulp.task('concat', ['clean', 'lint'], () => {
  const stream = gulp.src([
      './public/app/*/*.js',
      './public/app/*.js',
      './public/*.js',

      //'./client/*.js',
      //'./client/app/*.js',
      //'./client/app/*/*.js',
    ])
    .pipe(concat('bundle.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/js/'));

  return stream;
});

gulp.task('build', ['concat']);

gulp.task('default', ['build']);
