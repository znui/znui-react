"use strict";

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

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _strs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var str = _step.value;

          if (str) {
            _temp = str.split('=');
            _values[_temp[0]] = _temp[1];
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
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
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._tokens[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }
});