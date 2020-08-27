var ExtractTextPlugin = require("extract-text-webpack-plugin");
var argv = zn.convertArrayArgv(process.argv).argv;
var node_path = require('path');
var node_env = process.env.NODE_ENV;

var __ = {
    alias: function (){
        var _cwd = process.cwd(),
            _prefix = argv['resolve.alias.prefix'],
            _path = argv['resolve.alias.path'];

        if(!_path){
            return {};
        }

        var _package = require(node_path.resolve(_cwd, './package.json')),
            _devDeps = _package.devDependencies || _package.dependencies || {},
            _alias = {},
            _file = null;
        for(var key in _devDeps) {
            _file = key;
            if(node_env == 'development') {
                _file = _file + '/development.js';
            }
            if(_prefix){
                if(key.indexOf(_prefix) != -1) {
                    _alias[key] = node_path.resolve(_cwd, _path, _file);
                }
            }else{
                _alias[key] = node_path.resolve(_cwd, _path, _file);
            }
        }

        return _alias;
    }
}

var _exports = {
    mode: process.env.NODE_ENV,
    context: process.cwd(),
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "@zeanium/core": "ZNCore",
        "@zeanium/web": "ZNWeb"
    },
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
    }
}

zn.path(_exports, "resolve.alias", __.alias());

module.exports = _exports;