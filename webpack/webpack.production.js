process.env.NODE_ENV = 'production';
var webpack = require('webpack');
module.exports = {
    mode: process.env.NODE_ENV,
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": "production"
        }),
        new ExtractTextPlugin({ 
            filename: "[name].production.css", 
            disable: false, 
            allChunks: true 
        })
    ]
};