var React = znui.React || require('react');
var Application = require('./Application');

module.exports = znui.react = {
    Application: Application,
    DataLifecycle: require('./DataLifecycle'),
    DataView: require('./DataView'),
    Lifecycle: require('./Lifecycle'),
    Session: require('./ZRSession'),
    Storage: require('./ZRStorage'),
    Render: require('./Render'),
    R: require('./znui.react.R'),
    loadedComponents: {},
    setting: {},
    stringifyFileSize: function (value){
        if(typeof value != 'string'){
            value = +value;
        }
        if(typeof value != 'number'){
            return 'NaN';
        }
        

        if(value < 1024){
            return value + 'B';
        }

        if(value < 1024 * 1024){
            return (value / 1024).toFixed(2) +'KB';
        }

        if(value < 1024 * 1024 * 1024){
            return (value / (1024 * 1024)).toFixed(2) +'MB';
        }

        if(value < 1024 * 1024 * 1024 * 1024 * 1024){
            return (value / (1024 * 1024 * 1024)).toFixed(2) +'GB';
        }

        if(value < 1024 * 1024 * 1024 * 1024 * 1024 * 1024){
            return (value / (1024 * 1024 * 1024 * 1024)).toFixed(2) +'TB';
        }
    },
    axiosUse: function (req, res){
        if(!znui.axios) return this;
        var _request = zn.extend(req, {
            config: function (config) {
                var _token = znui.react.currentApplication.storage.getToken();
                if(_token && _token.user) {
                    config.headers['X-CSRF-Token'] = _token.user.csrfToken;
                }
                
                  return config;
            },
            error: function (err) {
                return zn.error(err), Promise.reject(err);
            }
        });
        var _response = zn.extend(res, {
            response: function (response){
                zr.popup.loader.close();
                if(response.status !== 200) {
                    return zr.popup.notifier.error(znui.react.R.CODE_MESSAGE[response.status]), null;
                }
                if(!response.data) {
                    return zr.popup.notifier.error(response.responseText), null;
                }
                switch(response.data.code) {
                    case 200:
                        res.on200 && res.on200(response.data, response);
                        break;
                    case 405:
                    case 401:
                        znui.app.storage.clear();
                        res.onLoginInvalid && res.onLoginInvalid(response.data, response);
                        break;
                    default:
                        var _message = null;
                        if(response.data.result) {
                            if(typeof response.data.result == 'string'){
                                _message = response.data.result;
                            }else if(typeof response.data.result == 'object'){
                                _message = response.data.result.message;
                            }
                        }else if(response.data.detail){
                            _message = response.data.detail;
                        }else if(response.data.message){
                            _message = response.data.message;
                        }
            
                        zr.popup.notifier.error(_message);
                        break;
                }
            
                return response.data;
            },
            error: function (error){
                zr.popup.loader.close();
                switch(error.code) {
                    case 'ECONNABORTED':
                        zr.popup.notifier.error('服务请求超时, 请稍后再试');
                        break;
                    case 'ERR_CONNECTION_REFUSED':
                        zr.popup.notifier.error('服务器服务不可用');
                        break;
                    default:
                        zr.popup.notifier.error(error.message);
                        break;
                }
            
                return Promise.reject(error), false;
            }
        });

        znui.axios.interceptors.request.use(_request.config, _request.error);
        znui.axios.interceptors.response.use(_response.response, _response.error);

        return this;
    },
    import: function (name){
        if(znui.react.loadedComponents[name]){
            return znui.react.loadedComponents[name];
        }else{
            return require(name);
        }
    },
    loadComponents: function (namespace, components){
        return zn.path(window, namespace, components);
    },
    loadR: function (){
        for(var i = 0, _len = arguments.length; i < _len; i++){
            if(arguments[i]){
                zn.extend(znui.react.R, arguments[i]);
            }
        }

        return this;
    },
    objectToArrayData: function (obj, valueKey, textKey){
        var _data = [];
        for(var key in obj){
            _data.push({
                [valueKey||'value']: key,
                [textKey||'text']: obj[key]
            });
        }

        return _data;
    },
    createApplication: function (){
        var _argv = arguments,
            _app = null;
        if(_argv.length == 1 && typeof _argv[0] == 'object'){
            _app = new Application(_argv[0]);
        }else if(_argv.length == 2){
            if(typeof _argv[0] == 'string' && typeof _argv[1] == 'object'){
                _argv[1].namespace = _argv[0];
                _app = new Application(_argv[1]);
            }else if(typeof _argv[0] == 'object' && typeof _argv[1] == 'object'){
                _app = new Application(_argv[0], _argv[1]);
            }
        }

        return _app;
    },
    isReactComponent: function (argv){
        if(argv && typeof argv === 'object' && (argv.$$typeof || argv.isReactComponent)){
            return true;
        }

        return false;
    },
    createReactElement: function (argv, options, context){
        if(!argv) {
            return null;
        }
        if(this.isReactComponent(argv)){
            return argv;
        }
        /*
        if(argv && typeof argv === 'object' && (argv.$$typeof || argv.isReactComponent)){
            return argv;
        }*/
        switch(zn.type(argv)){
            case "function":
                if(argv.prototype && argv.prototype.render) {
                    return znui.React.createElement(argv, options);
                }else{
                    var _context = context || options.context || null;
                    argv = argv.call(_context, options);
                    if(this.isReactComponent(argv)){
                        return argv;
                    }
                    /*
                    if(argv && typeof argv === 'object' && argv.$$typeof){
                        return argv;
                    }else{
                        return;
                    }*/
                }
                break;
            case "object":
                var _render = argv.component || argv.render;
                if(typeof _render == 'string'){
					_render = zn.path(window, _render);
				}
                if(_render) {
                    delete argv.component;
                    delete argv.render;
                    return znui.react.createReactElement(_render, zn.extend({}, argv, options));
                }
                break;
            case "array":
                return (
                    <>
                        {
                            argv.map((item)=>znui.react.createReactElement(item, zn.deepAssigns({}, options)))
                        }
                    </>
                );
            case "string":
                var _render = zn.path(window, argv);
                if(_render) {
                    return znui.react.createReactElement(_render, zn.deepAssigns({}, options));
                }
                break;
        }

        return null;
    },
    registerComponent: function (key, args){
        if(this[key]) {
            throw new Error('znui.react.' + key + ' is exist.');
        }
        var _args = zn.extend({ 
            enableDisplayName: true
        }, args);

        var _component = zn.Class({
            static: true,
            properties: {
                _isZNStaticObject_: true
            },
            methods: {
                init: function (){
                    this._components_ =  _args.components || {};
                    this._config_ = {};
                    this._objects_ = [];
                },
                isZNStaticObject: function (){
                    return true;
                },
                register: function (){
                    var _argv = arguments,
                        _len = _argv.length,
                        _key = null, 
                        _value = null;
                    
                    if(_len==1){
                        _value = _argv[0];
                        _key = _value.displayName;
                        if(zn.is(_value, 'object')){
                            return this.registers(_value);
                        }
                    }else{
                        _value = _argv[0];
                        _key = _argv[1];
                        
                    }

                    if(this[_key]){
                        throw new Error('The key ' + _key + " is exist.");
                    }

                    this._components_[_key] = _value;
                    this[_key] = _value;

                    if(_args.enableDisplayName && _value.displayName){
                        this._components_[_value.displayName] = _value;
                        this[_value.displayName] = _value;
                    }

                    return this._objects_.push(_value), _value;
                },
                registers: function (data){
                    var _data = {};
                    if(zn.is(data, 'array')){
                        data.forEach(function (item){
                            if(item.displayName){
                                _data[item.displayName] = item;
                            }
                            this.register(item);
                        }.bind(this));
                    } else if(zn.is(data, 'object')){
                        for(var key in data) {
                            _data[key] = data[key];
                            this.register(data[key], key);
                        }
                    } else if(zn.is(data, 'function')){
                        this.register(data.call());
                    }

                    return _data;
                },
                resolve: function (key){
                    return this._components_[key];
                },
                setConfig: function (key, value){
                    return this._config_[key] = value;
                },
                getConfig: function (key){
                    return this._config_[key];
                },
                components: function (){
                    return this._components_;
                },
                objects: function (){
                    return this._objects_;
                },
                size: function (){
                    return this._objects_.length;
                },
                contain: function (key){
                    return Object.keys(this._components_).indexOf(key) != -1;
                },
                keys: function (){
                    return Object.keys(this._components_);
                }
            }
        });

        return this[key] = _component, _component;
    },
    initRegister: function (entity){
        if(entity){
            entity._data_ = {};
            entity.register = function (key, value){
                return entity._data_[key] = value, entity;
            };
            entity.resolve = function (key){
                return entity._data_[key];
            }
        }

        return this;
    },
    destroyRegister: function (entity){
        if(entity){
            entity._data_ = null;
            delete entity._data_;
            entity.register = null;
            delete entity.register;
            entity.resolve = null;
            delete entity.resolve;
        }

        return this;
    },
    createClass: function (argv){
        if (znui.React) {
            return znui.React.createClass.call(znui.React, argv);
        } else {
            if(React && React.createClass){
                return React.createClass.call(React, argv);
            } else {
                throw new Error('react or createClass is not exist.');
            }
        }
    },
    classname: function (){
        return znui.classname.apply(this, Array.prototype.slice.call(arguments));
    },
    style: function (){
        var _styles = {};
        zn.each(Array.prototype.slice.call(arguments), function (item, index){
            if(item){
                switch (zn.type(item)) {
                    case 'object':
                        zn.extend(_styles, item);
                        break;
                    case 'array':
                        zn.extend(_styles, this.style.apply(this, item));
                        break;
                    case 'function':
                        zn.extend(_styles, item.call(null)||{});
                        break;
                }
            }
        }.bind(this));

        return _styles;
    }
};