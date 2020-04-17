process.env.NODE_ENV = 'development';
var webpack = require('webpack');
    
module.exports = zn.deepAssigns({}, require('./__base__'), {
    mode: process.env.NODE_ENV,
    devtool: 'inline-source-map',  //cheap-module-eval-source-map
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": '"development"'
        })
    ]
});