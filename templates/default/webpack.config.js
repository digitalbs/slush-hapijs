'use strict';

const webpack = require('webpack'),
    NgAnnotatePlugin = require('ng-annotate-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    Clean = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    webpackSettings = require('./webpack.settings.js'),
    execSync = require('child_process').execSync,
    pkg = require('./package.json'),
    config = require('./app.config'),
    path = require('path'),
    rootPath = path.join(__dirname, './'),
    buildPath = path.join(__dirname, './build'),
    srcPath = path.join(__dirname, './src'),
    webpackConfig = {
        srcPath: srcPath,
        babelPlugins: [],
        compact: true
    };

if (!(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production')) {
    throw new Error('Invalid Environment. NODE_ENV must be set to "production" or "development"');
}

let plugins;

if (process.env.NODE_ENV === 'production') {
    plugins = [
        new NgAnnotatePlugin({
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
        new ExtractTextPlugin('theme-[hash:6].css', {
            allChunks: true,
            disable: false
        })
    ];
} else {
    plugins = [
        new ExtractTextPlugin('', {
            allChunks: true,
            disable: true
        })];
}

module.exports = {
    entry: {
        app: webpackSettings.getAppEntry(webpackConfig)
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
            template: `${srcPath}/index.html`,
            hash: true,
            inject: 'body'
        }),
        new Clean(['build'], {
            root: rootPath
        }),
        new webpack.DefinePlugin({
            '_API_URL': JSON.stringify(config[process.env.NODE_ENV].API_URL),
            '_DEBUG_MODE': JSON.stringify(config[process.env.NODE_ENV].DEBUG_MODE),
            '_HTML5_HISTORY': JSON.stringify(config[process.env.NODE_ENV].HTML5_HISTORY),
            '_DEFAULT_LANG': JSON.stringify(config[process.env.NODE_ENV].DEFAULT_LANG)
        })
    ].concat(plugins),
    devtool: 'source-map',
    module: {
        loaders: webpackSettings.getLoaders(webpackConfig, ExtractTextPlugin)
    },
    sassLoader: {
        includePaths: []
    },
    devServer: {
        port: 8081,
        historyApiFallback: true
    }
};
