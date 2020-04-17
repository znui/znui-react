var __ = require('../../__/index'),
    node_path = require('path'),
    cwd = process.cwd();
    
module.exports = function (mode){
    return {
        context: node_path.resolve(cwd, './web/src'),
        entry: {
            'index': './index.js',
            'index.style': './index.less'
        },
        externals: {
            "react": "React",
            "react-dom": "ReactDOM",
        },
        output: {
            path: node_path.resolve(cwd, './web/__'),
            //chunkFilename: '[name].js',
            filename: './dist/' + mode + '/[name].bundle.js',
            //library: "friendly",
            libraryTarget: "this"
            //libraryExport: "default"
        }
    }
}