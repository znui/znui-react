process.env.NODE_ENV = 'development';
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path'),
    webpack = require('webpack'),
    cwd = process.cwd();
    
module.exports = {
    mode: process.env.NODE_ENV,
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        alias: {
            "znui-react": path.resolve(cwd, '../znui-react')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new ExtractTextPlugin({ 
            filename: "[name].development.css", 
            disable: false, 
            allChunks: true 
        })
    ]
};