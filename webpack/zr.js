var __toString__ = Object.prototype.toString;
module.exports = {
    path: function (target, path, value) {
        var _result = target||{};
        if (path) {
            var _tokens = path.split('.'),
                _token,
                _len = _tokens.length,
                i = 0;

            if (arguments.length < 3) {
                for (; _result && i < _len; i++) {
                    _token = _tokens[i];
                    if (_result.__get__) {
                        _result = _result.__get__(_token);
                    } else {
                        _result = _result[_token];
                    }
                }
            } else {
                _len -= 1;
                for (; _result && i < _len; i++) {
                    _token = _tokens[i];
                    if (_result.__get__) {
                        _result = _result.__get__(_token);
                    } else {
                        _result = _result[_token] = _result[_token] || {};
                    }
                }

                _token = _tokens[i];
                if (_result) {
                    if (_result.__set__) {
                        _result.__set__(_token, value);
                    } else {
                        _result[_token] = value;
                    }

                    _result = value;
                }
            }
        }

        return _result;
    },
    format: function (template, data, options){
        if(!template){
            return template;
        }
        var _match = null,
            _template = escape(template),
            _options = this.deepAssign({ prefix:'${', suffix: '}' }, options),
            _regexp = escape(_options.prefix) + '([^%>]+)?' + escape(_options.suffix),
            _reg = new RegExp(_regexp, 'i');
    
        while(_match = _reg.exec(_template)) {
            _template = _template.replace(_reg, this.path(data, _match[1].trim()));
        }
    
        return unescape(_template);
    },
    overwrite: function (target){
        var _target = target||{};
        for(var i = 1, _len = arguments.length; i < _len; i++){
            var _args = arguments[i];
            for(var _key in _args){
                if(_args.hasOwnProperty(_key) && _args[_key]!==undefined){
                    _target[_key] = _args[_key];
                }
            }
        }
    
        return _target;
    },
    deepAssign: function (target, source){
        var _tvalue = null,
            _svalue = null;
        switch(__toString__.call(source)){
            case "[object Object]":    
                for(var key in source){
                    _tvalue = target[key];
                    _svalue = source[key];
        
                    switch(__toString__.call(_svalue)) {
                        case "[object Object]":
                            if(__toString__.call(_tvalue) == "[object Object]"){
                                target[key] = this.deepAssign(_tvalue, _svalue);
                            } else {
                                target[key] = _svalue;
                            }
                            break;
                        case "[object Array]":
                            if(__toString__.call(_tvalue) == "[object Array]"){
                                target[key] = target[key].concat(_svalue);
                            } else {
                                target[key] = _svalue;
                            }
                            break;
                        case "[object Null]":
                        case "[object Boolean]":
                        case "[object Function]":
                        case "[object Number]":
                        case "[object String]":
                            target[key] = _svalue;
                            break;
                        case "[object Undefined]":
                        default:
                            break;
                    }
                }
                break;
            case "[object Array]":    
                source.unshift(target);
                this.deepExtend.apply(this, source);
                break;
        }
        
        return target;
    },
    deepExtend: function (){
        var _target = arguments[0];
        for(var i = 1, _len = arguments.length; i < _len; i++){
            this.deepAssign(_target, arguments[i]);
        }

        return _target;
    }
};