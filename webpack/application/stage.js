var ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    OptimizeCss = require('optimize-css-assets-webpack-plugin'),
    node_path = require('path'),
    cwd = process.cwd();

module.exports = {
    plugins: [
        new CopyWebpackPlugin([
            {
                from: node_path.resolve('node_modules/@zeanium/core/dist/zn.minx.js'),
                to: node_path.resolve(cwd, './www/externals/'),
                force: true
            },
            {
                from: node_path.resolve('node_modules/@zeanium/web/dist/zn.web.minx.js'),
                to: node_path.resolve(cwd, './www/externals/'),
                force: true
            },
            {
                from: node_path.resolve('node_modules/react/umd/react.production.min.js'),
                to: node_path.resolve(cwd, './www/externals/'),
                force: true
            },
            {
                from: node_path.resolve('node_modules/react-dom/umd/react-dom.production.min.js'),
                to: node_path.resolve(cwd, './www/externals/'),
                force: true
            }
        ]),
        new OptimizeCss({
            assetNameRegExp: /\.style\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new ExtractTextPlugin({ 
            filename: "./dist/stage/[name].bundle.css", 
            disable: false, 
            allChunks: true 
        })
    ],
    performance: {
        hints: false
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            }),
            new OptimizeCss({})
        ]
    }
};