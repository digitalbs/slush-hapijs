'use strict';

/**
 * Route Gulp/Slush task for hapijs.
 *
 * The route task scaffolds a route with either full CRUD or individual HTTP Methods.
 *
 * @param  {Function} done The meat of the task
 */
module.exports = gulp.task('route', done => {
    let routesFolder = `${process.cwd()}`;
    let prompts = [{
        name: 'routeName',
        message: 'What is the name of this route?'
    }, {
        name: 'apiPrefix',
        message: 'What prefix would you like to give your API',
        default: '/api'
    }, {
        type: 'confirm',
        name: 'moveon',
        message: 'Are you ready to create your Route?'
    }];

    inquirer.prompt(prompts).then((answers) => {
        if (!answers.moveon) {
            return done();
        }

        answers.capRouteName = _.capitalize(answers.routeName);

        gulp.src(`${__dirname}/../templates/route/model/index.js`)
            .pipe(template(answers))
            .pipe(rename(`${answers.capRouteName}.js`))
            .pipe(conflict(`${routesFolder}/${answers.routeName}/model`))
            .pipe(gulp.dest(`${routesFolder}/${answers.routeName}/model`))
            .on('finish', () => {

            });

        gulp.src(`${__dirname}/../templates/route/routes/index.js`)
            .pipe(template(answers))
            .pipe(rename(`${answers.routeName}.js`))
            .pipe(conflict(`${routesFolder}/${answers.routeName}/routes`))
            .pipe(gulp.dest(`${routesFolder}/${answers.routeName}/routes`))
            .on('finish', () => {
            });

        gulp.src(`${__dirname}/../templates/route/schemas/index.js`)
            .pipe(template(answers))
            .pipe(rename(`${answers.routeName}Schema.js`))
            .pipe(conflict(`${routesFolder}/${answers.routeName}/schemas`))
            .pipe(gulp.dest(`${routesFolder}/${answers.routeName}/schemas`))
            .on('finish', () => {

            });

        gulp.src(`${__dirname}/../templates/route/util/index.js`)
            .pipe(template(answers))
            .pipe(rename(`${answers.routeName}.js`))
            .pipe(conflict(`${routesFolder}/${answers.routeName}/util`))
            .pipe(gulp.dest(`${routesFolder}/${answers.routeName}/util`))
            .on('finish', () => {

            });

        gulp.src(`${__dirname}/../templates/route/test.js`)
            .pipe(template(answers))
            .pipe(rename(`${answers.routeName}.js`))
            .pipe(conflict('../test/integration'))
            .pipe(gulp.dest('../test/integration'))
            .on('end', () => {
                done();
            });
    });
});
