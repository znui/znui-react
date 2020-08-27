var ExtractTextPlugin = require("extract-text-webpack-plugin");
    
module.exports = {
    entry: {
        'index.style': './index.less'
    },
    plugins: [
        new ExtractTextPlugin({ 
            filename: "./dist/development/[name].bundle.css", 
            disable: false, 
            allChunks: true 
        })
    ]
};