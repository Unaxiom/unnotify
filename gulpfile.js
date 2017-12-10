var gulp = require('gulp');
var browserify = require('browserify');
var tsb = require('gulp-tsb');
var watchify = require('watchify');
var assign = require('lodash.assign');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var notifier = require('node-notifier');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');

// create and keep compiler
var compilation = tsb.create({
    target: 'es3',
    module: 'commonjs',
    declaration: false,
    lib: ["es2015", "es2015.promise", "dom", "es5"],
});

// add custom browserify options here
var customOpts = {
    entries: ['./src/unnotify.js'],
    debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// Set up src ts build task
gulp.task("srcCompileTS", function () {
    return gulp.src('unnotify.ts')
        .pipe(compilation()) // <- compilation
        .pipe(gulp.dest('./src/'));

});

b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
    return b.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        // source denotes the destination of the minified file. Reads the input from customOpts
        .pipe(source('./dist/unnotify.min.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({
            loadMaps: true
        })) // loads map from browserify file
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./'));
}

gulp.task("srcCompileJS", ["srcCompileTS"], bundle);

gulp.task('notifySRCComplete', ['srcCompileJS'], function () {
    notifier.notify({
        'title': 'Javascript',
        'message': 'SRC Compilation done!'
    });
});

// Set up watch task
gulp.task('default', ['srcCompileTS', 'srcCompileJS', 'notifySRCComplete'], function () {
    // SRC files watch
    gulp.watch('unnotify.ts', ['srcCompileTS', 'srcCompileJS', 'notifySRCComplete'], function () {
        // Run srcCompileTS
        console.log("Src TS Watch fired!");
    });
});