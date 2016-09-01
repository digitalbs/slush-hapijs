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
        const babelLoaderPath = (config.testPath) ? config.testPath : config.srcPath;
        
        return [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: babelLoaderPath,
                exclude: /node_modules|bower_components/,
                query: {
                    presets: ['es2015'],
                    plugins: config.babelPlugins,
                    compact: config.compact
                }
            },
            {
                test: /\.html$/,
                include: config.srcPath,
                exclude: [config.srcPath + '/index.html'],
                loader: 'ngtemplate?relativeTo=' + config.srcPath + '/!html?attrs[]=img:src&attrs[]=img:ng-src'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?sourceMap')
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader'
            },
            {
                test: /\.png$/,
                loader: 'url-loader?mimetype=image/png'
            },
            {
                test: /\.(woff$|woff2)/,
                include: config.srcPath,
                loader: 'url-loader'
            },
            {
                test: /\.(svg|ico)$/,
                loader: 'file-loader'
            }
        ];
    }
};
