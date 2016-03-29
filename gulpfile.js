var
    gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    clean = require('rimraf'),
    bower = require('main-bower-files'),
    filter = require('gulp-filter'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    concatJs = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    uglify = require('gulp-uglify'),
    coffee = require('gulp-coffee'),
    jade = require('gulp-jade'),
    watch = require('gulp-watch'),
    sequence = require('gulp-sequence'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps');

var Paths = function (opt) {
    this.bower = opt.bower;
    this.src = {
        root: opt.src,
        js: opt.src + '/coffee',
        css: opt.src + '/scss',
        img: opt.src + '/img',
        html: opt.src + '/jade',
        fonts: opt.src + '/fonts'
    };
    this.dest = {
        root: opt.dest,
        js: opt.dest + '/js',
        css: opt.dest + '/css',
        img: opt.dest + '/img',
        fonts: opt.dest + '/fonts',
        html: opt.dest + '/html'
    };
};

paths = new Paths({
    bower: 'bower_components',
    src: 'assets',
    dest: 'public'
});

gulp.task(
    'dev',
    sequence(
        'clean',
        [
            'sass',
            'jade',
            'coffee'
        ],
        'concat',
        'watch'
    )
);

gulp.task(
    'build',
    sequence(
        'clean',
        [
            'sass',
            'jade',
            'coffee',
            'img',
            'fonts',
            'bower'
        ],
        'concat',
        'minify'
    )
);


gulp.task('sass', function () {
    return gulp.src([paths.src.css + '/**/*.scss', paths.bower + '/**/*.scss'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest.css));
});
gulp.task('coffee', function () {
    return gulp.src(paths.src.js + '/**/*.coffee')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(coffee({bare: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest.js));
});

gulp.task('jade', function () {
    return gulp.src(paths.src.html + '/!(includes)**')
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(paths.dest.html));
});

gulp.task('bower', function () {
    var
        jsFilter = filter('*.js'),
        cssFilter = filter('*.css');

    gulp.src(bower())
        .pipe(jsFilter)
        .pipe(concatJs('vendor.js'))
        .pipe(gulp.dest(paths.dest.js));


    gulp.src(bower())
        .pipe(cssFilter)
        .pipe(concatCss('vendor.css'))
        .pipe(gulp.dest(paths.dest.css));


    gulp.src([paths.bower + '/**/fonts/**/*', paths.bower + '/**/font/**/*'])
        .pipe(gulp.dest(paths.dest.fonts));
});


gulp.task('img', function () {
    return gulp.src(paths.src.img + '/pictures/**.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ]
        }))
        .pipe(gulp.dest(paths.dest.img));
});

gulp.task('fonts', function () {
    return gulp.src(paths.src.fonts + '/**/*')
        .pipe(gulp.dest(paths.dest.fonts));
});

gulp.task('clean', function () {
    return gulp.src(paths.dest.root)
        .pipe(clean());
});








Тут остановился вчера \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/









gulp.task('concat', function () {
    var
        jsFilter = filter('*.js'),
        cssFilter = filter('*.css');


    gulp.src(paths.dest.root)
        .pipe(jsFilter())
        .pipe(concatJs)
        .pipe(gulp.dest(paths.dest.js))

    ;
});

gulp.task('minify', function () {
    var js = paths.dest.js,
        css = paths.dest.css,
        img = paths.dest.img;

    gulp.src(js + '/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(js));

    gulp.src(css + '/**/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest(css));

    gulp.src(img + '/img/**/*.*')
        .pipe(imagemin({optimizationLevel: 7}))
        .pipe(gulp.dest(img));
});

gulp.task('webserver', function () {
    gulp.src('./public/')
        .pipe(webserver({
            livereload: true
        }));
});

gulp.task('watch', function () {
    gulp.watch(paths.src.css + '/**/*.scss', ['sass']);
    gulp.watch(paths.src.js + '/**/*.coffee', ['coffee']);
    gulp.watch(paths.src.html + '/**/*.jade', ['jade']);
    gulp.watch(paths.src.img + '/**/*', ['img']);
});
