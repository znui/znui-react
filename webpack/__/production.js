process.env.NODE_ENV = 'production';
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

module.exports = zn.deepAssigns({}, require('./__base__'), {
    mode: process.env.NODE_ENV,
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": "production"
        }),
        new ExtractTextPlugin({ 
            filename: "./dist/production/[name].bundle.css", 
            disable: false, 
            allChunks: true 
        })
    ]
});