module.exports = zn.Class({
    statics: {
        create: function (argv){
            var _props = {},
                _methods = {
                    init: function (argv){
                        this.super(argv);
                        this.sets(argv);
                    }
                };
            zn.each(argv, function (value, key){
                if(zn.type(value)=='function' && !value.displayName){
                    _methods[key] = value;
                }else {
                    _props[key] = value;
                }
            });
            var _Class = zn.Class(this, {
                methods: _methods,
                properties: _props
            });

            return new _Class(_props);
        }
    },
    properties: {
        container: 'container',
        absolute: true,
        home: null,
        main: null,
        host: window.location.origin,
        router: null,
        global: null,
        plugins: []
    },
    methods: {
        init: function (argv){
            this.sets(argv);
            this.__initArgv(argv);
            var _value = this.onInit && this.onInit.call(this, this.gets());
            if(_value!==false){
                this.update(_value);
            }
        },
        __initArgv: function (argv){
            var _routers = {},
                _relativeRouters = {},
                _plugin = null,
                _path = this.get('path'),
                _self = this;

            this.get('plugins') && this.get('plugins').forEach(function (plugin){
                if(zn.is(plugin, 'string')){
                    plugin = _self.onLoading(plugin);
                }
                if(zn.is(plugin, 'array')){
                    zn.extend(_routers, plugin[1]);
                    plugin = plugin[0];
                }

                zn.extend(_relativeRouters, plugin);
            });

            if(argv.routers){
                var __routers = zn.deepEachObject(argv.routers, this.onLoading.bind(this));
                zn.extend(_relativeRouters, __routers);
                if(_path){
                    var _temp = {},
                        _index = _routers[_path] || _relativeRouters[_path];
                    _relativeRouters['/'] = _index;
                    _routers[_path] = _relativeRouters;
                }else {
                    _routers = _relativeRouters;
                    zn.extend(_routers, __routers);
                }
            }

            this._routers = _routers;
            this._relativeRouters = _relativeRouters;
            console.log(this._routers, this._relativeRouters);
            znui.util.Session.setHome(this.get('home'))
                            .setMain(this.get('main'))
                            .setBasePath(this.get('path'));
            zn.http.setHost(this.get('host'), this.get('port'));
        },
        onLoading: function (value){
            return value;
        },
        __getRenderView: function (){
            return this.render && this.render.call(this, this.gets());
        },
        update: function (view){
            var _Router = this.get('router');
            if(!_Router){
                _Router = znui.isMobile()?znui.react.WapRouter:znui.react.WebRouter;
            }

            if(!_Router){
                return alert('只适合手机版本打开!'), false;
            }

            var _view = view || this.__getRenderView()
                _container = this.get('container');
            _container = zn.type(_container)=='string'?document.getElementById(_container):_container;
            if(this.get('absolute')){
                _container.style.position = 'absolute';
                _container.style.width = '100%';
                _container.style.height = '100%';
            }
            if(znui.isMobile()){
                _container.classList.add('zr-mobile');
            }
            //require('react-dom').render(_view, _container)
            if(this.get('global')){
                _view = <div style={{width: '100%', height: '100%'}}>
                    {_view}
                    {this.get('global')}
                </div>;
            }
            setTimeout(()=>require('react-dom').render(_view, _container), 50);
        }
    }
});
