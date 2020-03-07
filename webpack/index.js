module.exports = {
    __: require('./__/index'),
    mode: function (mode, options){
        return process.env.NODE_ENV = mode, zn.deepAssign(require('./' + mode + '/index.js'), options);
    },
    application: require('./application/index.js'),
    component: require('./component/index.js'),
    zxnz: require('./zxnz/index.js')
};