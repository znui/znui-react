"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var React = znui.React || require('react');

var Application = require('./Application');

module.exports = znui.react = {
  Application: Application,
  DataLifecycle: require('./DataLifecycle'),
  DataView: require('./DataView'),
  Lifecycle: require('./Lifecycle'),
  Session: require('./ZRSession'),
  Storage: require('./ZRStorage'),
  Render: require('./Render'),
  R: require('./znui.react.R'),
  loadedComponents: {},
  setting: {},
  stringifyFileSize: function stringifyFileSize(value) {
    if (typeof value != 'string') {
      value = +value;
    }

    if (typeof value != 'number') {
      return 'NaN';
    }

    if (value < 1024) {
      return value + 'B';
    }

    if (value < 1024 * 1024) {
      return (value / 1024).toFixed(2) + 'KB';
    }

    if (value < 1024 * 1024 * 1024) {
      return (value / (1024 * 1024)).toFixed(2) + 'MB';
    }

    if (value < 1024 * 1024 * 1024 * 1024 * 1024) {
      return (value / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
    }

    if (value < 1024 * 1024 * 1024 * 1024 * 1024 * 1024) {
      return (value / (1024 * 1024 * 1024 * 1024)).toFixed(2) + 'TB';
    }
  },
  axiosUse: function axiosUse(req, res) {
    if (!znui.axios) return this;

    var _request = zn.extend(req, {
      config: function config(_config) {
        var _token = znui.react.currentApplication.storage.getToken();

        if (_token && _token.user) {
          _config.headers['X-CSRF-Token'] = _token.user.csrfToken;
        }

        return _config;
      },
      error: function error(err) {
        return zn.error(err), Promise.reject(err);
      }
    });

    var _response = zn.extend(res, {
      response: function response(_response2) {
        zr.popup.loader.close();

        if (_response2.status !== 200) {
          return zr.popup.notifier.error(znui.react.R.CODE_MESSAGE[_response2.status]), null;
        }

        if (!_response2.data) {
          return zr.popup.notifier.error(_response2.responseText), null;
        }

        switch (_response2.data.code) {
          case 200:
            res.on200 && res.on200(_response2.data, _response2);
            break;

          case 405:
          case 401:
            znui.app.storage.clear();
            res.onLoginInvalid && res.onLoginInvalid(_response2.data, _response2);
            break;

          default:
            var _message = null;

            if (_response2.data.result) {
              if (typeof _response2.data.result == 'string') {
                _message = _response2.data.result;
              } else if (_typeof(_response2.data.result) == 'object') {
                _message = _response2.data.result.message;
              }
            } else if (_response2.data.detail) {
              _message = _response2.data.detail;
            } else if (_response2.data.message) {
              _message = _response2.data.message;
            }

            zr.popup.notifier.error(_message);
            break;
        }

        return _response2.data;
      },
      error: function error(_error) {
        zr.popup.loader.close();

        switch (_error.code) {
          case 'ECONNABORTED':
            zr.popup.notifier.error('服务请求超时, 请稍后再试');
            break;

          case 'ERR_CONNECTION_REFUSED':
            zr.popup.notifier.error('服务器服务不可用');
            break;

          default:
            zr.popup.notifier.error(_error.message);
            break;
        }

        return Promise.reject(_error), false;
      }
    });

    znui.axios.interceptors.request.use(_request.config, _request.error);
    znui.axios.interceptors.response.use(_response.response, _response.error);
    return this;
  },
  "import": function _import(name) {
    if (znui.react.loadedComponents[name]) {
      return znui.react.loadedComponents[name];
    } else {
      return require(name);
    }
  },
  loadComponents: function loadComponents(namespace, components) {
    return zn.path(window, namespace, components);
  },
  loadR: function loadR() {
    for (var i = 0, _len = arguments.length; i < _len; i++) {
      if (arguments[i]) {
        zn.extend(znui.react.R, arguments[i]);
      }
    }

    return this;
  },
  objectToArrayData: function objectToArrayData(obj, valueKey, textKey) {
    var _data = [];

    for (var key in obj) {
      var _data$push;

      _data.push((_data$push = {}, _defineProperty(_data$push, valueKey || 'value', key), _defineProperty(_data$push, textKey || 'text', obj[key]), _data$push));
    }

    return _data;
  },
  createApplication: function createApplication() {
    var _argv = arguments,
        _app = null;

    if (_argv.length == 1 && _typeof(_argv[0]) == 'object') {
      _app = new Application(_argv[0]);
    } else if (_argv.length == 2) {
      if (typeof _argv[0] == 'string' && _typeof(_argv[1]) == 'object') {
        _argv[1].namespace = _argv[0];
        _app = new Application(_argv[1]);
      } else if (_typeof(_argv[0]) == 'object' && _typeof(_argv[1]) == 'object') {
        _app = new Application(_argv[0], _argv[1]);
      }
    }

    return _app;
  },
  isReactComponent: function isReactComponent(argv) {
    if (argv && _typeof(argv) === 'object' && (argv.$$typeof || argv.isReactComponent)) {
      return true;
    }

    return false;
  },
  createReactElement: function createReactElement(argv, options, context) {
    if (!argv) {
      return null;
    }

    if (this.isReactComponent(argv)) {
      return argv;
    }
    /*
    if(argv && typeof argv === 'object' && (argv.$$typeof || argv.isReactComponent)){
        return argv;
    }*/


    switch (zn.type(argv)) {
      case "function":
        if (argv.prototype && argv.prototype.render) {
          return znui.React.createElement(argv, options);
        } else {
          var _context = context || options.context || null;

          argv = argv.call(_context, options);

          if (this.isReactComponent(argv)) {
            return argv;
          }
          /*
          if(argv && typeof argv === 'object' && argv.$$typeof){
              return argv;
          }else{
              return;
          }*/

        }

        break;

      case "object":
        var _render = argv.component || argv.render;

        if (typeof _render == 'string') {
          _render = zn.path(window, _render);
        }

        if (_render) {
          delete argv.component;
          delete argv.render;
          return znui.react.createReactElement(_render, zn.extend({}, argv, options));
        }

        break;

      case "array":
        return React.createElement(React.Fragment, null, argv.map(function (item) {
          return znui.react.createReactElement(item, zn.deepAssigns({}, options));
        }));

      case "string":
        var _render = zn.path(window, argv);

        if (_render) {
          return znui.react.createReactElement(_render, zn.deepAssigns({}, options));
        }

        break;
    }

    return null;
  },
  registerComponent: function registerComponent(key, args) {
    if (this[key]) {
      throw new Error('znui.react.' + key + ' is exist.');
    }

    var _args = zn.extend({
      enableDisplayName: true
    }, args);

    var _component = zn.Class({
      "static": true,
      properties: {
        _isZNStaticObject_: true
      },
      methods: {
        init: function init() {
          this._components_ = _args.components || {};
          this._config_ = {};
          this._objects_ = [];
        },
        isZNStaticObject: function isZNStaticObject() {
          return true;
        },
        register: function register() {
          var _argv = arguments,
              _len = _argv.length,
              _key = null,
              _value = null;

          if (_len == 1) {
            _value = _argv[0];
            _key = _value.displayName;

            if (zn.is(_value, 'object')) {
              return this.registers(_value);
            }
          } else {
            _value = _argv[0];
            _key = _argv[1];
          }

          if (this[_key]) {
            throw new Error('The key ' + _key + " is exist.");
          }

          this._components_[_key] = _value;
          this[_key] = _value;

          if (_args.enableDisplayName && _value.displayName) {
            this._components_[_value.displayName] = _value;
            this[_value.displayName] = _value;
          }

          return this._objects_.push(_value), _value;
        },
        registers: function registers(data) {
          var _data = {};

          if (zn.is(data, 'array')) {
            data.forEach(function (item) {
              if (item.displayName) {
                _data[item.displayName] = item;
              }

              this.register(item);
            }.bind(this));
          } else if (zn.is(data, 'object')) {
            for (var key in data) {
              _data[key] = data[key];
              this.register(data[key], key);
            }
          } else if (zn.is(data, 'function')) {
            this.register(data.call());
          }

          return _data;
        },
        resolve: function resolve(key) {
          return this._components_[key];
        },
        setConfig: function setConfig(key, value) {
          return this._config_[key] = value;
        },
        getConfig: function getConfig(key) {
          return this._config_[key];
        },
        components: function components() {
          return this._components_;
        },
        objects: function objects() {
          return this._objects_;
        },
        size: function size() {
          return this._objects_.length;
        },
        contain: function contain(key) {
          return Object.keys(this._components_).indexOf(key) != -1;
        },
        keys: function keys() {
          return Object.keys(this._components_);
        }
      }
    });

    return this[key] = _component, _component;
  },
  initRegister: function initRegister(entity) {
    if (entity) {
      entity._data_ = {};

      entity.register = function (key, value) {
        return entity._data_[key] = value, entity;
      };

      entity.resolve = function (key) {
        return entity._data_[key];
      };
    }

    return this;
  },
  destroyRegister: function destroyRegister(entity) {
    if (entity) {
      entity._data_ = null;
      delete entity._data_;
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