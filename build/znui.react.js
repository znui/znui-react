"use strict";

var React = require('react');

var ReactDOM = require('react-dom');

var createClass = require('create-react-class');

if (React && createClass && !React.createClass) {
  React.createClass = createClass;
}

znui.React = React;
znui.ReactDOM = ReactDOM;
znui.axios = zn.data.zncaller = require('axios');
module.exports = znui.react = {
  Application: require('./Application'),
  DataView: require('./DataView'),
  config: {
    __zr__: {},
    set: function set(key, value) {
      return this.__zr__["__" + key + "__"] = value, this;
    },
    sets: function sets(_sets) {
      for (var key in _sets) {
        this.set(key, _sets[key]);
      }

      return this;
    },
    get: function get(key) {
      return this.__zr__["__" + key + "__"];
    }
  },
  fixCreateReactClass: function fixCreateReactClass(React, createClass) {
    if (React && createClass && !React.createClass) {
      React.createClass = createClass;
    }

    return znui.React = React, React;
  },
  fixReactCreateClass: function fixReactCreateClass(react) {
    var React = react || React;

    if (React) {
      if (!React.createClass) {
        React.createClass = createClass;
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
  registerComponent: function registerComponent(key, args) {
    if (this[key]) {
      throw new Error('znui.react.' + key + ' is exist.');
    }

    var _args = args || {
      enableDisplayName: true
    };

    var _component = zn.Class({
      "static": true,
      properties: {},
      methods: {
        init: function init() {
          this.__components__ = components || {};
          this.__config__ = {};
        },
        register: function register() {
          var _argv = arguments,
              _len = _argv.length,
              _key = null,
              _value = null;

          if (_len == 1) {
            _value = _argv[0];
            _key = _value.displayName;
          } else {
            _value = _argv[0];
            _key = _argv[1];

            if (_args.enableDisplayName) {
              _key = _value.displayName;
            }
          }

          if (this[_key]) {
            throw new Error('The key ' + _key + " is exist.");
          }

          this.__components__[_key] = _value;
          this[_key] = _value;
          return this;
        },
        registers: function registers(data) {
          if (zn.is(data, 'array')) {
            data.forEach(function (item) {
              this.register(item);
            }.bind(this));
          } else if (zn.is(data, 'object')) {
            for (var key in data) {
              this.register(data[key], key);
            }
          } else if (zn.is(data, 'function')) {
            this.register(data.call());
          }

          return this;
        },
        resolve: function resolve(key) {
          return this.__components__[key];
        },
        setConfig: function setConfig(key, value) {
          return this.__config__[key] = value;
        },
        getConfig: function getConfig(key) {
          return this.__config__[key];
        },
        components: function components() {
          return this.__components__;
        },
        keys: function keys() {
          return Object.keys(this.__components__);
        }
      }
    });

    return this[key] = _component, _component;
  },
  initRegister: function initRegister(entity) {
    if (entity) {
      entity.__data__ = {};

      entity.register = function (key, value) {
        return entity.__data__[key] = value, entity;
      };

      entity.resolve = function (key) {
        return entity.__data__[key];
      };
    }

    return this;
  },
  destroyRegister: function destroyRegister(entity) {
    if (entity) {
      entity.__data__ = null;
      delete entity.__data__;
      entity.register = null;
      delete entity.register;
      entity.resolve = null;
      delete entity.resolve;
    }

    return this;
  },
  createClass: function createClass(argv) {
    if (znui.React) {
      return znui.React.createClass.call(znui.React, argv);
    } else {
      if (React && React.createClass) {
        return React.createClass.call(React, argv);
      } else {
        throw new Error('react or createClass is not exist.');
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