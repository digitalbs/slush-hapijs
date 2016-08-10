/**
 * Webpack Development Environment
 * @type {webpack|exports|module.exports}
 */

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pkg = require('./package.json');
var _ = require('lodash');
var execSync = require('child_process').execSync;
var webpackSettings = require('./webpack.settings.js');

var path = require('path'),
    buildPath = path.join(__dirname, './build'),
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
