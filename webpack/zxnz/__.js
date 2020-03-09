var node_fs = require('fs'),
    node_path = require('path'),
    argv = zn.convertArrayArgv(process.argv).argv;

module.exports = {
    getBasePath: function (entryjs){
        var _cwd = process.cwd();
        if(node_fs.existsSync(node_path.join(_cwd, entryjs || argv.entry))){
            return node_path.resolve(_cwd);
        }

        if(node_fs.existsSync(node_path.join(_cwd, 'src', 'zn.app.config.js'))){
            return node_path.join(_cwd, 'web', 'src');
        }

        return _cwd;
    },
    getMultipleEntryConfig: function (entryjs, page){
        var _env = process.env.NODE_ENV || 'development',
            _entryjs = entryjs || argv.entry || '_entry.js',
            _page = page || argv.page,
            _basePath = this.getBasePath(_entryjs),
            _config = {
                entry: {},
                output: {
                    path: node_path.join(_basePath, '../www'),
                    filename: './dist/' + _env + '/[name].bundle.js'
                }
            };
        if(!node_fs.existsSync(_basePath)) {
            throw new Error(_basePath + " is not exist.");
        }
        
        var _dir = node_fs.readdirSync(_basePath);
        if(!_dir.length) return _config;
        if(_page){
            if(zn.is(_page, 'string')) {
                _config.context = node_path.join(_basePath, _page);
                _config.entry[_page] = ['./' + _entryjs];
            }else if(zn.is(_page, 'array')){
                _config.context = _basePath;
                _dir.forEach(function (name){
                    if(node_fs.statSync(node_path.join(_basePath, name)).isDirectory() && node_fs.existsSync(node_path.join(_basePath, name, _entryjs))){
                        if(_page.indexOf(name) != -1 || name.indexOf('_') == 0){
                            _config.entry[name] = ['./' + name + '/' + _entryjs];
                        }
                    }
                });
            }
        } else {
            _config.context = _basePath;
            _dir.forEach(function (name){
                if(node_fs.statSync(node_path.join(_basePath, name)).isDirectory() && node_fs.existsSync(node_path.join(_basePath, name, _entryjs))){
                    _config.entry[name] = ['./' + name + '/' + _entryjs];
                }
            });
        }
        
        return _config;
    }
};