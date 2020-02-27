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
        "znui-react": "zr"
    },
    output: {
        path: path.resolve(cwd, 'www', 'dist/stage'),
        filename: '[name].stage.js'
    }
};