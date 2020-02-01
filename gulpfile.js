const {src, dest, watch, series} = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const tinypng = require('gulp-tinypng');

// Static server
function bs() {
    serveSass();
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch("./*.html").on('change', browserSync.reload);
    watch("./sass/**/*.sass", serveSass);
    watch("./sass/**/*.scss", serveSass);
    watch("./js/*.js").on('change', browserSync.reload);
};

//Compile sass into CSS & auto-inject into browsers
function serveSass() {
    return src("./sass/**/*.sass", "./scss/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest("./css"))
        .pipe(browserSync.stream());
};

function buildCSS(done) {
    src('css/**/**.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(dest('dist/css/'))
    done();
}

function buildJS(done) {
    src('js/**.js', 'js/**.min.js')
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            }
        }))
        .pipe(dest('dist/js/'))
    
    src('js/**.min.js')
        .pipe(dest('dist/js/'));

    done();
}

function buildHTML(done) {
    src('*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist/'));
    
    src('mail.php')
        .pipe(dest('dist/'));
    done();
}

function buildFonts(done) {
    src('fonts/**/**')
        .pipe(dest('dist/fonts/'))
    done();
}


function compresImages(done){
    src('images/**/*.{png,jpg,jpeg}')
        .pipe(
            tinypng('KywsK5P554fwHG5V5bZXbzZjVyyChXdK')
                .on('error', function(err) {
                    console.log(err.message);
                }))
        .pipe(dest('dist/images/'));

    src('images/**/**.svg')
        .pipe(dest('dist/images/'));
    
    done()
}

exports.serve = bs;
exports.sass = serveSass;
exports.buildCSS = buildCSS
exports.buildJS = buildJS
exports.buildHTML = buildHTML
exports.buildFonts = buildFonts 
exports.compresImages = compresImages
exports.build = series(buildCSS, buildJS, buildHTML, buildFonts, compresImages);
