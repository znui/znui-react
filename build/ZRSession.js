"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var jwt = require('jsonwebtoken');
module.exports = zn.Class({
  events: ['init'],
  properties: {
    application: null,
    cookies: null,
    jwt: null,
    host: window.location.origin,
    tokenType: 'jwt',
    tokens: null,
    index: null,
    main: null,
    search: null,
    relativePathPrefix: ''
  },
  methods: {
    init: function init(argv, application) {
      this.sets(zn.extend({
        search: {},
        tokens: ['ZNSESSIONID', 'zxnz_user_profile']
      }, argv));
      this._jwt = jwt;
      this._application = application;
      this._cookies = this.__initCookie();
      this.fire('init', argv, application);
    },
    __initCookie: function __initCookie() {
      var _strs = (window.document.cookie || '').split(';'),
        _temp = [],
        _values = {};
      var _iterator = _createForOfIteratorHelper(_strs),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var str = _step.value;
          if (str) {
            _temp = str.split('=');
            _values[_temp[0]] = _temp[1];
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return _values;
    },
    fixRelativePath: function fixRelativePath(path) {
      if (!path) {
        return '';
      }
      var _relativePathPrefix = this._relativePathPrefix || '';
      if (path.indexOf(_relativePathPrefix) == -1) {
        path = _relativePathPrefix + path;
      }
      return path;
    },
    relativeURL: function relativeURL(path, argv) {
      var _argv = zn.querystring.stringify(argv);
      return '#' + this.fixRelativePath(path) + (_argv ? '?' + _argv : '');
    },
    relativeJump: function relativeJump(path, search, overwrite) {
      return this.jump(this.fixRelativePath(path), search, overwrite);
    },
    jump: function jump(path, search, overwrite) {
      if (!path) {
        return this;
      }
      var _search = zn.extend({}, search);
      if (!overwrite) {
        zn.overwrite(_search, this._search);
      }
      if (!search) {
        this._search = {};
      }
      this._search = zn.overwrite(_search, this._search);
      var _querystring = zn.querystring.stringify(this._search);
      return location.hash = path + (_querystring ? '?' + _querystring : ''), this;
    },
    back: function back() {
      return window.history.back(), this;
    },
    setSearch: function setSearch(value) {
      return this._search = value, this;
    },
    setRelativePathPrefix: function setRelativePathPrefix(value) {
      return this._relativePathPrefix = value, this;
    },
    fixPath: function fixPath(path) {
      return (this._relativePathPrefix || '') + (path || '');
    },
    isPath: function isPath(value) {
      return window.location.hash.split('?')[0] === '#' + this.fixPath(value);
    },
    containPath: function containPath(value) {
      return window.location.hash.split('?')[0].indexOf('#' + this.fixPath(value)) !== -1;
    },
    setIndex: function setIndex(value) {
      return this._index = value, this;
    },
    doIndex: function doIndex() {
      if (this._index) {
        location.hash = this._index;
      }
      return this;
    },
    setMain: function setMain(value) {
      return this._main = value, this;
    },
    doMain: function doMain(data) {
      if (this._main) {
        if (data) {
          this.clear().set(data);
        }
        location.hash = this.fixRelativePath(this._main);
      }
      return this;
    },
    getPath: function getPath() {
      return location.hash.slice(1);
    },
    isJWTExpired: function isJWTExpired(value) {
      if (Date.now() / 1000 > value) {
        return true;
      }
      return false;
    },
    logout: function logout() {
      window.document.cookie = '';
      return this.doIndex(), this;
    },
    getProfile: function getProfile(name) {
      var _token = this._cookies[name];
      if (_token) {
        return jwt.decode(_token);
      }
      return null;
    },
    validate: function validate() {
      var _data = {};
      var _iterator2 = _createForOfIteratorHelper(this._tokens),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var key = _step2.value;
          if (!this._cookies[key]) return this.doIndex(), false;
          if (this._tokenType == 'jwt') {
            var _token = jwt.decode(this._cookies[key]);
            if (this.isJWTExpired(_token.exp)) {
              return this.doIndex(), false;
            }
            _data[key] = _token;
          } else {
            _data[key] = this._cookies[key];
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }
});