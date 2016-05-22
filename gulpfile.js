var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
// Static server
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
});

gulp.watch("src/index.html").on("change",reload);