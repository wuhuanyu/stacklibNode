const webpack = require('webpack');
const path = require('path');

const entry = './src/repository/netClient.js';

const outputPath = "./dist"

const AddExports  = require('babel-plugin-add-module-exports');
const plugins = [];
plugins.push(new webpack.optimize.UglifyJsPlugin({
    test: /(\.jsx|\.js)$/,
    compress: {
        warnings: false
    }
}));



const config = {
    target: 'web',
    cache: true,
    entry:{
        client:'./src/repository/netClient.js',
        cache: './src/utility/cache.js',
        bundle:'./src/index.js',
    },
    output: {
        path: path.join(__dirname, outputPath),
        filename: 'js/[name].js'
    },

    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react',
                exclude: /node_modules/
            }, {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }, {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }, {
                test: /\.html$/,
                loader: 'url-loader?name=[name].[ext]'
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'url-loader?name=images/[name].[ext]'
            }, {
                test: /\.(woff2?|otf|eot|svg|ttf)$/i,
                loader: 'url-loader?name=fonts/[name].[ext]'
            }
        ]
    },

    // plugins: plugins,
    // resolve: {     // root: __dirname, extensions: ['', '.js', '.jsx'] },

    devtool: 'source-map'
};

module.exports = config;