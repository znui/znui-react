var __ = require('../__/index');
module.exports = {
    development: zn.deepAssigns({}, __.development, require('./development')),
    production: zn.deepAssigns({}, __.production, require('./production')),
    example: zn.deepAssigns({}, __.development, require('./example')),
};