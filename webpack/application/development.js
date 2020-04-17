var ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    node_path = require('path'),
    cwd = process.cwd();
    
module.exports = {
    devtool: 'inline-source-map',
    plugins: [
        new CopyWebpackPlugin([
            {
                from: node_path.resolve('node_modules/@zeanium/core/dist/zn.js'),
                to: node_path.resolve(cwd, './www/externals/'),
                force: true
            },
            {
                from: node_path.resolve('node_modules/@zeanium/web/dist/zn.web.js'),
                to: node_path.resolve(cwd, './www/externals/'),
                force: true
            },
            {
                from: node_path.resolve('node_modules/react/umd/react.development.js'),
                to: node_path.resolve(cwd, './www/externals/'),
                force: true
            },
            {
                from: node_path.resolve('node_modules/react-dom/umd/react-dom.development.js'),
                to: node_path.resolve(cwd, './www/externals/'),
                force: true
            }
        ]),
        new ExtractTextPlugin({ 
            filename: "./dist/development/[name].bundle.css", 
            disable: false, 
            allChunks: true 
        })
    ]
};