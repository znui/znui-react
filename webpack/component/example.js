var cwd = process.cwd(),
    node_fs = require('fs'),
    node_path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    node_env = process.env.NODE_ENV || 'development',
    argv = zn.convertArrayArgv(process.argv).argv;

var _template = argv.template || './example/template.html',
    _data = argv.data || ('./example/template.json'),
    _page = argv.page || 'example.html',
    _package = require(node_path.resolve(cwd, './package.json'));

if(node_fs.existsSync(node_path.resolve(cwd, _template))) {
    _template = node_path.resolve(cwd, _template);
}else{
    _template = node_path.resolve(__dirname, './template.html');
}

var _htmlwebpackplugin = {
    title: 'Example' + _package.name,
    name: _package.name,
    version: _package.version,
    keywords: _package.keywords,
    description: _package.description,
    releaseTime: (new Date()).toLocaleString(),
    commitid: (new Date()).getTime(),
    env: node_env,
    hash: true,
    inject: true,
    filename: _page,
    template: _template
};

if(node_fs.existsSync(node_path.resolve(cwd, _data))) {
    _htmlwebpackplugin = zn.deepAssign(_htmlwebpackplugin, require(node_path.resolve(cwd, _data)));
}

module.exports = {
    context: node_path.join(cwd, 'example'),
    mode: 'development',
    devtool: 'source-map',
    entry: {
        "example": "./src/index.js"
    },
    output: {
        path: node_path.join(cwd, 'example', 'www'),
        //chunkFilename: '[name].js',
        filename: './dist/[name].js',
        //library: "friendly",
        libraryTarget: "this"
        //libraryExport: "default"
    },
    module: {
        // Disable handling of unknown requires
        unknownContextRegExp: /$^/,
        unknownContextCritical: false,

        // Disable handling of requires with a single expression
        //exprContextRegExp: /$^/,
        exprContextCritical: false,

        // Warn for every expression in require
        //wrappedContextCritical: true,
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        }
                    ]
                })
            },
			{
                test:/\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["raw-loader", "less-loader"]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    { loader: 'file-loader' },
                    { loader: 'url-loader' }
                ]
            }
        ]
    },
    devServer: {
        compress: true,
        contentBase: node_path.resolve(cwd, "./example/www/"),
        disableHostCheck: true,
        hot: true,
        https: false,
        open: 'Google Chrome',
        openPage: _page,
        port: 9000,
        historyApiFallback: {
            disableDotRule: true,
            index: _page,
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
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": '"development"'
        }),
        new ExtractTextPlugin({ 
            filename: "./dist/[name].css", 
            disable: false, 
            allChunks: true 
        }),
        new HtmlWebpackPlugin(_htmlwebpackplugin),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    performance: {
        hints: false
    }
};