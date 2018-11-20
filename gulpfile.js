var gulp = require('gulp');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

var LibraryConfig = {
    SOURCE: [
        // Framework code
        './js/config/*.js',
        './js/utils/*.js',
        './js/base/*.js',
        './js/core/*.js',
        './js/App.js',

        // Built-ins
        './js/builtin/**/*.js'
    ],
    DEST_NAME: 'mvc-lite'
};

var AppConfig = {
    SOURCE: [
        './app/**/*.js'
    ],
    DEST_NAME: 'app'
};

var DEST_PATH = "./dist/";

var themePath = './app/style/';
var SassConfig = {
    SOURCE: [
        themePath + '**/*.scss'
    ]
};
gulp.task('compile-mvc', function () {
    return gulp.src(LibraryConfig.SOURCE)
        .pipe(concat(LibraryConfig.DEST_NAME + '.js'))
        .pipe(gulp.dest(DEST_PATH))
        .pipe(rename(LibraryConfig.DEST_NAME + '.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(DEST_PATH));
});

gulp.task('compile-app', function () {
    return gulp.src(AppConfig.SOURCE)
        .pipe(concat(AppConfig.DEST_NAME + '.js'))
        .pipe(gulp.dest(DEST_PATH))
        .pipe(rename(AppConfig.DEST_NAME + '.min.js'))
        .pipe(gulp.dest(DEST_PATH));
});

gulp.task('sass', function () {
    return gulp.src(SassConfig.SOURCE)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('main.css'))
        .pipe(gulp.dest(DEST_PATH));
});

gulp.task('watch', function () {
    gulp.watch('js/**/*.js', gulp.series(['compile-mvc']));
    gulp.watch('app/**/*.js', gulp.series(['compile-app']));
    gulp.watch('app/style/**/*.scss', gulp.series(['sass']));
});