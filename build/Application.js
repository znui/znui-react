"use strict";

var React = znui.React || require('react');

var ReactDOM = znui.ReactDOM || require('react-dom');

var Session = require('./Session.js');

var Storage = require('./Storage.js');

module.exports = zn.Class({
  events: ['init', 'update', 'render'],
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
      this.sets(argv);
      this._components = this.__initComponents(argv.components);
      this._storage = new Storage(argv.storage);

      this.__initEvents(events || {});

      var _value = this.fire('init', argv);

      if (_value !== false) {
        this.update(_value);
      }
    },
    __initComponents: function __initComponents(components) {
      var _components = components || [];

      _components["for"];
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