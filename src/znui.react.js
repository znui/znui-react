if(!zn){
    require('@zeanium/core');
    require('@zeanium/web');
}
if(!znui){
    require('znui');
}

if(!znui.React && !znui.ReactDOM){
    var React = require('react');
    var ReactDOM = require('react-dom');
    var createClass = require('create-react-class');
    if(React && createClass && !React.createClass){
        React.createClass = createClass;
    }
    znui.React = React;
    znui.ReactDOM = ReactDOM;
}
module.exports = znui.react = {
    Application: require('./Application'),
    config: {
        set: function (key, value){
            return this["__" + key + "__"] = value, this;
        },
        sets: function (sets){
            for(var key in sets){
                this.set(key, sets[key]);
            }
            return this;
        },
        get: function (key){
            return this["__" + key + "__"];
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