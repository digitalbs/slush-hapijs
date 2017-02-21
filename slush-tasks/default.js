'use strict';

/**
 * Default Gulp/Slush task for hapijs.
 *
 * The default task scaffolds the basic API. At the end, it will install the node dependencies
 *
 * @param  {Function} done The meat of the default task
 */
module.exports = gulp.task('default', done => {
    let prompts = [{
        name: 'apiName',
        message: 'What is the name of your API?'
    }, {
        name: 'apiDescription',
        message: 'Give your API a description?'
    }, {
        name: 'apiVersion',
        message: 'What is the version of your API?',
        default: '0.0.0'
    }, {
        name: 'authorName',
        message: 'What is the author name?'
    }, {
        name: 'authorEmail',
        message: 'What is the author email?'
    }, {
        name: 'githubUser',
        message: 'What is your github user name?'
    }, {
        name: 'portNumber',
        message: 'What port will your API run on?',
        default: '3000'
    }, {
        name: 'apiPrefix',
        message: 'What prefix would you like to give your API',
        default: '/api'
    }, {
        name: 'apiSecret',
        message: 'This API will use JWT. What will the secret be? You can change this later.',
        default: 'SECRET'
    }, {
        name: 'databaseName',
        message: 'What name would you like to use for your Mongo database'
    }, {
        type: 'confirm',
        name: 'moveon',
        message: 'Are you ready to scaffold your API?'
    }];

    //Ask
    inquirer.prompt(prompts).then((answers) => {
        if (!answers.moveon) {
            return done();
        }

        answers.apiGitRepo = `https://github.com/${answers.githubUser}/${answers.apiName}`;

        gulp.src(`${__dirname}/../templates/default/**`)
            .pipe(template(answers, {
                interpolate: /<%=([\s\S]+?)%>/g
            }))
            .pipe(rename((file) => {
                if (file.basename[0] === '~') {
                    file.basename = `.${file.basename.slice(1)}`;
                }
            }))
            .pipe(conflict('./'))
            .pipe(gulp.dest('./'))
            .pipe(install())
            .on('end', () => {
                done();
            });
    });
});
