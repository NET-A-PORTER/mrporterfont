var gulp = require("gulp");
var rename = require("gulp-rename");
var sketch = require("gulp-sketch");
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');

var version = require('./package.json').version;
var fontName = 'mrpfont-v'+version; // set name of your symbol font
var template = 'mrporter-style'; // you can also choose 'foundation-style'
var font = 'mrpfont';

gulp.task('font',['clean'], function(){
  gulp.src('mrporter.sketch') // you can also choose 'symbol-font-16px.sketch'
  .pipe(sketch({
    export: 'artboards',
    formats: 'svg'
  }))
  .pipe(iconfont({ fontName: fontName }))
  .on('glyphs', function(glyphs) {

    var options = {
      glyphs: glyphs.map(function(glyph) {
        // this line is needed because gulp-iconfont has changed the api from 2.0
        return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) }
      }),
      fontName: fontName,
      fontPath: 'fonts/', // set path to font (from your CSS file if relative)
      className: font // set class name in your CSS
    };


    gulp.src('templates/' + template + '.css')
    .pipe(consolidate('lodash', options))
    .pipe(rename({ basename:fontName }))
    .pipe(gulp.dest('dist/css/')); // set path to export your CSS

    gulp.src('templates/' + template + '.scss')
    .pipe(consolidate('lodash', options))
    .pipe(rename({ basename:fontName }))
    .pipe(gulp.dest('dist/')); // set path to export your SCSS
    console.log(options)
    // if you don't need sample.html, remove next 4 lines
    gulp.src('templates/' + template + '.html')
    .pipe(consolidate('lodash', options))
    .pipe(rename({ basename:'index' }))
    .pipe(gulp.dest('dist/')); // set path to export your sample HTML
  })
  .pipe(gulp.dest('dist/fonts')) // set path to export your fonts
  .pipe(gulp.dest('dist/css/fonts')); // set path to export your fonts
});

gulp.task('clean', function (done) {
  var rimraf = require('rimraf');
  rimraf('dist/**/*', function(err) {
    done();
  })
});

gulp.task('bump', function (done) {

  var child_process = require('child_process');
  // exec: spawns a shell.
  child_process.exec('npm version patch', function(error, stdout, stderr){
    console.log(error);
    done();
  });

});



gulp.task('tag', function (done) {

  var child_process = require('child_process');
  // exec: spawns a shell.
  var command = 'git tag v'+version;
  child_process.exec(command, function(error, stdout, stderr){
  	console.log(stdout);
    console.log(error);


    done();

  });

});



gulp.task('push-tag', function (done) {
  var child_process = require('child_process');

// git push --tag
child_process.exec('git push --tag', function(error, stdout, stderr){
  console.log(stderr);
  console.log(error);
  done();

});


});
gulp.task('gp', function(done) {
  var ghpages = require('gh-pages');
  var path = require('path');

  ghpages.publish(path.join(__dirname, 'dist'), function(err) {
    if(err) {
      done(err);
    } else {
      done();
    }

  });


})

gulp.task('release',['gp','tag', 'push-tag'], function(done){ done();});

gulp.task('default',['font'], function(done){ done();});

gulp.task('watch', function(){
  gulp.watch('*.sketch/**/*', { debounceDelay: 2000 }, ['clean']); // wait 3 sec after the last run
});
