var cwd = process.cwd(),
    path = require('path'),
    argv = zn.convertArrayArgv(process.argv).argv;

var _exports = {

    },
    _prefix = argv['resolve.alias.prefix'],
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

module.exports = _exports;