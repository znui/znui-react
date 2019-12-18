"use strict";

module.exports = znui.react = {
  Application: require('./Application'),
  config: {
    set: function set(key, value) {
      return this["__" + key + "__"] = value, this;
    },
    sets: function sets(_sets) {
      for (var key in _sets) {
        this.set(key, _sets[key]);
      }

      return this;
    },
    get: function get(key) {
      return this["__" + key + "__"];
    }
  },
  fixCreateReactClass: function fixCreateReactClass(React, createClass) {
    if (React && createClass) {
      if (React && !React.createClass) {
        React.createClass = createClass;
      }
    }

    return znui.React = React, React;
  },
  fixReactCreateClass: function fixReactCreateClass(react) {
    var React = react || require('react');

    if (React) {
      if (!React.createClass) {
        React.createClass = require('create-react-class');
      }

      if (React.createClass) {
        return znui.React = React, React;
      } else {
        throw new Error('create-react-class is not exist.');
      }
    } else {
      throw new Error('react is not exist.');
    }
  },
  createClass: function createClass(argv) {
    if (znui.React) {
      return znui.React.createClass.call(znui.React, argv);
    } else {
      var React = this.fixReactCreateClass();
      znui.React = React;

      if (React && React.createClass) {
        return React.createClass.call(React, argv);
      } else {
        throw new Error('react is not exist.');
      }
    }
  },
  classname: function classname() {
    return znui.classname.apply(this, Array.prototype.slice.call(arguments));
  },
  style: function style() {
    var _styles = {};
    zn.each(Array.prototype.slice.call(arguments), function (item, index) {
      if (item) {
        switch (zn.type(item)) {
          case 'object':
            zn.extend(_styles, item);
            break;

          case 'array':
            zn.extend(_styles, this.style.apply(this, item));
            break;

          case 'function':
            zn.extend(_styles, item.call(null) || {});
            break;
        }
      }
    }.bind(this));
    return _styles;
  }
};