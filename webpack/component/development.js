var cwd = process.cwd(),
    path = require('path');
    
module.exports = {
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
    },
    resolve: {
        alias: {
            "znui-react": path.resolve(process.cwd(), '../znui-react')
        }
    }
};