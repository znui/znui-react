process.env.NODE_ENV = 'development';
var webpack = require('webpack'),
    node_path = require('path'),
    cwd = process.cwd(),
    argv = zn.convertArrayArgv(process.argv).argv,
    __exports__ = zn.deepAssigns({}, require('./__base__'), {
        mode: process.env.NODE_ENV,
        devtool: 'inline-source-map',
        plugins: [
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": '"development"'
            })
        ]
    });

if(argv.contentBase) {
    var _page = argv['page'] || [];
    if(zn.is(_page, 'string')) {
        _page = [ _page ];
    }
    _openPage = argv['openPage'] || (_page[0] + '.html');
    if(_openPage) {
        __exports__.devServer = {
            compress: true,
            contentBase: node_path.join(cwd, argv.contentBase),
            disableHostCheck: true,
            hot: true,
            https: (new Boolean(argv.https)).valueOf() || false,
            //open: argv.browser || 'Google Chrome',
            open: true,
            openPage: _openPage,
            port: argv['port'] || 8181,
            historyApiFallback: {
                disableDotRule: true,
                index: _openPage,
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

        __exports__.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
        __exports__.plugins.push(new webpack.HotModuleReplacementPlugin());
    };
}

module.exports = __exports__;