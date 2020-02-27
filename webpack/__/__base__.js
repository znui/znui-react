var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var OptimizeCss = require('optimize-css-assets-webpack-plugin');
var argv = zn.convertArrayArgv(process.argv);

var _exports = {
    env: argv.env,
    argv: argv.argv,
    mode: process.env.NODE_ENV || 'production',
    context: process.cwd(),
    module: {
        // Disable handling of unknown requires
        unknownContextRegExp: /$^/,
        unknownContextCritical: false,

        // Disable handling of requires with a single expression
        //exprContextRegExp: /$^/,
        exprContextCritical: false,

        // Warn for every expression in require
        wrappedContextRecursive: false,
        wrappedContextCritical: true,
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
                    use: ["css-loader", "less-loader"]
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
    plugins: [],
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    optimization: {
        minimizer: []
    }
}

if(argv.argv.uglify) {
    _exports.plugins.push(new OptimizeCss({
        assetNameRegExp: /\.style\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
    }));
    _exports.optimization.minimizer.push(new UglifyJsPlugin({
        uglifyOptions: {
            compress: false
        }
    }));
    _exports.optimization.minimizer.push(new OptimizeCss({}));
}

module.exports = _exports;