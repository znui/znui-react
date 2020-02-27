var path = require('path'),
    webpack = require('webpack'),
    OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = function (options){
    var _options = zn.extend({
        hot: true,
        https: false,
        disableHostCheck: true,
        contentBase: "/",
        publicPath: "/",
        port: 8181,
        historyApiFallback: {
            disableDotRule: true,
            index: '/index.html',
            rewrites: [
                {
                    from: /\.hot-update\.json$/,
                    to: function (context) {
                        return '/' + path.basename(context.parsedUrl.pathname);
                    }
                }, 
                {
                    from: /\.hot-update\.js$/,
                    to: function (context) {
                        return '/' + path.basename(context.parsedUrl.pathname);
                    }
                }
            ]
        }
    }, options);
    _options.contentBase = path.resolve(process.cwd(), _options.contentBase);
    
    return {
        devServer: _options,
        plugins: [
            new OpenBrowserPlugin({
                url: (_options.url || `http${_options.https?'s':''}://localhost:${_options.port}/`)
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ]
    };
};