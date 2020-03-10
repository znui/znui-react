if(!global.zn) {
    require('@zeanium/core');
}
module.exports = {
    mode: function (mode, options){
        var _options = {},
            _config = require('./' + mode);
        switch(zn.type(options)) {
            case "object":
                _options = options;
                break;
            case "function":
                _options = options(_config);
                break;
        }

        return process.env.NODE_ENV = mode, zn.deepAssigns({}, _config, _options);
    },
    development: function (options){
        return this.mode('development', options);
    },
    production: function (options){
        return this.mode('production', options);
    },
    stage: function (options){
        return this.mode('production', options);
    }
};