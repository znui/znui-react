var znui = window.znui;
if(!znui) {
    znui = require('znui');
}
var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var createReactClass = require('create-react-class');
if(React && createReactClass && !React.createClass){
    React.createClass = createReactClass;
}
znui.React = React;
znui.ReactDOM = ReactDOM;
znui.axios = zn.data.zncaller = axios;

window.zr = {
    __zr__: {},
    set: function (key, value){
        return this.__zr__["_" + key + "_"] = value, this;
    },
    sets: function (sets){
        for(var key in sets){
            this.set(key, sets[key]);
        }
        return this;
    },
    get: function (key){
        return this.__zr__["_" + key + "_"];
    }
};

if(process && process.env && process.env.NODE_ENV) {
    if(process.env.NODE_ENV == 'development') {
        module.exports = require('./build/znui.react.js');
    }else{
        module.exports = require('./dist/znui.react.js');
    }
}else {
    module.exports = require('./dist/znui.react.js');
}