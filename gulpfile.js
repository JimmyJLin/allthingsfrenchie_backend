'use strict';


const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const $ = require('gulp-load-plugins')()
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');


// SASS css
gulp.task('css', function(){
  return gulp.src('app/sass/main.scss', { style: 'expanded'})
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer({
      broswers: [ 'last 2 versions' ],
      cascade: false
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./public/css'))
    .pipe($.livereload())
})
gulp.task('css:build', ['css'], function(){
  return gulp.src('app/sass/main.scss')
    .pipe($.rev())
    .pipe(gulp.dest('./public/css'))
    .pipe($.rev.manifest())
    .pipe(gulp.dest('./public/css'))
})

// javascript
gulp.task('scripts', function(){
  gulp.src('app/js/main.js')
      .pipe(gulp.dest('./public/js'))
      .pipe($.livereload())
})
gulp.task('scripts:build', ['scripts'], function(){
  return gulp.src('app/js/main.js')
    .pipe($.rev())
    .pipe(gulp.dest('./public/js'))
    .pipe($.rev.manifest())
    .pipe(gulp.dest('./public/js'))
})

// jquery
gulp.task('jquery', function(){
  gulp.src('app/js/jquery.js')
      .pipe(gulp.dest('./public/js'))
      .pipe($.livereload())
})
gulp.task('jquery:build', ['jquery'], function(){
  return gulp.src('app/js/main.js')
    .pipe($.rev())
    .pipe(gulp.dest('./public/js'))
    .pipe($.rev.manifest())
    .pipe(gulp.dest('./public/js'))
})

// images
gulp.task('images', function() {
  gulp.src([
    './app/images/**/*'
  ])
  .pipe(gulp.dest('./public/images'))
  .pipe($.livereload())
})
gulp.task('images:build', ['images'], function() {
  return gulp.src('app/images/**/*')
             .pipe($.rev())
             .pipe(gulp.dest('./public/images'))
             .pipe($.rev.manifest())
             .pipe(gulp.dest('./public/images'))
})

// ejs
gulp.task('ejs', function(){
  return gulp.src('views/**/*.ejs')
  .pipe($.livereload())
})

// gulp watch tasks
gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('app/sass/**/*.scss', ['css'])
  gulp.watch('app/js/main.js', ['scripts'])
  gulp.watch('app/js/jquery.js', ['jquery'])
  gulp.watch('app/images/**/*', ['images'])
  gulp.watch('views/**/*.ejs', ['ejs'])
})

// gulp serve
gulp.task('server', function(){
  nodemon({
    'script': 'server.js',
    'ignore': 'app/js/*.js'
  })
})

gulp.task('serve', ['server', 'watch'])
