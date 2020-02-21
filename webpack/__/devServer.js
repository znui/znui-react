var path = require('path'),
    webpack = require('webpack'),
    OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    devServer: {
        hot: true,
        https: false,
        disableHostCheck: true,
        contentBase: path.resolve(process.cwd(), '/'),
        publicPath: '/',
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
    },
    plugins: [
        new OpenBrowserPlugin({
            url: "https://localhost:8181/"
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};