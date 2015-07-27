var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function (cb) {
  gulp.src(['./test/index.js'])
    .pipe(mocha())
    .on('end', cb);
});
