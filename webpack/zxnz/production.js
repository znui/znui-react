var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    plugins: [
        new ExtractTextPlugin({ 
            filename: "./dist/production/[name].bundle.css", 
            disable: false, 
            allChunks: true 
        })
    ]
}