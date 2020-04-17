process.env.NODE_ENV = 'production';
var webpack = require('webpack'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    OptimizeCss = require('optimize-css-assets-webpack-plugin');

module.exports = zn.deepAssigns({}, require('./__base__'), {
    mode: process.env.NODE_ENV,
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": '"production"'
        }),
        new OptimizeCss({
            assetNameRegExp: /\.style\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
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