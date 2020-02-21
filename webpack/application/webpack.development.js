var cwd = process.cwd(),
    path = require('path'),
    zr = require('../zr'),
    base = require('../base'),
    package = require(path.resolve(cwd, 'package.json')),
    data = require(path.resolve(cwd, 'webpack', 'development.json'))
    development = require('../development');
    
module.exports = zr.deepExtend({}, base, development, {
    context: path.resolve(cwd, 'src'),
    entry: {
        'index': './index.js',
        'index.style': './index.less'
    },
    output: {
        path: path.resolve(cwd, 'www', 'dist.development'),
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            commitid: (new Date()).getTime(),
            title: package.name,
            version: package.version,
            description: package.description,
            keywords: package.keywords,
            env: process.env.NODE_ENV,
            css: Object.values(envconfig.css),
            js: Object.values(envconfig.js),
            filename: 'index.dev.html',
            template: './template.html'
        })
    ]
});