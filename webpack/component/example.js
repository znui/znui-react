var cwd = process.cwd(),
    path = require('path');
    
module.exports = {
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
};