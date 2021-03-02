var __ = require('../../__/index'),
    __zxnz__ = require('./__');
    
module.exports = {
    application: function (options){
        return this.mode('application', options);
    },
    plugin: function (options){
        return this.mode('plugin', options);
    },
    example: function (options){
        return this.mode('example', options);
    },
    mode: function (mode, options){
        var _options = {},
            _config = zn.deepAssigns({}, __.mode('start'), __zxnz__(), require('./' + mode));
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