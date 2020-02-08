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
        init: function (argv){
            argv = zn.extend({}, argv);
            this.sets(argv);
            this._storage = new Storage(argv.storage);
            var _value = this.fire('init', argv);
            if(_value !== false){
                this.update(_value);
            }
        },
        createSession: function (argv, _session){
            if(argv){
                var _Session = Session || _session;
                return this._session = new _Session(argv, this), this._session;
            }
        },
        __getRenderView: function (){
            return this.render && this.render.call(this);
        },
        __getContainer: function (){
            if(zn.is(this.container, 'string')){
                return document.getElementById(this.container);
            }

            return this.container;
        },
        __getGlobalRender: function (){
            var _render = this._globalRender,
                _view = null;
            switch(zn.type(_render)){
                case 'object':
                    if(_render.$$typeof){
                        _view = _render;
                    }else{
                        _view = React.createElement(React.createClass(_render), {});
                    }
                    break;
                case 'function':
                    if(_render.prototype.isReactComponent){
                        _view = _render;
                    }else{
                        _view = _render.call(this);
                    }
                    break;
                case 'array':
                    _view = <>
                        {_render.map((item)=>this.__getGlobalRender(item))}
                    </>;
            }

            return _view;
        },
        __getRender: function (view){
            var _view = null;
            if(view){
                _view = view;
            }else{
                var _render = this._render;
                switch(zn.type(_render)){
                    case 'object':
                        if(_render.$$typeof){
                            _view = _render;
                        }else{
                            _view = React.createElement(React.createClass(_render), {});
                        }
                        break;
                    case 'function':
                        if(_render.prototype.isReactComponent){
                            _view = _render;
                        }else{
                            _view = _render.call(this);
                        }
                        break;
                    case 'array':
                        _view = <>
                            {_render.map((item)=>this.__getRender(item))}
                        </>;
                }
            }

            return _view;
        },
        __render: function (view){
            this.fire('render', view);
            return ReactDOM.render(<>{this.__getRender(view)}{this.__getGlobalRender()}</>, this.__getContainer()), this;
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
