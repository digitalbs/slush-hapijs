var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var _ = require('lodash');
var argv = require('yargs').argv;
var webpackSettings = require('./webpack.settings.js');

var path = require('path'),
    srcPath = path.join(__dirname, './src'),
    specPath = path.join(__dirname, './src/app');


if (argv.m && argv.f) {
    throw new Error('You cannot use both -m and -f args!');
}

var testsToRun = specPath + '/index.tests.js';
var preProcessKey = specPath + '/index.tests.js';

/**
 * Optional Args
 * -m Module suite
 * -f Specific File
 */
if (argv.m) {
    testsToRun = specPath + '/' + argv.m + '/index.tests.js';
    preProcessKey = specPath + '/' + argv.m + '/index.tests.js';
} else if (argv.f) {
    testsToRun = argv.f;
    preProcessKey = argv.f;
}

var settingsConfig = {
    srcPath: srcPath,
    testPath: specPath,
    compact: false
};


module.exports = function(config) {
    config.set({
        files: [
            'node_modules/babel-polyfill/dist/polyfill.min.js',
            'node_modules/sinon/pkg/sinon.js',
            'node_modules/jasmine-sinon/lib/jasmine-sinon.js',
            'node_modules/jasmine-expect/dist/jasmine-matchers.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            testsToRun
        ],
        reporters: ['progress', 'coverage', 'junit'],
        browsers: ['PhantomJS'],
        singleRun: false,
        frameworks: ['source-map-support', 'jasmine'],
        preprocessors: {
            [preProcessKey]: ['webpack', 'sourcemap']
        },
        webpack: {
            watch: true,
            plugins: [
                new webpack.ProvidePlugin({
                    '_': 'lodash'
                })
            ],
            isparta: {
                embedSource: true,
                noAutoWrap: true,
                babel: {
                    presets: ['es2015'],
                    compact: false
                }
            },
            devtool: 'inline-source-map',
            module: {
                loaders: webpackSettings.getLoaders(settingsConfig, ExtractTextPlugin),
                preLoaders: [{
                    test: /\.js$/,
                    include: srcPath,
                    exclude: /(test)/,
                    loader: 'isparta-loader'
                }]
            }
        },
        colors: true,
        autoWatch: false,
        webpackMiddleware: {
            stats: {
                colors: true
            },
            noInfo: true
        },
        junitReporter: {
            outputFile: 'test-results.xml',
            outputDir: 'coverage'
        },
        coverageReporter: {
            reporters: [{
                type: 'html',
                dir: 'coverage/'
            }, {
                type: 'cobertura',
                dir: 'coverage/'
            }],
            instrumenters: {
                isparta: require('isparta')
            },
            instrumenter: {
                'src/**/*!(tests).js': 'isparta'
            }
        },
        specReporter: {
            maxLogLines: 5,
            suppressErrorSummary: true,
            suppressFailed: false,
            suppressPassed: false,
            suppressSkipped: true,
            showSpecTiming: false
        },
        plugins: [
            require('karma-coverage'),
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-junit-reporter'),
            require('babel-loader'),
            require('karma-sourcemap-loader'),
            require('isparta-loader'),
            require("karma-spec-reporter"),
            require('karma-source-map-support')
        ]
    });
};
