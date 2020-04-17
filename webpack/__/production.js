process.env.NODE_ENV = 'production';
var webpack = require('webpack'),
    WebpackStripLoader = require('strip-loader'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    OptimizeCss = require('optimize-css-assets-webpack-plugin');

module.exports = zn.deepAssigns({}, require('./__base__'), {
    devtool: "source-map",  //cheap-module-source-map
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: [/\.js?$/, /\.es6$/],
                include: /src/,
                loader: WebpackStripLoader.loader('console.log', 'console.error', 'debugger')
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": '"production"'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new UglifyJsPlugin({
            parallel: 4
        }),
        new OptimizeCss({
            assetNameRegExp: /\.style\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { 
                discardComments: { 
                    removeAll: true 
                }
            },
            canPrint: true
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            }),
            new OptimizeCss({})
        ]
    }
});