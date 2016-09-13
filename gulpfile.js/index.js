'use strict';

const config = require('./config.json');
const del = require('del');
const gulp = require('gulp');
const minimist = require('minimist');
const flags = require('./flags.js');
const plugins = require('gulp-load-plugins')({camelize: true});

// add shopify config
config.shopify = require('./shopify-config.js').get();

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
function upload() {
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
        {basePath: '.upload'}
    );
}

gulp.task('clean', () => {
    return del('.upload');
});

gulp.task('watch', ['clean'], () => {
    const modified = plugins.watch('src/**/*');
    const options = {
        flatten: {
            includeParents: 1
        }
    };

    return modified
        .pipe(plugins.flatten(options.flatten))
        .pipe(gulp.dest('.upload'))
        .pipe(upload());
});

gulp.task('stage-bower', ['clean'], () => {
    const globs = getBowerGlobs();
    const bower = gulp.src(globs);

    return bower
        .pipe(gulp.dest('.upload/assets'));
});

gulp.task('stage-assets', ['clean'], () => {
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

gulp.task('stage-theme', ['clean', 'stage-bower', 'stage-assets'], () => {
    const theme = gulp.src([
        'src/**/*',
        '!src/assets',
        '!src/assets/**/*'
    ]);

    return theme
        .pipe(gulp.dest('.upload'));
});

gulp.task('deploy', ['stage-theme'], () => {
    const theme = gulp.src('.upload/**/*');

    return theme
        .pipe(upload());
});

gulp.task('default', []);
