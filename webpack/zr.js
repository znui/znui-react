var __toString__ = Object.prototype.toString;
module.exports = {
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