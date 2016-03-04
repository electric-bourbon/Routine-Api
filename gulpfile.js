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
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');

gulp.task('lint', jsHint);
gulp.task('watch', ['watchlist']);
gulp.task('watchlist', function() {
    gulp.watch(['./app/**/*.js', '!./dist/app.js', './server.js'], ['lint']);
});

function notifyError() {
    return plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
    });
};

function jsHint() {
    return gulp.src(['./app/**/*.js', '!./dist/app.js', '!./dist/app.js'])
        .pipe(notifyError())
        .pipe(jshint({
            "esnext": true
        }))
        .pipe(jshint.reporter('fail'))
        .pipe(jshint.reporter('jshint-stylish'));
}
