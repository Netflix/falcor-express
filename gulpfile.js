var gulp = require('gulp');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');

gulp.task('test', function (cb) {
  gulp.src(['./test/index.js'])
    .pipe(mocha())
    .on('end', cb);
});

gulp.task('lint', [
  'lint-src',
  'lint-test'
]);

gulp.task('lint-src', function () {
  return gulp.src('src/*.js')
    .pipe(eslint({
      globals: {
        'require': false,
        'module': false
      },
      reset: true,
      useEslintrc: true,
    }))
    .pipe(eslint.format());
});

gulp.task('lint-test', function () {
  return gulp.src('test/*.js')
    .pipe(eslint({
      globals: {
        'require': false,
        'module': false,
        'it': false,
        'describe': false
      },
      reset: true,
      rules: {
        'max-len': [2, 200],
        'no-unused-expressions': 0
      },
      useEslintrc: true,
    }))
    .pipe(eslint.format());
});
