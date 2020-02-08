"use strict";

module.exports = zn.Class({
  events: ['init'],
  properties: {
    application: null,
    host: window.location.origin,
    index: null,
    main: null,
    search: null,
    relativePathPrefix: ''
  },
  methods: {
    init: function init(argv, application) {
      this.sets(zn.extend({
        search: {}
      }, argv));
      this._application = application;
      this.fire('init', argv, application);
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
      if (this._home) {
        location.hash = this._home;
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
    validate: function validate() {
      if (this.json()) {
        return true;
      } else {
        return this.doHome(), false;
      }
    }
  }
});