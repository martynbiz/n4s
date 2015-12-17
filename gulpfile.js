var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    wrap = require('gulp-wrap-amd'),
    watch = require('gulp-watch');

gulp.task('default', function() {

    // wrap scripts in amd-start/end
    var scripts = [
        "./src/cache.js",
        "./src/http.js",
        "./src/utils.js",
        "./src/app.js",
    ];

    gulp.src(scripts)
        .pipe(concat('n4s.js'))
        .pipe(gulp.dest('./dist'));

    gulp.src(scripts)
        .pipe(concat('n4s.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));

    gulp.src(scripts)
        .pipe(concat('n4s-amd.js'))
        .pipe(wrap({
            deps: ['jquery'],          // dependency array
            params: ['$'],        // params for callback
            exports: 'n4s',         // variable to return
            // moduleRoot: 'templates/', // include a module name in the define() call, relative to moduleRoot
            // modulePrefix: 'rocks/'  // optional, prefix of the module name. It depends on existance of `moduleRoot`
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {

    watch(["./src/*.js"], function (event) {
        gulp.start('default');
    });
});
