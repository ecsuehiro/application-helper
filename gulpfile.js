// derived from https://gist.github.com/lukin0110/47d75c7defad0bf413ab
const gulp = require('gulp')
const browserify = require('browserify')
const babelify = require('babelify')
const source = require('vinyl-source-stream')

gulp.task('default', ['watch'])

gulp.task('watch', ['build-react'], () => {
    gulp.watch('content/**', { interval: 200}, ['build-react'])
})

gulp.task("build-react", function(){
    const options = {
        entries: "./content/main.jsx",    // Entry point
        extensions: [".js", ".jsx"],    // consider files with these extensions as modules
        debug: true,                    // add resource map at the end of the file or not
        paths: ["./content/"]           // This allows relative imports in require, with './scripts/' as root
    }

    return browserify(options)
        .transform(babelify, {
            presets: ['env', 'react']
        })
        .bundle()
        .pipe(source("build.min.js"))
        .pipe(gulp.dest("./"))
})