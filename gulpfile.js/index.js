'use strict';

const config = require('./config.json');
const del = require('del');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')({camelize: true});

// add shopify config
config.shopify = require('./shopify.json');

/**
 * Resolves/combines config bower-globs into a
 * single array
 *
 * @returns {array}
 */
function getBowerGlobs() {
    const bowerGlobs = config['bower-globs'];
    var result = [];

    for(let name in bowerGlobs) {
        let globs = bowerGlobs[name];

        // convert to array
        if(typeof globs === 'string')
            globs = [globs];

        // add globs
        globs.forEach(glob => {
            var fullpath = `bower_components/${name}/${glob}`;

            result.push(fullpath);
        });
    }

    return result;
}

/**
 * Shorthand for calling gulp-shopify-upload
 */
function upload(options) {
    var {
        api_key,
        api_password,
        store_url
    } = config.shopify;

    return plugins.shopifyUpload(
        api_key,
        api_password,
        store_url,
        null,
        options
    );
}

gulp.task('clean', () => {
    return del('.upload');
});

gulp.task('copy-bower', ['clean'], () => {
    const globs = getBowerGlobs();
    const bower = gulp.src(globs);

    return bower
        .pipe(gulp.dest('.upload/assets'));
});

gulp.task('copy-assets', ['clean'], () => {
    const src = gulp.src([
        'src/assets/css/*.scss.liquid',
        'src/assets/img/*.jpg',
        'src/assets/img/*.png',
        'src/assets/js/*.js',
        'src/assets/js/*.js.liquid'
    ]);

    return src
        .pipe(gulp.dest('.upload/assets'));
});

gulp.task('copy-theme', ['clean', 'copy-bower', 'copy-assets'], () => {
    const theme = gulp.src([
        'src/**/*',
        '!src/assets/**/*'
    ]);

    return theme
        .pipe(gulp.dest('.upload'));
});

gulp.task('deploy', ['copy-theme'], () => {
    const theme = gulp.src('.upload/**/*');

    return theme
        .pipe(upload({
            'basePath': '.upload'
        }));
});

gulp.task('default', []);
