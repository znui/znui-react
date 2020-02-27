require('@zeanium/core');
module.exports = {
    devServer: require('./development.devServer'),
    mode: function (mode){
        return process.env.NODE_ENV = mode, require('./' + mode);
    },
    development: require('./development'),
    production: require('./production'),
    stage: require('./stage')
};