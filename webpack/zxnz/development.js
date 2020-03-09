var cwd = process.cwd(),
    env = 'development',
    path = require('path'),
    node_fs = require('fs'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    argv = zn.convertArrayArgv(process.argv).argv,
    _exports = {};


var __ = {
    alias: function (){
        var _prefix = argv['resolve.alias.prefix'],
            _path = argv['resolve.alias.path'];

        if(_path) {
            var _devDeps = require(path.resolve(cwd, './package.json')).devDependencies || {},
                _alias = {};
            for(var key in _devDeps) {
                if(_prefix){
                    if(key.indexOf(_prefix) != -1) {
                        _alias[key] = path.resolve(cwd, _path, key);
                    }
                }else{
                    _alias[key] = path.resolve(cwd, _path, key);
                }
            }

            zn.path(_exports, 'resolve.alias', _alias);
        }
    },
    htmlWebpackPlugin: function (){
        var _page = argv['page'] || [],
            _template = argv['template'] || './web/__webpack__/template.html',
            _data = argv['data'] || ('./web/__webpack__/' + env + '.json'),
            _package = require(path.resolve(cwd, './package.json')),
            _pluginArgv = {},
            _config = {
                name: _package.name,
                title: _package.name,
                version: _package.version,
                keywords: _package.keywords,
                description: _package.description,
                commitid: (new Date()).getTime(),
                env: env,
                hash: true,
                inject: false,
                template: path.resolve(cwd, _template)
            };
    
        if(node_fs.existsSync(path.resolve(cwd, _data))) {
            _config = zn.extend(_config, require(path.resolve(cwd, _data)));
        }

        if(zn.is(_page, 'string')){
            _page = [ _page ];
        }

        _page = _page.map(function (page, index){
            _pluginArgv = zn.extend({
                filename: (page + '.html')
            }, _config);

            _pluginArgv.links[page] = './dist/' + env + '/' + page + '.bundle.css';
            _pluginArgv.scripts[page] = './dist/' + env + '/' + page + '.bundle.js';

            return new HtmlWebpackPlugin(_pluginArgv);
        });

        if(_page.length) {
            _page.push(new webpack.optimize.ModuleConcatenationPlugin());
            _page.push(new webpack.HotModuleReplacementPlugin());
        }
        
        return _page;
    }
}

zn.path(_exports, "resolve.alias", __.alias());
_exports.plugins = __.htmlWebpackPlugin();
    
module.exports =  _exports;