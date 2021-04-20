var node_fs = require('fs'),
    node_path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    argv = zn.convertArrayArgv(process.argv).argv;

var __ = {
    getBasePath: function (entryjs){
        var _cwd = process.cwd();
        if(node_fs.existsSync(node_path.join(_cwd, entryjs))){
            return node_path.resolve(_cwd);
        }

        if(node_fs.existsSync(node_path.join(_cwd, 'zn.app.config.js')) || node_fs.existsSync(node_path.join(_cwd, 'src', 'zn.app.config.js'))){
            return node_path.join(_cwd, 'web', 'src');
        }

        return _cwd;
    },
    getConfig: function (){
        var node_env = process.env.NODE_ENV || 'development';
        var _cwd = process.cwd(),
            _entryjs = argv.entry || '_entry.js',
            _basePath = this.getBasePath(_entryjs),
            _page = argv.page || [],
            _www = node_path.join(_cwd, './web/www/'),
            _dist = (argv.dist || './') + node_env,
            _output = node_path.join(_www, _dist),
            _components = argv.components || [],
            _template = argv.template || './web/__webpack__/template.html',
            _data = argv.data || ('./web/__webpack__/' + node_env + '.json'),
            _package = require(node_path.resolve(_cwd, './package.json')),
            _pluginArgv = {};
            _config = {
                context: node_path.resolve(_basePath),
                externals: {
                    "react": "React",
                    "react-dom": "ReactDOM",
                    "@zeanium/core": "ZNCore",
                    "@zeanium/web": "ZNWeb"
                },
                entry: {
                    
                },
                output: {
                    path: _output,
                    filename: './[name]/bundle.js',
                    libraryTarget: "this"
                },
                plugins: [
                    new ExtractTextPlugin({ 
                        filename: "./[name]/bundle.css", 
                        disable: false, 
                        allChunks: true 
                    })
                ]
            };

        if(node_fs.existsSync(node_path.resolve(_cwd, _template))) {
            _template = node_path.resolve(_cwd, _template);
        }else{
            _template = node_path.resolve(__dirname, './template.html');
        }

        var _htmlwebpackplugin = {
            name: _package.name,
            version: _package.version,
            keywords: _package.keywords,
            description: _package.description,
            releaseTime: (new Date()).toLocaleString(),
            commitid: (new Date()).getTime(),
            env: node_env,
            hash: true,
            inject: false,
            template: _template
        };

        if(node_fs.existsSync(node_path.resolve(_cwd, _data))) {
            _htmlwebpackplugin = zn.deepAssign(_htmlwebpackplugin, require(node_path.resolve(_cwd, _data)));
        }
        
        if(_htmlwebpackplugin.links) {
            var _copys = [],
                _link = null;
            for(var key in _htmlwebpackplugin.links) {
                _link = _htmlwebpackplugin.links[key];
                if(_link.indexOf('./') != 0 && _link.indexOf('../') != 0) {
                    _copys.push({
                        from: node_path.resolve(_link),
                        to: node_path.resolve(_output, './externals/' + key + '.css'),
                        force: true
                    });
                    _htmlwebpackplugin.links[key] = './externals/' + key + '.css';
                }
            }
            if(_copys.length){
                _config.plugins.push(new CopyWebpackPlugin(_copys));
            }
        }

        if(_htmlwebpackplugin.externals) {
            var _copys = [],
                _external = null;
            for(var key in _htmlwebpackplugin.externals) {
                _external = _htmlwebpackplugin.externals[key];
                if(_external.indexOf('./') != 0 && _external.indexOf('../') != 0) {
                    _copys.push({
                        from: node_path.resolve(_external),
                        to: node_path.resolve(_output, './externals/' + key + '.js'),
                        force: true
                    });
                    _htmlwebpackplugin.externals[key] = './externals/' + key + '.js';
                }
            }
            if(_copys.length){
                _config.plugins.push(new CopyWebpackPlugin(_copys));
            }
        }

        if(!node_fs.existsSync(_basePath)) {
            throw new Error(_basePath + " is not exist.");
        }
        
        var _dir = node_fs.readdirSync(_basePath);
        if(!_dir.length) {
            return _config.entry = [_entryjs], _config;
        }

        if(zn.is(_page, 'string')) {
            _page = [ _page ];
        }

        if(zn.is(_components, 'string')) {
            _components = [ _components ];
        }

        _dir.forEach(function (name){
            if(node_fs.statSync(node_path.join(_basePath, name)).isDirectory() && node_fs.existsSync(node_path.join(_basePath, name, _entryjs))){
                if((name.indexOf('_') == 0 && _components.indexOf(name) !=-1 )) {
                    _config.entry[name] = ['./' + name + '/' + _entryjs];
                    _htmlwebpackplugin.links[name] = './' + name + '/bundle.css';
                    _htmlwebpackplugin.scripts[name] = './' + name + '/bundle.js';
                }else if(name.indexOf('_') == -1 && (!_page.length || (_page.length && _page.indexOf(name) != -1))) {
                    _config.entry[name] = ['./' + name + '/' + _entryjs];
                    _pluginArgv = zn.deepAssign({ }, _htmlwebpackplugin);
                    _pluginArgv.filename =  './' + name + '.html';
                    _pluginArgv.links[name] = './' + name + '/bundle.css';
                    _pluginArgv.scripts[name] = './' + name + '/bundle.js';
                    _config.plugins.push(new HtmlWebpackPlugin(_pluginArgv));
                }
            }
        });
        
        return _config;
    }
};

module.exports = function (mode){
    return process.env.NODE_ENV = mode, __.getConfig();
}