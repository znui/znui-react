"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = zn.Class({
  events: ['init'],
  properties: {
    data: null,
    prefix: 'ZNUI_REACT_',
    engine: 'localStorage',
    application: null
  },
  methods: {
    init: function init(argv, application) {
      argv = zn.extend({
        data: {}
      }, argv);
      this.sets(argv);
      this._application = application;

      this.__initEngine(this._engine);

      this.fire('init', argv, application);
    },
    __initEngine: function __initEngine(engine) {
      if (!engine) {
        return false;
      }

      var _engine = engine || this._engine; // Cookie, sessionStorage, localStorage


      if (_engine && typeof _engine == 'string') {
        _engine = window[_engine];
      }

      return this._engine = _engine, _engine;
    },
    clear: function clear() {
      return this._engine.clear(), this;
    },
    setEngine: function setEngine(engine) {
      return this.__initEngine(engine), this;
    },
    getEngine: function getEngine() {
      return this._engine;
    },
    setPrefix: function setPrefix(prefix) {
      return this._prefix = prefix, this;
    },
    getPrefix: function getPrefix() {
      return this._prefix;
    },
    setItem: function setItem(key, value, timeout) {
      return this.getEngine().setItem(key, _typeof(value) == 'object' ? JSON.stringify(value) : value, timeout), this;
    },
    getItem: function getItem(key) {
      return this.getEngine().getItem(key);
    },
    removeItem: function removeItem(key) {
      return this.getEngine().removeItem(key), this;
    },
    getJSONValue: function getJSONValue(value) {
      var _value = this.getItem(value);

      if (_value) {
        try {
          _value = JSON.parse(_value);
        } catch (e) {
          _value = {};
          console.log(e.stack);
        }
      }

      return _value;
    }
  }
});