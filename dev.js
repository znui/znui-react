if(!window.zn){
    require('@zeanium/core');
    require('@zeanium/web');
}

if(!window.znui){
    require('znui');
}

module.exports = require('./build/znui.react.js');