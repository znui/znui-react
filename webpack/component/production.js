var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        'index': './index.js',
        'index.style': './index.less'
    },
    plugins: [
        new ExtractTextPlugin({ 
            filename: "./dist/production/[name].bundle.css", 
            disable: false, 
            allChunks: true 
        })
    ]
};