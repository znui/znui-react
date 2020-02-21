var zr = require('../zr.webpack');
module.exports = zr.deepExtend({}, require('../base'), require('../production'));