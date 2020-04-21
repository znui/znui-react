module.exports = {
    __: require('./__/index'),
    mode: function (mode, options){
        var _options = {},
            _config = require('./' + mode + '/index.js');
        switch(zn.type(options)) {
            case "object":
                _options = options;
                break;
            case "function":
                _options = options(_config);
                break;
        }
        
        return process.env.NODE_ENV = mode, zn.deepAssigns({ }, _config, _options);
    },
    app: require('./app/index.js'),
    application: require('./application/index.js'),
    component: require('./component/index.js'),
    zxnz: require('./zxnz/index.js')
};