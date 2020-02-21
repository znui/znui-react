var node_fs = require('fs'),
    node_path = require('path'),
    dirname = process.cwd(),
    argv = process.argv,
    pageIndex = argv.indexOf('--page'),
    defaultPage = (pageIndex !== -1) ? argv[pageIndex+1] : '',
    zr = require('../zr');


var __ = {
    getBasePath: function (entryjs){
        if(node_fs.existsSync(node_path.resolve(dirname, entryjs || 'znui.react.entry.js'))){
            return node_path.resolve(dirname);
        }
        if(node_fs.existsSync(node_path.resolve(dirname, 'zn.app.config.js')) || node_fs.existsSync(node_path.resolve(dirname, 'zn.server.config.js'))){
            return node_path.resolve(dirname, 'web', 'src');
        }

        return dirname;
    },
    getMultipleEntryConfig: function (entryjs, page){
        var _basePath = this.getBasePath(entryjs),
            _dir = node_fs.readdirSync(_basePath),
            _page = page || defaultPage,
            _config = {
                entry: {},
                output: {
                    path: node_path.resolve(_basePath, '../www', 'dist'),
                    filename: '[name].bundle.js'
                }
            };

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

module.exports = {
    development: zr.deepExtend(require('./development'), __.getMultipleEntryConfig('znui.react.entry.js')),
    production: zr.deepExtend(require('./production'), __.getMultipleEntryConfig('znui.react.entry.js')),
};