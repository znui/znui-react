var cwd = process.cwd(),
    path = require('path'),
    zr = require('../zr'),
    base = require('../base'),
    production = require('../production');
    
module.exports = zr.deepExtend({}, base, production, {
    context: path.resolve(cwd, 'src'),
    entry: {
        'index': './index.js',
        'index.style': './index.less'
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "znui-react": "zr"
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