/**
 * Webpack Development Environment
 * @type {webpack|exports|module.exports}
 */

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Clean = require('clean-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pkg = require('./package.json');
var _ = require('lodash');
var execSync = require('child_process').execSync;
var webpackSettings = require('./webpack.settings.js');

var path = require('path'),
    buildPath = path.join(__dirname, './distribute'),
    srcPath = path.join(__dirname, './src'),
    appConfig = require('./app.config');

var settingsConfig = {
    srcPath: srcPath,
    transpilerTarget: /\.js$/,
    compact: true
};


module.exports = {
    entry: {
        app: webpackSettings.getAppEntry(settingsConfig)
    },
    output: {
        path: buildPath,
        filename: 'bundle-[hash:6].js',
        hash: true,
        publicPath: ''
    },
    plugins: [
        new webpack.ProvidePlugin({
            '_': 'lodash'
        }),
        new HtmlWebpackPlugin({
            title: pkg.title,
            template: srcPath + '/index.html',
            inject: 'body'
        }),
        new Clean(['distribute']),
        new ngAnnotatePlugin({
            add: true
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'ap_html5Routing': JSON.stringify(appConfig.production.html5Routing),
            'ap_debug': JSON.stringify(appConfig.production.debug),
            'ap_urlPrefix': JSON.stringify(appConfig.production.urlPrefix),
            'ap_API_URL': JSON.stringify(appConfig.production.API_URL)
        }),
        new ExtractTextPlugin('theme-[hash:6].css', {
            allChunks: true,
            disable: false
        })
    ],
    module: {
        loaders: webpackSettings.getLoaders(settingsConfig, ExtractTextPlugin)
    },
    sassLoader: {
        includePaths: []
    }
};
