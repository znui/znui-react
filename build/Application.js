"use strict";

var React = znui.React || require('react');

var ReactDOM = znui.ReactDOM || require('react-dom');

var Session = require('./Session.js');

var Storage = require('./Storage.js');

module.exports = zn.Class({
  events: ['init', 'update', 'render'],
  properties: {
    container: 'container',
    delay: 0,
    session: null,
    storage: null,
    render: null,
    globalRender: null
  },
  methods: {
    init: function init(argv, events) {
      argv = zn.extend({}, argv);
      this.sets(argv);

      this.__initEvents(events || {});

      this._storage = new Storage(argv.storage);

      var _value = this.fire('init', argv);

      if (_value !== false) {
        this.update(_value);
      }
    },
    __initEvents: function __initEvents(events) {
      for (var event in events) {
        this.on(event, events[event], this);
      }
    },
    createSession: function createSession(argv, _session) {
      if (argv) {
        var _Session = Session || _session;

        return this._session = new _Session(argv, this), this._session;
      }
    },
    __getRenderView: function __getRenderView() {
      return this.render && this.render.call(this);
    },
    __getContainer: function __getContainer() {
      if (zn.is(this.container, 'string')) {
        return document.getElementById(this.container);
      }

      return this.container;
    },
    __getGlobalRender: function __getGlobalRender() {
      var _this = this;

      var _render = this._globalRender,
          _view = null;

      switch (zn.type(_render)) {
        case 'object':
          if (_render.$$typeof) {
            _view = _render;
          } else {
            _view = React.createElement(React.createClass(_render), {});
          }

          break;

        case 'function':
          if (_render.prototype.isReactComponent) {
            _view = _render;
          } else {
            _view = _render.call(this);
          }

          break;

        case 'array':
          _view = React.createElement(React.Fragment, null, _render.map(function (item) {
            return _this.__getGlobalRender(item);
          }));
      }

      return _view;
    },
    __getRender: function __getRender(view) {
      var _this2 = this;

      var _view = null;

      if (view) {
        _view = view;
      } else {
        var _render = this._render;

        switch (zn.type(_render)) {
          case 'object':
            if (_render.$$typeof) {
              _view = _render;
            } else {
              _view = React.createElement(React.createClass(_render), {});
            }

            break;

          case 'function':
            if (_render.prototype.isReactComponent) {
              _view = _render;
            } else {
              _view = _render.call(this);
            }

            break;

          case 'array':
            _view = React.createElement(React.Fragment, null, _render.map(function (item) {
              return _this2.__getRender(item);
            }));
        }
      }

      return _view;
    },
    __render: function __render(view) {
      this.fire('render', view);
      return ReactDOM.render(React.createElement(React.Fragment, null, this.__getRender(view), this.__getGlobalRender()), this.__getContainer()), this;
    },
    update: function update(view) {
      var _this3 = this;

      this.fire('update', view);

      if (this._delay) {
        return window.setTimeout(function () {
          return _this3.__render(view);
        }, this._delay);
      }

      return this.__render(view);
    }
  }
});