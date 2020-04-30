process.env.NODE_ENV = 'development';
var cwd = process.cwd(),
    node_fs = require('fs'),
    node_path = require('path'),
    webpack = require('webpack'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    node_env = process.env.NODE_ENV,
    processArgv = zn.convertArrayArgv(process.argv),
    argv = processArgv.argv;

var _template = node_path.resolve(cwd, (argv.template || './example/template.html')),
    _data = node_path.resolve(cwd, (argv.data || './example/' + node_env + '.json')),
    _page = argv.page || 'index.html',
    _package = require(node_path.resolve(cwd, './package.json'));

if(!node_fs.existsSync(_template)) {
    _template = node_path.resolve(__dirname, './template.html');
}

var _htmlwebpackplugin = {
    title: 'Example ' + _package.name,
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

if(!node_fs.existsSync(_data)) {
    _data = node_path.resolve(__dirname, './example.' + node_env + '.json');
}

if(node_fs.existsSync(_data)) {
    _htmlwebpackplugin = zn.deepAssign(_htmlwebpackplugin, require(_data));
}

module.exports = {
    context: node_path.join(cwd, 'example'),
    mode: node_env,
    devtool: 'source-map',
    entry: {
        "index": "./src/index.js"
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
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
        hot: (argv['hot'] !== false ? true : false),
        https: (argv['https'] !== false ? true : false),
        open: 'Google Chrome',
        port: argv['port'] || 8181,
        openPage: _page,
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
        new CopyWebpackPlugin([
            {
                from: node_path.resolve('node_modules/@zeanium/core/dist/zn.js'),
                to: node_path.resolve(cwd, './example/www/externals/'),
                force: true
            },
            {
                from: node_path.resolve('node_modules/@zeanium/web/dist/zn.web.js'),
                to: node_path.resolve(cwd, './example/www/externals/'),
                force: true
            },
            {
                from: node_path.resolve('node_modules/react/umd/react.development.js'),
                to: node_path.resolve(cwd, './example/www/externals/'),
                force: true
            },
            {
                from: node_path.resolve('node_modules/react-dom/umd/react-dom.development.js'),
                to: node_path.resolve(cwd, './example/www/externals/'),
                force: true
            }
        ]),
        new HtmlWebpackPlugin(_htmlwebpackplugin),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    performance: {
        hints: false
    },
    optimization: {
        minimizer: []
    }
};