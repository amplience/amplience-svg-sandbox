var gulp = require('gulp');
var del = require('del');
var changed = require('gulp-changed');
var htmlReplace = require('gulp-html-replace');
var ampSvgMerge = require('gulp-amp-svg-merge');
var ampSvgPreview = require('gulp-amp-svg-preview');
var errorHandler = require('./lib/error-handler');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var previewOpts = {
  di: {
    protocol: "https",
    host: "i1.adis.ws",
    companyName: '<company_name_here>',
    namespace: 'pv'
  },
  preview: {
    protocol: "https",
    host: "dm-preview-service.adis.ws",
    pathname: "/preview"
  },
  auth: {
    protocol: "https",
    host: "auth.adis.ws",
    pathname: "/oauth/token"
  }
};

gulp.task('merge', function() {
  return gulp.src('src/*.svg')
    .pipe(ampSvgMerge({svgDirectory: './src'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('preview', ['merge'], function(done) {
  var previews = [];

  gulp.src('dist/*.svg')
    .pipe(changed('./dist/tmp', {hasChanged: changed.compareSha1Digest}))
    .pipe(ampSvgPreview(previewOpts, function(err, url) {
      var previewItem = {
        url: url,
        error: err
      };
      previews.push(previewItem);
    }))
    .pipe(gulp.dest('./dist/tmp'))
    .on('end', function() {
      if (!previews[0]) {
        done();
        return;
      }
      var template = previews[0].url ?
        '<div class="amp-preview"><div><img class="amp-preview-img" src="%s" /></div>' +
            '<div class="amp-preview-url">%s</div></div>' :
        '<div><p class="err">%s</p></div>';
      var source = previews[0].url ?
        [[previews[0].url, previews[0].url]] : [[errorHandler.getErrorMessage(previews[0].error)]];

      return gulp.src('./app/index.html')
        .pipe(htmlReplace({
          svg: {
            src: source,
            tpl: template
          }
        }, {
          keepBlockTags: true
        }))
        .pipe(gulp.dest('./dist'))
        .on('end', function() {
          done();
        });
    });
});

gulp.task('serve', ['build'], function() {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });

  gulp.watch([
    'dist/*.html'
  ]).on('change', reload);
});

gulp.task('watch', ['merge', 'preview'], function() {
  gulp.watch(
    ['src/*.svg', 'src/*.svg.metadata', 'src/*.svg.headers'],
    ['merge', 'preview']
  );
});

gulp.task('copy-app', ['clean'], function(done) {
  gulp.src([
    'app/**/*.*'
  ])
  .pipe(gulp.dest('dist'))
  .on('end', function() {
    done();
  });
});

gulp.task('clean', function(done) {
  del.sync(['./dist/tmp']);
  done();
});

gulp.task('build', ['copy-app'], function() {
  gulp.start('watch');
});

gulp.task('default', function() {
  gulp.start('build');
});
