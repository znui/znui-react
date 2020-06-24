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
        init: function (argv, events){
            argv = zn.extend({}, argv);
            this.sets(argv);
            this._components = this.__initComponents(argv.components);
            this._storage = new Storage(argv.storage);
            this.__initConfig(argv.config);
            this.__initEvents(events || {});
            var _value = this.fire('init', argv);
            if(_value !== false){
                this.update(_value);
            }
        },
        __initConfig: function (config){
            if(config) {
                if(config.$development || config.$production || config.$stage){
                    this._config = config['$' + (process.env.NODE_ENV || 'production')];
                }else{
                    this._config = config;
                }
                if(this._config) {
                    zn.data.setHost(this._config.host || zn.data.host, this._config.port || zn.data.port);
                }
            }
        },
        __initComponents: function (components){
            var _components = components || {},
                _namespace = _components.__namespace__ || 'zr',
                _var = zn.path(window, _namespace);
            if(!_var) {
                _var = {};
                zn.path(window, _namespace, _var);
            }
            
            _components.__namespace__ = null;
            delete _components.__namespace__;

            for(var key in _components) {
                _var[key] = _components[key];
            }
            
            return this;
        },
        __initEvents: function (events){
            for(var event in events){
                this.on(event, events[event], this);
            }
        },
        __getContainer: function (){
            if(zn.is(this.container, 'string')){
                return document.getElementById(this.container);
            }

            return this.container;
        },
        __getGlobalRender: function (){
            return znui.react.createReactElement(this._globalRender, {
                application: this
            });
        },
        __getRender: function (view){
            if(view){
                return view;
            }else{
                return znui.react.createReactElement(this._render, {
                    application: this
                });
            }
        },
        __render: function (view){
            this.fire('render', view);
            return ReactDOM.render(<>
                {this.__getRender(view)}
                {this.__getGlobalRender()}
            </>, this.__getContainer()), this;
        },
        createSession: function (argv, _session){
            if(argv){
                var _Session = Session || _session;
                return this._session = new _Session(argv, this), this._session;
            }
        },
        update: function (view){
            this.fire('update', view);
            if(this._delay) {
                return window.setTimeout(()=>this.__render(view), this._delay);
            }
            
            return this.__render(view);
        }
    }
});
