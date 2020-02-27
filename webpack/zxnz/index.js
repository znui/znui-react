var __ = require('../__/index'),
    __zxnz__ = require('./__');
    
module.exports = {
    development: zn.deepAssigns({}, __.mode('development'), __zxnz__.getMultipleEntryConfig(), require('./development')),
    production: zn.deepAssigns({}, __.mode('production'), __zxnz__.getMultipleEntryConfig(), require('./production')),
    stage: zn.deepAssigns({}, __.mode('stage'), __zxnz__.getMultipleEntryConfig(), require('./stage')),
};