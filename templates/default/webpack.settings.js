'use strict';

module.exports = {
    getAppEntry(config) {
        return [
            //Polyfills
            'babel-polyfill',

            //App Entry
            config.srcPath + '/sass/app.scss',
            config.srcPath + '/bootstrap.js'
        ];
    },
    getLoaders(config, ExtractTextPlugin) {
        let babelLoaderPath = (config.testPath) ? config.testPath : config.srcPath;

        return [{
                test: config.transpilerTarget,
                loader: 'babel-loader',
                include: babelLoaderPath,
                exclude: /node_modules|bower_components/,
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-object-assign'],
                    compact: config.compact
                }
            }, {
                test: /\.html$/,
                include: config.srcPath,
                exclude: [config.srcPath + '/index.html'],
                loader: 'ngtemplate?relativeTo=' + config.srcPath + '/!html?attrs[]=img:src&attrs[]=img:ng-src'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?sourceMap')
            }, {
                test: /\.jpg$/,
                loader: 'file-loader'
            }, {
                test: /\.png$/,
                loader: 'url-loader?mimetype=image/png'
            }, {
                test: /\.(woff$|woff2)/,
                include: config.srcPath,
                loader: 'url-loader'
            }, {
                test: /\.(svg|ico)$/,
                loader: 'file-loader'
            },

            //font-awesome specific loading
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader'
            }, {
                test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ];
    }
};
