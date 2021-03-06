var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var createReactClass = require('create-react-class');
if(React && createReactClass && !React.createClass){
    React.createClass = createReactClass;
}
var znui = window.znui,
    name = require('./package.json').name;

if(!znui) {
    znui = window.znui = require('../znui');
}
znui.React = React;
znui.ReactDOM = ReactDOM;
if(axios){
    znui.axios = axios;
    znui.axios.defaults.withCredentials = true;
    if(zn.data && zn.data.setCaller) zn.data.setCaller(axios);
}

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

module.exports = require('./build/znui.react.js');