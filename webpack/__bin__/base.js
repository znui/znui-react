var FileUtil = require('./FileUtil');
var node_path = require('path');
var node_fs = require('fs');
var _dirname = __dirname,
    _cwd = process.cwd();

module.exports = {
    create: function (argv){
        var _argv = argv || {};
        if(!_argv.name) {
            throw new Error('name is required.');   
        }
        var _path = node_path.resolve(_cwd, _argv.name);
        if(node_fs.existsSync(_path)){
            FileUtil.unlinkFolder(_path);
            node_fs.rmdirSync(_path);
        }

        if(!node_fs.existsSync(_path)){
            node_fs.mkdirSync(_argv.name);
        }

        _argv.path = _argv.name;
        this.init(_argv);
    },
    clear: function (){
        FileUtil.unlinkFolder(_cwd);
    }
}