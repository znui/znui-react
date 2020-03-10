var node_fs = require('fs'),
    node_path = require('path'),
    __ = require('../__/index'),
    __zxnz__ = require('./__');
    
module.exports = {
    development: function (options){
        return this.mode('development', options);
    },
    production: function (options){
        return this.mode('production', options);
    },
    stage: function (options){
        return this.mode('production', options);
    },
    mode: function (mode, options){
        var _mode = mode || 'development',
            _options = {},
            _config = zn.deepAssigns({ }, __.mode(_mode), __zxnz__(_mode), require('./' + _mode));
        switch(zn.type(options)) {
            case "object":
                _options = options;
                break;
            case "function":
                _options = options(_config);
                break;
        }

        var _options_ = {},
            _keyPath = null;
        for(var key in _options) {
            _keyPath = node_path.resolve(__dirname, ('./' + mode + '.' + key + '.js'));
            if(node_fs.existsSync(_keyPath)){
                zn.deepAssign(_options_, require(_keyPath)(_options[key]));
            }else{
                _options_[key] = _options[key];
            }
        }
        
        return zn.deepAssigns({}, _config, _options_);
    }
};