'use strict';

/**
 * Webpack Development Environment
 * @type {webpack|exports|module.exports}
 */

let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let Clean = require('clean-webpack-plugin');
let ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let pkg = require('./package.json');
let _ = require('lodash');
let execSync = require('child_process').execSync;
let webpackSettings = require('./webpack.settings.js');
let path = require('path');
let buildPath = path.join(__dirname, './distribute');
let srcPath = path.join(__dirname, './src');
let appConfig = require('./app.config');
let settingsConfig = {
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
            template: srcPath '/index.html',
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
