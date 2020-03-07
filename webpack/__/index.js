if(!global.zn) {
    require('@zeanium/core');
}
module.exports = {
    mode: function (mode){
        return process.env.NODE_ENV = mode, require('./' + mode);
    },
    devServer: require('./development.devServer'),
    development: require('./development'),
    production: require('./production'),
    stage: require('./stage')
};