const { src, dest, watch, series } = require('gulp');
const rename = require("gulp-rename");
const pug = require('gulp-pug');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');

function html() {
  return src('src/index.pug')
    .pipe(pug())
    .pipe(dest('build'))
}

function css() {
  return src('src/style.css')
    .pipe(cssnano())
    .pipe(rename("style.min.css"))
    .pipe(dest('src/'))
}

function js() {
  return src('src/script.js')
    .pipe(rename("script.min.js"))
    .pipe(dest('src/'))
}

exports.js = js;
exports.css = css;
exports.html = html;

exports.default = function() {
  watch('src/style.css', series(css, html));
  watch('src/script.js', series(js, html));
  watch('src/*.pug', { ignoreInitial: false }, series(css, js, html));
};
