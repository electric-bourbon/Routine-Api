'use strict';

var gulp = require('gulp');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var babel = require('gulp-babel');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
  return gulp.src(['./**/*.js', '!./node_modules/**/*.js', '!./dist/**/*.js']).pipe(babel({
    presets: ['es2015']
  })).pipe(gulp.dest('./dist/'));
});

gulp.task('lint', jsHint);
gulp.task('watch', ['watchlist']);
gulp.task('watchlist', function () {
  gulp.watch(['./app/**/*.js', '!./dist/app.js', './server.js'], ['hint:js']);
});

function notifyError() {
  return plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
  });
};

function jsHint() {
  return gulp.src(['./app/**/*.js', '!./dist/app.js', '!./dist/app.js']).pipe(notifyError()).pipe(jshint({ "esnext": true })).pipe(jshint.reporter('fail')).pipe(jshint.reporter('jshint-stylish'));
}