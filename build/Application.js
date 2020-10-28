"use strict";

var React = znui.React || require('react');

var ReactDOM = znui.ReactDOM || require('react-dom');

var ZRSession = require('./ZRSession.js');

var ZRStorage = require('./ZRStorage.js');

module.exports = zn.Class({
  events: ['initial', 'update', 'render'],
  properties: {
    container: 'zr-container',
    components: null,
    delay: 0,
    session: null,
    storage: null,
    render: null,
    globalRender: null
  },
  methods: {
    init: function init(argv, events) {
      argv = zn.extend({}, argv);
      znui.react.currentApplication = this;

      if (argv.namespace) {
        zn.path(window, argv.namespace, this);
      }

      this.sets(argv);
      this._data = {};
      this._components = this.__initComponents(argv.components);
      this._storage = new ZRStorage(argv.storage, this);
      this._session = new ZRSession(argv.session, this);

      this.__initConfig(argv.config);

      this.__initEvents(events || {});

      var _value = this.fire('initial', argv);

      if (_value !== false) {
        this.update(_value);
      }
    },
    __initConfig: function __initConfig(config) {
      if (config) {
        if (config.$development || config.$production || config.$stage) {
          this._config = config['$' + (process.env.NODE_ENV || 'production')];
        } else {
          this._config = config;
        }

        if (this._config) {
          zn.http.setHost(this._config.host || zn.setting.path('zn.data.host'), this._config.port || zn.setting.path('zn.data.port'));
          zn.data.setHost(this._config.host || zn.setting.path('zn.data.host'), this._config.port || zn.setting.path('zn.data.port'));
        }
      }
    },
    __initComponents: function __initComponents(components) {
      var _components = components || {},
          _namespace = _components.__namespace__ || 'zr',
          _var = zn.path(window, _namespace);

      if (!_var) {
        _var = {};
        zn.path(window, _namespace, _var);
      }

      _components.__namespace__ = null;
      delete _components.__namespace__;

      for (var key in _components) {
        _var[key] = _components[key];
      }

      return this;
    },
    __initEvents: function __initEvents(events) {
      for (var event in events) {
        this.on(event, events[event], this);
      }
    },
    __getContainer: function __getContainer() {
      if (zn.is(this.container, 'string')) {
        return document.getElementById(this.container);
      }

      return this.container;
    },
    __getGlobalRender: function __getGlobalRender() {
      return znui.react.createReactElement(this._globalRender, {
        application: this
      });
    },
    __getRender: function __getRender(view) {
      if (view) {
        return view;
      } else {
        return znui.react.createReactElement(this._render, {
          application: this
        });
      }
    },
    __render: function __render(view) {
      this.fire('render', view);
      return ReactDOM.render(React.createElement(React.Fragment, null, this.__getRender(view), this.__getGlobalRender()), this.__getContainer()), this;
    },
    setValue: function setValue(key, value) {
      return this._data[key] = value, this;
    },
    getValue: function getValue(key) {
      return this._data[key];
    },
    createSession: function createSession(argv, SessionClass) {
      if (argv) {
        var _Session = ZRSession || SessionClass;

        return this._session = new _Session(argv, this), this._session;
      }
    },
    update: function update(view) {
      var _this = this;

      this.fire('update', view);

      if (this._delay) {
        return window.setTimeout(function () {
          return _this.__render(view);
        }, this._delay);
      }

      return this.__render(view);
    }
  }
});