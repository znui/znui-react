var __ = require('../__/index');
module.exports = {
    development: function (options){
        return this.mode("development", options);
    },
    production: function (options){
        return this.mode("production", options);
    },
    stage: function (options){
        return this.mode("production", options);
    },
    mode: function (mode, options){
        var _options = {},
            _config = zn.deepAssigns({}, __[mode], require('./' + mode));
        switch(zn.type(options)) {
            case "object":
                _options = options;
                break;
            case "function":
                _options = options(_config);
                break;
        }

        return zn.deepAssigns({}, _config, _options);
    }
};