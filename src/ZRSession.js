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
        relativePathPrefix: '',
    },
    methods: {
        init: function (argv, application){
            this.sets(zn.extend({
                search: {},
                tokens: [ 'ZNSESSIONID', 'zxnz_user_profile' ]
            }, argv));
            this._jwt = jwt;
            this._application = application;
            this._cookies = this.__initCookie();
            this.fire('init', argv, application);
        },
        __initCookie: function (){
            var _strs = (window.document.cookie || '').split(';'),
                _temp = [],
                _values = {};
            for(var str of _strs) {
                if(str){
                    _temp = str.split('=');
                    _values[_temp[0]] = _temp[1];
                }
            }

            return _values;
        },
        fixRelativePath: function (path){
            if(!path){ return ''; }
            var _relativePathPrefix = this._relativePathPrefix || '';
            if(path.indexOf(_relativePathPrefix) == -1){
                path = _relativePathPrefix + path;
            }

            return path;
        },
        relativeURL: function (path, argv){
            var _argv = zn.querystring.stringify(argv);
            return '#' + this.fixRelativePath(path) + (_argv?('?'+_argv):'');
        },
        relativeJump: function (path, search, overwrite){
            return this.jump(this.fixRelativePath(path), search, overwrite);
        },
        jump: function (path, search, overwrite){
            if(!path){ return this; }
            var _search = zn.extend({}, search);
            if(!overwrite){
                zn.overwrite(_search, this._search);
            }
            if(!search){
                this._search = {};
            }
            this._search = zn.overwrite(_search, this._search);

            var _querystring = zn.querystring.stringify(this._search);

            return location.hash = path + (_querystring ? '?' + _querystring : ''), this;
    	},
        back: function (){
            return window.history.back(), this;
        },
        setSearch: function (value){
            return this._search = value, this;
        },
        setRelativePathPrefix: function (value){
            return this._relativePathPrefix = value, this;
        },
        fixPath: function (path){
            return (this._relativePathPrefix || '') + (path || '');
        },
        isPath: function (value){
            return window.location.hash.split('?')[0] === '#' + this.fixPath(value);
        },
        containPath: function (value){
            return window.location.hash.split('?')[0].indexOf('#' + this.fixPath(value)) !== -1;
        },
        setIndex: function (value){
            return this._index = value, this;
        },
        doIndex: function (){
            if(this._index){
                location.hash = this._index;
            }

            return this;
        },
        setMain: function (value){
            return this._main = value, this;
        },
        doMain: function (data){
            if(this._main){
                if(data){
                    this.clear().set(data);
                }
                location.hash = this.fixRelativePath(this._main);
            }

            return this;
        },
        getPath: function (){
            return location.hash.slice(1);
        },
        isJWTExpired: function (value){
            if(Date.now()/1000 > value){
                return true;
            }

            return false;
        },
        logout: function (){
            window.document.cookie = '';
            return this.doIndex(), this;
        },
        getProfile: function (name){
            var _token = this._cookies[name];
            if(_token){
                return jwt.decode(_token);
            }

            return null;
        },
        validate: function (){
            var _data = {};
            for(var key of this._tokens){
                if(!this._cookies[key]) return this.doIndex(), false;
                if(this._tokenType == 'jwt'){
                    var _token = jwt.decode(this._cookies[key]);
                    if(this.isJWTExpired(_token.exp)){
                        return this.doIndex(), false;
                    }
                    _data[key] = _token;
                }else{
                    _data[key] = this._cookies[key];
                }
            }
        }
    }
});
