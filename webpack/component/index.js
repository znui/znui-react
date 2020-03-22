var __component__ = require('./__'),
    __ = require('../__/index');
module.exports = {
    development: function (options){
        return this.mode('development', options);
    },
    production: function (options){
        return this.mode('production', options);
    },
    example: function (mode, options){
        var _options = {},
            _config = require('./example.' + (mode||'production') + '.js');
        switch(zn.type(options)) {
            case "object":
                _options = options;
                break;
            case "function":
                _options = options(_config);
                break;
        }
        
        return zn.deepAssigns({ }, _config, _options);
    },
    mode: function (mode, options){
        var _options = {},
            _config = zn.deepAssigns({}, __.mode(mode), __component__(mode), require('./' + mode));
        switch(zn.type(options)) {
            case "object":
                _options = options;
                break;
            case "function":
                _options = options(_config);
                break;
        }
        
        return zn.deepAssigns({ }, _config, _options);
    }
};