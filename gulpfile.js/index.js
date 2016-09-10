'use strict';

const config = require('./config.json');
const gulp = require('gulp');

/**
 * Combines/resolves bower-globs from config into
 * a single array of blob paths
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

gulp.task('copy-bower', () => {
    const globs = getBowerGlobs();
    const bower = gulp.src(globs);

    return bower
        .pipe(gulp.dest('.build/assets'));
});

gulp.task('default', ['copy-bower']);
