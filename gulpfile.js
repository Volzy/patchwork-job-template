var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

// Create the CSS task
gulp.task('sass', function(cb) {
	return gulp.src('assets/scss/*.scss')
		.pipe(sass())
		.pipe(autoprefixer({ browsers: ['last 2 versions', 'ie 9'] }))
		.pipe(minifycss())
		.pipe(gulp.dest('css'));
});

// Watch task
gulp.task('watch', function() {
	gulp.watch('assets/scss/*.scss', ['sass']);
});


// Default task
gulp.task('default', ['watch']);