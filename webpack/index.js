var zr = require('./zr');
module.exports = zr.deepExtend(zr, {
    base: require('./webpack.base'),
    development: require('./webpack.development'),
    production: require('./webpack.production'),
    __: require('./__/index.js'),
    application: require('./application/index.js'),
    zxnz: require('./zxnz/index.js'),
    component: require('./component/index.js')
});