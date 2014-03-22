
var gulp = require('gulp');
var concat = require('gulp-concat');
var handlebars = require('gulp-ember-handlebars');

gulp.task('templates', function(){
  gulp.src(['templates/*.hbs'])
    .pipe(handlebars({
      outputType: 'cjs'
     }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('.'));
});

// default gulp task
gulp.task('default', ['templates'], function() {

});