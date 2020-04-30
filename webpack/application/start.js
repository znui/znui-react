var ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    webpack = require('webpack'),
    node_path = require('path'),
    cwd = process.cwd(),
    argv = zn.convertArrayArgv(process.argv).argv,
    devServer = {
        compress: true,
        contentBase: node_path.resolve(cwd, "./www/"),
        disableHostCheck: true,
        hot: (argv['hot'] !== false ? true : false),
        https: (argv['https'] !== false ? true : false),
        open: 'Google Chrome',
        port: argv['port'] || 8181,
        historyApiFallback: {
            disableDotRule: true,
            rewrites: [
                {
                    from: /\.hot-update\.json$/,
                    to: function (context) {
                        return '/' + node_path.basename(context.parsedUrl.pathname);
                    }
                }, 
                {
                    from: /\.hot-update\.js$/,
                    to: function (context) {
                        return '/' + node_path.basename(context.parsedUrl.pathname);
                    }
                }
            ]
        }
    };
    
    
var _page = argv['page'] || [];
if(zn.is(_page, 'string')) {
    _page = [ _page ];
}
_openPage = argv['openPage'] || (_page[0] + '.html');
if(_openPage) {
    devServer.openPage = _openPage;
    devServer.historyApiFallback.index = _openPage;
}

zn.debug('devServer: ', devServer);

module.exports = {
    devtool: 'inline-source-map',
    devServer: devServer,
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
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};