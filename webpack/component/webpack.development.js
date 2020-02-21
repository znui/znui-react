var cwd = process.cwd(),
    path = require('path'),
    zr = require('../zr'),
    base = require('../base'),
    development = require('../development');
    
module.exports = zr.deepExtend({}, base, development, {
    context: path.resolve(cwd, 'src'),
    entry: {
        'index': './index.js',
        'index.style': './index.less'
    },
    output: {
        path: path.resolve(cwd, 'dist'),
        //chunkFilename: '[name].js',
        filename: '[name].js',
        //library: "friendly",
        libraryTarget: "this"
        //libraryExport: "default"
    }
});