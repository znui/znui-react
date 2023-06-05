var webpack = require('webpack'),
    node_path = require('path'),
    cwd = process.cwd(),
    argv = zn.convertArrayArgv(process.argv).argv,
    devServer = {
        compress: true,
        contentBase: node_path.resolve(cwd, "./web/start/"),
        disableHostCheck: true,
        host: argv['host'] || '127.0.0.1',
        hot: (argv['hot'] !== false ? true : false),
        https: (argv['https'] === true ? true : false),
        //open: 'Google Chrome',
        open: true,
        port: argv['port'] || 8282,
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

if(argv.open) {
    devServer.open = argv.open;
}

zn.debug('devServer: ', devServer);

module.exports = {
    devtool: 'inline-source-map',
    devServer: devServer,
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};