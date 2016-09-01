'use strict';

/**
 * Default Gulp/Slush task for Angular-Pack.
 *
 * The default task scaffolds the basic application. At the end, it will install the node dependencies
 *
 * @param  {Function} done The meat of the default task
 */
module.exports = gulp.task('default', done => {
    const prompts = [{
        name: 'appName',
        message: 'What is the name of your project?',
        default: defaults.appName
    }, {
        name: 'appDescription',
        message: 'What is the description?'
    }, {
        name: 'appVersion',
        message: 'What is the version of your project?',
        default: '0.0.0'
    }, {
        name: 'authorName',
        message: 'What is the author name?'
    }, {
        name: 'authorEmail',
        message: 'What is the author email?',
        default: defaults.authorEmail
    }, {
        name: 'githubUser',
        message: 'What is your github user name?'
    }, {
        name: 'apiURL',
        message: 'What is the base URI for the API you will use for this app?',
        default: ''
    }, {
        type: 'confirm',
        name: 'materialize',
        message: 'Do you want to build this as a Material designed app?'
    }, {
        type: 'confirm',
        name: 'moveon',
        message: 'It\'s scaffolding time. Are you ready?'
    }];
    
    //Ask
    inquirer.prompt(prompts, answers => {
        if (!answers.moveon) {
            return done();
        }
        answers.appNameSlug = _.slugify(answers.appName);
        
        answers.appGitRepo = `https://github.com/${answers.userName}/${answers.appName}`;
        answers.htmlWebpackPlugin = '<%= htmlWebpackPlugin.options.title %>';
        
        gulp.src(`${__dirname}/../templates/default/**`)
            .pipe(template(answers, { interpolate: /<%=([\s\S]+?)%>/g }))
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
