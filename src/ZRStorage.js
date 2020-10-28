module.exports = zn.Class({
    events: ['init'],
    properties: {
        data: null,
        prefix: 'ZNUI_REACT_',
        engine: 'localStorage',
        application: null
    },
    methods: {
        init: function (argv, application){
            argv = argv || {};
            this._data = argv.data || {};
            this._prefix = argv.prefix || 'ZNUI_REACT_';
            this._tokenKey = argv.tokenKey || 'znui.app.token';
            this._engine = argv.engine || 'localStorage';
            this._application = application;
            this.__initEngine(this._engine);
            this.fire('init', argv, application);
        },
        __initEngine: function (engine){
            if(!engine){ return false; }
            var _engine = engine || this._engine;   // Cookie, sessionStorage, localStorage
            if(_engine && typeof _engine == 'string'){
                _engine = window[_engine];
            }

            return this._engine = _engine, _engine;
        },
        clear: function (){
            return this._engine.clear(), this;
        },
        setEngine: function (engine){
            return this.__initEngine(engine), this;
        },
        getEngine: function (){
            return this._engine;
        },
        setToken: function (value){
            return this.setItem(this._tokenKey, value), this;
        },
        getToken: function (ifJSONParse){
            return this.getItem(this._tokenKey, ifJSONParse);
        },
        setPrefix: function (prefix){
            return this._prefix = prefix, this;
        },
        getPrefix: function (){
            return this._prefix;
        },
        setItem: function (key, value, timeout){
            key = this._prefix + (key || '');
            return this.getEngine().setItem(key, ((typeof value=='object') ? JSON.stringify(value) : value), timeout), this;
        },
        getItem: function (key, ifJSONParse){
            key = this._prefix + (key || '');
            var _value = this.getEngine().getItem(key);
            if(ifJSONParse !== false) {
                ifJSONParse = true;
            }
            if(ifJSONParse && _value){
                try {
                    return JSON.parse(_value);
                } catch (err) {
                    return {};
                }
            }

            return _value;
        },
        removeItem: function (key){
            key = this._prefix + (key || '');
            return this.getEngine().removeItem(key), this;
        },
        getJSONValue: function (value){
            var _value = this.getItem(value);
            if(_value){
                try {
                    _value = JSON.parse(_value);
                }catch(e){
                    _value = {};
                    console.error(e.stack);
                }
            }

            return _value;
        }
    }
});
