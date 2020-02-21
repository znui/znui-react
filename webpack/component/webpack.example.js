var cwd = process.cwd(),
    path = require('path'),
    zr = require('../zr'),
    base = require('../base'),
    development = require('../development');
    
module.exports = zr.deepExtend({}, base, development, {
    context: path.join(cwd, 'example'),
    entry: {
        "example": "./index.js"
    },
    output: {
        path: path.join(cwd, 'example', 'dist'),
        //chunkFilename: '[name].js',
        filename: '[name].js',
        //library: "friendly",
        libraryTarget: "this"
        //libraryExport: "default"
    }
});