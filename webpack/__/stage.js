process.env.NODE_ENV = 'production';
var webpack = require('webpack');

module.exports = zn.deepAssigns({}, require('./__base__'), {
    mode: process.env.NODE_ENV,
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": '"production"'
        })
    ]
});