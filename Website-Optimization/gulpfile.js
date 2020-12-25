var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var jsmin = require('gulp-jsmin');

gulp.task('default', ['coreMinifyImages', 'viewsMinifyImages', 'coreMinifyCss', 'viewsMinifyCss', 'coreMinifyJs', 'viewsMinifyJs', 'coreMinifyHtml', 'viewsMinifyHtml']);

gulp.task('coreMinifyImages', function () {
    return gulp.src('img/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('viewsMinifyImages', function () {
    return gulp.src('views/images/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/views/images'));
});

gulp.task('coreMinifyCss', function() {
    return gulp.src('css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('viewsMinifyCss', function() {
    return gulp.src('views/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/views/css'));
});

gulp.task('coreMinifyJs', function() {
    return gulp.src('js/*.js')
        .pipe(jsmin())
        .pipe(gulp.dest('dist/js'));

});

gulp.task('viewsMinifyJs', function() {
    return gulp.src('views/js/*.js')
        .pipe(jsmin())
        .pipe(gulp.dest('dist/views/js'));
});

gulp.task('coreMinifyHtml', function() {
  return gulp.src('*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist'));
});


gulp.task('viewsMinifyHtml', function() {
  return gulp.src('views/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist/views'));
});
