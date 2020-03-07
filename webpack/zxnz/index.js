var node_fs = require('fs'),
    node_path = require('path'),
    __ = require('../__/index'),
    __zxnz__ = require('./__');
    
module.exports = {
    development: zn.deepAssigns({}, __.mode('development'), __zxnz__.getMultipleEntryConfig(), require('./development')),
    production: zn.deepAssigns({}, __.mode('production'), __zxnz__.getMultipleEntryConfig(), require('./production')),
    stage: zn.deepAssigns({}, __.mode('stage'), __zxnz__.getMultipleEntryConfig(), require('./stage')),
    mode: function (mode, options){
        var _options = options || {},
            _options_ = {},
            _keyPath = null;
        for(var key in _options) {
            _keyPath = node_path.resolve(__dirname, ('../__/' + mode + '.' + key + '.js'));
            if(node_fs.existsSync(_keyPath)){
                zn.deepAssign(_options_, require(_keyPath)(_options[key]));
            }else{
                _options_[key] = _options[key];
            }
        }
        
        return process.env.NODE_ENV = mode, zn.deepAssign(this[mode], _options_);
    }
};