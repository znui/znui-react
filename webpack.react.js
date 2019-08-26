var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var optimizeCss = require('optimize-css-assets-webpack-plugin');
var path = require('path');
var config = require('./webpack.initial.js');
var _overwrite = function (target){
    var _target = target||{};
    for(var i = 1, _len = arguments.length; i < _len; i++){
        var _args = arguments[i];
        for(var _key in _args){
            if(_args.hasOwnProperty(_key) && _target[_key]===undefined){
                _target[_key] = _args[_key];
            }
        }
    }

    return _target;
}

module.exports = _overwrite({
    context: path.join(process.cwd(), 'src'),
    mode: process.env.NODE_ENV || 'production',
    entry: {
        "index": './index.js'
    },
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
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
    plugins: [
        new ExtractTextPlugin({ filename: "[name].css", disable: false, allChunks: true }),
        new optimizeCss({
            assetNameRegExp: /\.style\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        })
    ],
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            }),
            new optimizeCss({ })
        ]
    }
}, config);
