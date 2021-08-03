const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");
const browserSync = require("browser-sync").create();
const gcmq = require("gulp-group-css-media-queries");
var sass = require('gulp-sass')(require('sass'));


function clean(cb) {
    del("assets/css");
    cb();
}


function style() {
    return gulp
    .src("assets/sass/style.scss")
    .pipe(sass())
    .pipe(gcmq())
    .pipe(
        autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true,
        })
    )
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream());
}


function html() {
    return gulp
      .src("./")
      .pipe(gulp.dest("./"))
      .pipe(browserSync.stream());
}


function watch() {
    browserSync.init({
      server: {
        baseDir: "./",
      },
    });
    gulp.watch("assets/sass/*.scss", style);
    gulp.watch("assets/sass/**/*.scss", style);
    gulp.watch("assets/sass/component/*.scss", style);
    gulp.watch("./*.html", html);
}


let build = gulp.series(
    clean,
    gulp.parallel(style, html)
);


gulp.task("clean", clean);
gulp.task("style", style);
gulp.task("html", html);
gulp.task("default", gulp.series(clean, build, watch));