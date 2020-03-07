var cwd = process.cwd(),
    path = require('path');
    //package = require(path.resolve(cwd, 'package.json'));
    
module.exports = {
    context: path.resolve(cwd, 'src'),
    entry: {
        'index': './index.js',
        'index.style': './index.less'
    },
    output: {
        path: path.resolve(cwd, 'www', 'dist/development'),
        filename: '[name].bundle.js',
    },
    plugins: [
        
    ]
};