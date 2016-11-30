var gulp = require('gulp')
/* css 压缩 */
var cleanCSS = require('gulp-clean-css')
/* css 去重 */
var purge = require('gulp-css-purge')
var sourcemaps = require('gulp-sourcemaps')
/* js 压缩 */
var uglify = require('gulp-uglify')
/* css 自动兼容 */
var autoprefixer = require('gulp-autoprefixer')
var sass = require('gulp-sass')
var concat = require('gulp-concat')

gulp.task('sass', function () {
  return gulp.src([
    './sass/materialize-lite.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 0.5%', 'IE 8']
    }))
    .pipe(gulp.dest('./css'))
})

gulp.task('js', function () {
  return gulp.src(['./js/velocity.min.js',
    './js/jquery.easing.1.3.js',
    './js/waves.js',
    './js/global.js',
    './js/dropdown.js',
    './js/character_counter.js',
    './js/forms.js',
    './js/cards.js',
    './js/buttons.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('materialize-lite.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js/'))
})

gulp.task('css', ['sass'], function () {
  return gulp.src(['./css/materialize-lite.css'])
    .pipe(sourcemaps.init())
    .pipe(purge())
    .pipe(autoprefixer({
      browsers: ['> 0.5%', 'IE 8']
    }))
    .pipe(cleanCSS({
      shorthandCompacting: true,
      roundingPrecision: -1,
      advanced: false,
      compatibility: {
        properties: {
          spaceAfterClosingBrace: true
        }
      }
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'))
})

gulp.task('watch', function () {
  gulp.watch(['./js/**/*.js', './sass/**/*.scss'], ['default'])
})

gulp.task('default', ['css', 'js'])
