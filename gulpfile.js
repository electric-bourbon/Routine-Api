
var gulp        = require('gulp');
var wrap        = require('gulp-wrap');
var declare     = require('gulp-declare');
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var notify      = require('gulp-notify');
var plumber     = require('gulp-plumber');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var babel = require('gulp-babel');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');
var streamify   = require('gulp-streamify');

gulp.task('babelify', function() {
  browserify({ entries: './server.js', debug: true })
  .transform(babelify)
  .bundle()
  .on("error", function (err) { console.log(err.message); })
  .pipe(source('app.js'))
  // .pipe(streamify(uglify()))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('build', function() {
return gulp.src('./server.js')
.pipe(babel())
.pipe(gulp.dest('./dist/'));
});

gulp.task('hint:js', jsHint);
gulp.task('watch', ['watchlist']);
gulp.task('watchlist', function() {
  gulp.watch(['./app/**/*.js', '!./dist/app.js', './server.js'],  ['hint:js', 'babelify']);
});

function notifyError() {
  return plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
  });
};

function jsHint() {
  return gulp.src(['./app/**/*.js', '!./dist/app.js', '!./dist/app.js'])
    .pipe(notifyError())
    .pipe(jshint({"esnext" : true}))
    .pipe(jshint.reporter('fail'))
    .pipe(jshint.reporter('jshint-stylish'));
}
