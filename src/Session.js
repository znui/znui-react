module.exports = zn.Class({
    events: ['init'],
    properties: {
        application: null,
        host: window.location.origin,
        index: null,
        main: null,
        search: null,
        relativePathPrefix: '',
    },
    methods: {
        init: function (argv, application){
            this.sets(zn.extend({
                search: {}
            }, argv));

            this._application = application;
            this.fire('init', argv, application);
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
            if(this._home){
                location.hash = this._home;
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
        validate: function (){
            if(this.json()){
                return true;
            }else {
                return this.doHome(), false;
            }
        }
    }
});
