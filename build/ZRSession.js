"use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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