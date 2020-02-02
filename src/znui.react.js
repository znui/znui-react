var React = require('react');
var ReactDOM = require('react-dom');
var createClass = require('create-react-class');
if(React && createClass && !React.createClass){
    React.createClass = createClass;
}
znui.React = React;
znui.ReactDOM = ReactDOM;
znui.axios = zn.data.zncaller = require('axios');

module.exports = znui.react = {
    Application: require('./Application'),
    DataView: require('./DataView'),
    config: {
        __zr__: {
            
        },
        set: function (key, value){
            return this.__zr__["__" + key + "__"] = value, this;
        },
        sets: function (sets){
            for(var key in sets){
                this.set(key, sets[key]);
            }
            return this;
        },
        get: function (key){
            return this.__zr__["__" + key + "__"];
        }
    },
    fixCreateReactClass: function (React, createClass){
        if(React && createClass && !React.createClass){
            React.createClass = createClass;
        }

        return znui.React = React, React;
    },
    fixReactCreateClass: function (react){
        var React = react || React;
        if(React){
            if(!React.createClass){
                React.createClass = createClass;
            }
            if(React.createClass){
                return znui.React = React, React;
            }else{
                throw new Error('create-react-class is not exist.');
            }
        } else {
            throw new Error('react is not exist.');
        }
    },
    generateGlobalRegister: function (key){
        if(this[key]) {
            throw new Error('znui.react.' + key + ' is exist.');
        }

        this[key] = zn.Class({
            static: true,
            properties: {},
            methods: {
                init: function (){
                    this.__data__ = {};
                },
                register: function (key, value){
                    this.__data__[key] = value;
                },
                resolve: function (key){
                    return this.__data__[key];
                },
                inputs: function (){
                    return this.__data__;
                },
                keys: function (){
                    return Object.keys(this.__data__);
                }
            }
        });

        return this[key];
    },
    initRegister: function (entity){
        if(entity){
            entity.__data__ = {};
            entity.register = function (key, value){
                return entity.__data__[key] = value, entity;
            };
            entity.resolve = function (key){
                return entity.__data__[key];
            }
        }

        return this;
    },
    destroyRegister: function (entity){
        if(entity){
            entity.__data__ = null;
            delete entity.__data__;
            entity.register = null;
            delete entity.register;
            entity.resolve = null;
            delete entity.resolve;
        }

        return this;
    },
    createClass: function (argv){
        if (znui.React) {
            return znui.React.createClass.call(znui.React, argv);
        } else {
            if(React && React.createClass){
                return React.createClass.call(React, argv);
            } else {
                throw new Error('react or createClass is not exist.');
            }
        }
    },
    classname: function (){
        return znui.classname.apply(this, Array.prototype.slice.call(arguments));
    },
    style: function (){
        var _styles = {};
        zn.each(Array.prototype.slice.call(arguments), function (item, index){
            if(item){
                switch (zn.type(item)) {
                    case 'object':
                        zn.extend(_styles, item);
                        break;
                    case 'array':
                        zn.extend(_styles, this.style.apply(this, item));
                        break;
                    case 'function':
                        zn.extend(_styles, item.call(null)||{});
                        break;
                }
            }
        }.bind(this));

        return _styles;
    }
};