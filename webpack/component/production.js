var cwd = process.cwd(),
    path = require('path');
    
module.exports = {
    context: path.resolve(cwd, 'src'),
    entry: {
        'index': './index.js',
        'index.style': './index.less'
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
    },
    output: {
        path: path.resolve(cwd, 'dist'),
        //chunkFilename: '[name].js',
        filename: '[name].js',
        //library: "friendly",
        libraryTarget: "this"
        //libraryExport: "default"
    }
};