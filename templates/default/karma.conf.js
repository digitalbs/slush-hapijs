'use strict';

const webpack = require('webpack'),
    webpackSettings = require('./webpack.settings.js'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    pkg = require('./package.json'),
    argv = require('yargs').argv,
    path = require('path'),
    srcPath = path.join(__dirname, './src'),
    testPath = path.join(__dirname, './src');

if (argv.m && argv.f) {
    throw new Error('You cannot use both -m and -f args!');
}

/**
 * Optional Args
 * -m Module suite
 * -f Specific File
 */
let testsToRun = `${testPath}/index.tests.js`;
let preProcessKey = `${testPath}/index.tests.js`;

if (argv.m) {
    testsToRun = `${testPath}/${argv.m}.tests.js`;
    preProcessKey = `${testPath}/${argv.m}.tests.js`;
} else if (argv.f) {
    testsToRun = argv.f;
    preProcessKey = argv.f;
}

const webpackConfig = {
    srcPath: srcPath,
    testPath: testPath,
    babelPlugins: [
        ['istanbul', {
            'exclude': [
                '**/*.test*.js',
            ]
        }]
    ],
    compact: false
};

module.exports = function (config) {
    config.set({
        files: [
            'node_modules/babel-polyfill/dist/polyfill.min.js',
            'node_modules/sinon/pkg/sinon.js',
            'node_modules/jasmine-sinon/lib/jasmine-sinon.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            <% if (materialize) { %>
            'node_modules/angular-material/angular-material.js',
            'node_modules/angular-material/angular-material-mocks.js',
            <% } %>
            testsToRun
        ],
        reporters: ['progress', 'coverage'],
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
                }),
                new webpack.DefinePlugin({
                    '_API_URL': JSON.stringify('https::/test.test'),
                    '_DEBUG_MODE': JSON.stringify(true),
                    '_HTML5_HISTORY': JSON.stringify(false),
                    '_DEFAULT_LANG': JSON.stringify('oink')
                }),
                new ExtractTextPlugin('', {
                    allChunks: true,
                    disable: true
                })
            ],
            devtool: 'inline-source-map',
            module: {
                loaders: webpackSettings.getLoaders(webpackConfig, ExtractTextPlugin)
            },
            sassLoader: {
                includePaths: []
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
        coverageReporter: {
            type : 'html',
            dir : 'coverage/',
            instrumenterOptions: {
                istanbul: { noCompact: true }
            }
        },
        plugins: [
            require('karma-coverage'),
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-babel-preprocessor'),
            require('babel-loader'),
            require('karma-sourcemap-loader'),
            require('karma-source-map-support'),
            require('babel-plugin-istanbul')
        ]
    });
};