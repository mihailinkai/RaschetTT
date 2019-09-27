var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var fileinclude = require('gulp-file-include');
gulp.task('server', ['styles', 'html'], function() {
	
	browserSync.init({
		server: { baseDir: './app/'}
	});


    watch(['./app/**/*.html', './app/**/*.js', './app/img/*.*']).on('change', browserSync.reload);


	watch('./app/less/**/*.less', function(){
		gulp.start('styles');
	});

	watch('./app/html/**/*.html', function(){
		gulp.start('html');
	});

});

gulp.task('styles', function() {
	return gulp.src('./app/less/main.less')
	.pipe(plumber({
		errorHandler: notify.onError(function(err){
			return {
				title: 'Styles',
				sound: false,
				message: err.message
			};
		})
	}))
	.pipe(sourcemaps.init())
	.pipe(less())
	.pipe(autoprefixer({
		overrideBrowserslist: ['last 6 versions'],
		cascade: false
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./app/css'))
	.pipe(browserSync.stream());
});

gulp.task('html', function() {
	return gulp.src('./app/html/*.html')
	.pipe(plumber({
		errorHandler: notify.onError(function(err){
			return {
				title: 'HTML include',
				sound: false,
				message: err.message
			};
		})
	}))
	.pipe(fileinclude({
prefix: '@@'

	}))
	.pipe(gulp.dest('./app/'));

});

gulp.task('default', ['server']);
