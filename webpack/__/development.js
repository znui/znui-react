process.env.NODE_ENV = 'development';
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
    
module.exports = zn.deepAssigns({}, require('./__base__'), {
    mode: process.env.NODE_ENV,
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new ExtractTextPlugin({ 
            filename: "[name].bundle.css", 
            disable: false, 
            allChunks: true 
        })
    ]
});