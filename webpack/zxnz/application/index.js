var __ = require('../../__/index'),
    __zxnz__ = require('./__');
    
module.exports = {
    start: function (options){
        return this.mode('start', options);
    },
    development: function (options){
        return this.mode('development', options);
    },
    stage: function (options){
        return this.mode('stage', options);
    },
    production: function (options){
        return this.mode('production', options);
    },
    mode: function (mode, options){
        var _options = {},
            _config = zn.deepAssigns({}, __.mode(mode), __zxnz__(mode), require('./' + mode));
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