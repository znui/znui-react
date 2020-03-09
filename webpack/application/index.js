var __ = require('../__/index');
module.exports = {
    development: zn.deepAssigns({}, __.development, require('./development')),
    production: zn.deepAssigns({}, __.production, require('./production')),
    stage: zn.deepAssigns({}, __.stage, require('./stage')),
    mode: function (mode, options){
        var _options = {},
            _config = this[mode];
        switch(zn.type(options)) {
            case "object":
                _options = options;
                break;
            case "function":
                _options = options(_config);
                break;
        }

        return process.env.NODE_ENV = mode, zn.deepAssigns({}, _config, _options);
    }
};