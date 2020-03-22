var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
    
module.exports = {
    devtool: 'inline-source-map',
    plugins: [
        new ExtractTextPlugin({ 
            filename: "./dist/development/[name].bundle.css", 
            disable: false, 
            allChunks: true 
        })
    ]
};