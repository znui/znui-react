module.exports = znui.react = {
    Application: require('./Application'),
    Ripple: require('./Ripple'),
    getReact: function (){
        var React = require('react');
        if(React && !React.createClass){
            React.createClass = require('create-react-class');
        }

        return React;
    },
    createClass: function (argv){
        return require('create-react-class').call(this.getReact, argv);
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