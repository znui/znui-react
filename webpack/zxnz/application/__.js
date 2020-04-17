var node_fs = require('fs'),
    node_path = require('path'),
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
            _dist = argv.dist || './dist/',
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
                    path: node_path.join(_cwd, './web/www/'),
                    filename: _dist + node_env + '/[name].bundle.js',
                    libraryTarget: "this"
                },
                plugins: [

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
                    _htmlwebpackplugin.links[name] = _dist + node_env + '/' + page + '.bundle.css';
                    _htmlwebpackplugin.scripts[name] = _dist + node_env + '/' + page + '.bundle.js';
                }else if(name.indexOf('_') == -1 && (!_page.length || (_page.length && _page.indexOf(name) != -1))) {
                    _config.entry[name] = ['./' + name + '/' + _entryjs];
                    _pluginArgv = zn.deepAssign({ }, _htmlwebpackplugin);
                    _pluginArgv.filename = name + '.html';
                    _pluginArgv.links[name] = _dist + node_env + '/' + name + '.bundle.css';
                    _pluginArgv.scripts[name] = _dist + node_env + '/' + name + '.bundle.js';
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