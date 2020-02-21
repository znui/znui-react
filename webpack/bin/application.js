var FileUtil = require('./FileUtil');
var node_path = require('path');
var node_fs = require('fs');
var zr = require('../zr');
var _dirname = __dirname,
    _cwd = process.cwd();

module.exports = zr.deepAssign(require('./base'), {
    init: function (argv){
        var _source = node_path.resolve(_dirname, '../application/boilerplate'),
            _target = node_path.resolve(_cwd, argv.path || ''),
            _package = require(node_path.resolve(_source, 'package.json'));
        
        _package.name = argv.name;
        _package.version = argv.version || "1.0.1";
        _package.keywords.push(argv.name);
        if(argv.repository){
            _package.repository = {
                type: "git",
                url: argv.repository
            }
        }

        FileUtil.copyFolder(_source, _target, {
            callback: function (dirent, tfile){
                if(process.env.NODE_ENV == "development") {
                    console.log("Created: ", tfile);
                }
            }
        });

        FileUtil.createFile(node_path.resolve(_target, 'package.json'), JSON.stringify(_package, null, 2));
    }
});