var node_fs = require('fs'),
    node_path = require('path'),
    argv = zn.convertArrayArgv(process.argv).argv;

module.exports = {
    getBasePath: function (entryjs){
        var _cwd = process.cwd();
        if(node_fs.existsSync(node_path.resolve(_cwd, entryjs || argv.entry || '_entry.js'))){
            return node_path.resolve(_cwd);
        }

        if(node_fs.existsSync(node_path.resolve(_cwd, 'zn.app.config.js'))){
            return node_path.resolve(_cwd, 'web', 'src');
        }

        return _cwd;
    },
    getMultipleEntryConfig: function (entryjs, page){
        var _entryjs = entryjs || argv.entry,
            _page = page || argv.page,
            _basePath = this.getBasePath(_entryjs),
            _config = {
                entry: {},
                output: {
                    path: node_path.resolve(_basePath, '../www', 'dist'),
                    filename: '[name].' + (process.env.NODE_ENV || '') + '.bundle.js'
                }
            };
        if(!node_fs.existsSync(_basePath)) {
            throw new Error(_basePath + " is not exist.");
        }
        
        var _dir = node_fs.readdirSync(_basePath);
        if(!_dir.length) return _config;
        if(_page && _dir.indexOf(_page) != -1){
            _config.context = node_path.resolve(_basePath, _page);
            _config.entry[_page] = ['./' + entryjs];
        } else {
            _config.context = _basePath;
            _dir.forEach(function (name){
                if(node_fs.statSync(node_path.resolve(_basePath, name)).isDirectory() && node_fs.existsSync(node_path.resolve(_basePath, name, entryjs))){
                    _config.entry[name] = ['./' + name + '/' + entryjs];
                }
            });
        }

        return _config;
    }
};