'use strict';
/**
 * Webpack Development Environment
 * @type {webpack|exports|module.exports}
 */

let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let Clean = require('clean-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let pkg = require('./package.json');
let _ = require('lodash');
let execSync = require('child_process').execSync;
let webpackSettings = require('./webpack.settings.js');
let path = require('path');
let buildPath = path.join(__dirname, './build');
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
        new Clean(['build']),
        new webpack.DefinePlugin({
            'ap_html5Routing': JSON.stringify(appConfig.development.html5Routing),
            'ap_debug': JSON.stringify(appConfig.development.debug),
            'ap_urlPrefix': JSON.stringify(appConfig.development.urlPrefix),
            'ap_API_URL': JSON.stringify(appConfig.development.API_URL)
        }),
        new ExtractTextPlugin('', {
            allChunks: true,
            disable: true
        })
    ],
    devtool: 'source-map',
    module: {
        loaders: webpackSettings.getLoaders(settingsConfig, ExtractTextPlugin)
    },
    sassLoader: {
        includePaths: []
    }
};
