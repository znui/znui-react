(function(t,e){for(var n in e)t[n]=e[n]})(this,function(n){var i={};function r(t){if(i[t]){return i[t].exports}var e=i[t]={i:t,l:false,exports:{}};n[t].call(e.exports,e,e.exports,r);e.l=true;return e.exports}r.m=n;r.c=i;r.d=function(t,e,n){if(!r.o(t,e)){Object.defineProperty(t,e,{enumerable:true,get:n})}};r.r=function(t){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(t,"__esModule",{value:true})};r.t=function(e,t){if(t&1)e=r(e);if(t&8)return e;if(t&4&&typeof e==="object"&&e&&e.__esModule)return e;var n=Object.create(null);r.r(n);Object.defineProperty(n,"default",{enumerable:true,value:e});if(t&2&&typeof e!="string")for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n};r.n=function(e){var t=e&&e.__esModule?function t(){return e["default"]}:function t(){return e};r.d(t,"a",t);return t};r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)};r.p="";return r(r.s=4)}([function(t,e){(function(){t.exports=this["React"]})()},function(t,e,n){"use strict";var i=n(0);var r=n(8);if(typeof i==="undefined"){throw Error("create-react-class could not find the React object. If you are using script tags, "+"make sure that React is being loaded before create-react-class.")}var o=(new i.Component).updater;t.exports=r(i.Component,i.isValidElement,o)},,,function(t,e,n){t.exports=znui.react={Application:n(5),Ripple:n(7),getReact:function t(){var e=n(0);if(e&&!e.createClass){e.createClass=n(1)}return e},createClass:function t(e){return n(1).call(this.getReact,e)},classname:function t(){return znui.classname.apply(this,Array.prototype.slice.call(arguments))},style:function t(){var n={};zn.each(Array.prototype.slice.call(arguments),function(t,e){if(t){switch(zn.type(t)){case"object":zn.extend(n,t);break;case"array":zn.extend(n,this.style.apply(this,t));break;case"function":zn.extend(n,t.call(null)||{});break}}}.bind(this));return n}}},function(t,e,r){t.exports=zn.Class({statics:{create:function t(e){var n={},i={init:function t(e){this["super"](e);this.sets(e)}};zn.each(e,function(t,e){if(zn.type(t)=="function"&&!t.displayName){i[e]=t}else{n[e]=t}});var r=zn.Class(this,{methods:i,properties:n});return new r(n)}},properties:{container:"container",absolute:true,home:null,main:null,host:window.location.origin,router:null,global:null,plugins:[]},methods:{init:function t(e){this.sets(e);this.__initArgv(e);var n=this.onInit&&this.onInit.call(this,this.gets());if(n!==false){this.update(n)}},__initArgv:function t(e){var n={},i={},r=null,o=this.get("path"),a=this;this.get("plugins")&&this.get("plugins").forEach(function(t){if(zn.is(t,"string")){t=a.onLoading(t)}if(zn.is(t,"array")){zn.extend(n,t[1]);t=t[0]}zn.extend(i,t)});if(e.routers){var s=zn.deepEachObject(e.routers,this.onLoading.bind(this));zn.extend(i,s);if(o){var c={},u=n[o]||i[o];i["/"]=u;n[o]=i}else{n=i;zn.extend(n,s)}}this._routers=n;this._relativeRouters=i;console.log(this._routers,this._relativeRouters);znui.util.Session.setHome(this.get("home")).setMain(this.get("main")).setBasePath(this.get("path"));zn.http.setHost(this.get("host"),this.get("port"))},onLoading:function t(e){return e},__getRenderView:function t(){return this.render&&this.render.call(this,this.gets())},update:function t(e){var n=this.get("router");if(!n){n=znui.isMobile()?znui.react.WapRouter:znui.react.WebRouter}if(!n){return alert("只适合手机版本打开!"),false}var i=e||this.__getRenderView();_container=this.get("container");_container=zn.type(_container)=="string"?document.getElementById(_container):_container;if(this.get("absolute")){_container.style.position="absolute";_container.style.width="100%";_container.style.height="100%"}if(znui.isMobile()){_container.classList.add("zr-mobile")}if(this.get("global")){i=React.createElement("div",{style:{width:"100%",height:"100%"}},i,this.get("global"))}setTimeout(function(){return r(6).render(i,_container)},50)}}})},function(t,e){(function(){t.exports=this["ReactDOM"]})()},function(t,e){t.exports=zn.Class({methods:{init:function t(){document.addEventListener("click",this.__addRippleEffect.bind(this),false)},__addRippleEffect:function t(e){var n=e.target;if(!n.classList.contains("zr-action-ripple")){return false}var i=n.getBoundingClientRect(),r=n.querySelector(".zr-ripple");if(!r){r=document.createElement("span");r.className="zr-ripple";r.style.height=r.style.width=Math.max(i.width,i.height)+"px";n.appendChild(r)}r.classList.remove("show");var o=e.pageY-i.top-r.offsetHeight/2-document.body.scrollTop;var a=e.pageX-i.left-r.offsetWidth/2-document.body.scrollLeft;r.style.top=o+"px";r.style.left=a+"px";r.classList.add("show")}}})},function(t,e,n){"use strict";var b=n(9);var N=n(10);var D=n(11);if(false){var i}var M="mixins";function x(t){return t}var r;if(false){}else{r={}}function o(t,h,o){var n=[];var d={mixins:"DEFINE_MANY",statics:"DEFINE_MANY",propTypes:"DEFINE_MANY",contextTypes:"DEFINE_MANY",childContextTypes:"DEFINE_MANY",getDefaultProps:"DEFINE_MANY_MERGED",getInitialState:"DEFINE_MANY_MERGED",getChildContext:"DEFINE_MANY_MERGED",render:"DEFINE_ONCE",componentWillMount:"DEFINE_MANY",componentDidMount:"DEFINE_MANY",componentWillReceiveProps:"DEFINE_MANY",shouldComponentUpdate:"DEFINE_ONCE",componentWillUpdate:"DEFINE_MANY",componentDidUpdate:"DEFINE_MANY",componentWillUnmount:"DEFINE_MANY",UNSAFE_componentWillMount:"DEFINE_MANY",UNSAFE_componentWillReceiveProps:"DEFINE_MANY",UNSAFE_componentWillUpdate:"DEFINE_MANY",updateComponent:"OVERRIDE_BASE"};var s={getDerivedStateFromProps:"DEFINE_MANY_MERGED"};var y={displayName:function(t,e){t.displayName=e},mixins:function(t,e){if(e){for(var n=0;n<e.length;n++){i(t,e[n])}}},childContextTypes:function(t,e){if(false){}t.childContextTypes=b({},t.childContextTypes,e)},contextTypes:function(t,e){if(false){}t.contextTypes=b({},t.contextTypes,e)},getDefaultProps:function(t,e){if(t.getDefaultProps){t.getDefaultProps=v(t.getDefaultProps,e)}else{t.getDefaultProps=e}},propTypes:function(t,e){if(false){}t.propTypes=b({},t.propTypes,e)},statics:function(t,e){r(t,e)},autobind:function(){}};function e(t,e,n){for(var i in e){if(e.hasOwnProperty(i)){if(false){}}}}function m(t,e){var n=d.hasOwnProperty(e)?d[e]:null;if(p.hasOwnProperty(e)){D(n==="OVERRIDE_BASE","ReactClassInterface: You are attempting to override "+"`%s` from your class specification. Ensure that your method names "+"do not overlap with React methods.",e)}if(t){D(n==="DEFINE_MANY"||n==="DEFINE_MANY_MERGED","ReactClassInterface: You are attempting to define "+"`%s` on your component more than once. This conflict may be due "+"to a mixin.",e)}}function i(t,e){if(!e){if(false){var n,i}return}D(typeof e!=="function","ReactClass: You're attempting to "+"use a component class or function as a mixin. Instead, just use a "+"regular object.");D(!h(e),"ReactClass: You're attempting to "+"use a component as a mixin. Instead, just use a regular object.");var r=t.prototype;var o=r.__reactAutoBindPairs;if(e.hasOwnProperty(M)){y.mixins(t,e.mixins)}for(var a in e){if(!e.hasOwnProperty(a)){continue}if(a===M){continue}var s=e[a];var c=r.hasOwnProperty(a);m(c,a);if(y.hasOwnProperty(a)){y[a](t,s)}else{var u=d.hasOwnProperty(a);var l=typeof s==="function";var f=l&&!u&&!c&&e.autobind!==false;if(f){o.push(a,s);r[a]=s}else{if(c){var p=d[a];D(u&&(p==="DEFINE_MANY_MERGED"||p==="DEFINE_MANY"),"ReactClass: Unexpected spec policy %s for key %s "+"when mixing in component specs.",p,a);if(p==="DEFINE_MANY_MERGED"){r[a]=v(r[a],s)}else if(p==="DEFINE_MANY"){r[a]=g(r[a],s)}}else{r[a]=s;if(false){}}}}}}function r(t,e){if(!e){return}for(var n in e){var i=e[n];if(!e.hasOwnProperty(n)){continue}var r=n in y;D(!r,"ReactClass: You are attempting to define a reserved "+'property, `%s`, that shouldn\'t be on the "statics" key. Define it '+"as an instance property instead; it will still be accessible on the "+"constructor.",n);var o=n in t;if(o){var a=s.hasOwnProperty(n)?s[n]:null;D(a==="DEFINE_MANY_MERGED","ReactClass: You are attempting to define "+"`%s` on your component more than once. This conflict may be "+"due to a mixin.",n);t[n]=v(t[n],i);return}t[n]=i}}function a(t,e){D(t&&e&&typeof t==="object"&&typeof e==="object","mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.");for(var n in e){if(e.hasOwnProperty(n)){D(t[n]===undefined,"mergeIntoWithNoDuplicateKeys(): "+"Tried to merge two objects with the same key: `%s`. This conflict "+"may be due to a mixin; in particular, this may be caused by two "+"getInitialState() or getDefaultProps() methods returning objects "+"with clashing keys.",n);t[n]=e[n]}}return t}function v(r,o){return function t(){var e=r.apply(this,arguments);var n=o.apply(this,arguments);if(e==null){return n}else if(n==null){return e}var i={};a(i,e);a(i,n);return i}}function g(e,n){return function t(){e.apply(this,arguments);n.apply(this,arguments)}}function c(t,e){var n=e.bind(t);if(false){var i,r}return n}function u(t){var e=t.__reactAutoBindPairs;for(var n=0;n<e.length;n+=2){var i=e[n];var r=e[n+1];t[i]=c(t,r)}}var l={componentDidMount:function(){this.__isMounted=true}};var f={componentWillUnmount:function(){this.__isMounted=false}};var p={replaceState:function(t,e){this.updater.enqueueReplaceState(this,t,e)},isMounted:function(){if(false){}return!!this.__isMounted}};var E=function(){};b(E.prototype,t.prototype,p);function _(t){var r=x(function(t,e,n){if(false){}if(this.__reactAutoBindPairs.length){u(this)}this.props=t;this.context=e;this.refs=N;this.updater=n||o;this.state=null;var i=this.getInitialState?this.getInitialState():null;if(false){}D(typeof i==="object"&&!Array.isArray(i),"%s.getInitialState(): must return an object or null",r.displayName||"ReactCompositeComponent");this.state=i});r.prototype=new E;r.prototype.constructor=r;r.prototype.__reactAutoBindPairs=[];n.forEach(i.bind(null,r));i(r,l);i(r,t);i(r,f);if(r.getDefaultProps){r.defaultProps=r.getDefaultProps()}if(false){}D(r.prototype.render,"createClass(...): Class specification must implement a `render` method.");if(false){}for(var e in d){if(!r.prototype[e]){r.prototype[e]=null}}return r}return _}t.exports=o},function(t,e,n){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var c=Object.getOwnPropertySymbols;var u=Object.prototype.hasOwnProperty;var l=Object.prototype.propertyIsEnumerable;function f(t){if(t===null||t===undefined){throw new TypeError("Object.assign cannot be called with null or undefined")}return Object(t)}function i(){try{if(!Object.assign){return false}var t=new String("abc");t[5]="de";if(Object.getOwnPropertyNames(t)[0]==="5"){return false}var e={};for(var n=0;n<10;n++){e["_"+String.fromCharCode(n)]=n}var i=Object.getOwnPropertyNames(e).map(function(t){return e[t]});if(i.join("")!=="0123456789"){return false}var r={};"abcdefghijklmnopqrst".split("").forEach(function(t){r[t]=t});if(Object.keys(Object.assign({},r)).join("")!=="abcdefghijklmnopqrst"){return false}return true}catch(t){return false}}t.exports=i()?Object.assign:function(t,e){var n;var i=f(t);var r;for(var o=1;o<arguments.length;o++){n=Object(arguments[o]);for(var a in n){if(u.call(n,a)){i[a]=n[a]}}if(c){r=c(n);for(var s=0;s<r.length;s++){if(l.call(n,r[s])){i[r[s]]=n[r[s]]}}}}return i}},function(t,e,n){"use strict";var i={};if(false){}t.exports=i},function(t,e,n){"use strict";var f=function t(e){};if(false){}function i(t,e,n,i,r,o,a,s){f(e);if(!t){var c;if(e===undefined){c=new Error("Minified exception occurred; use the non-minified dev environment "+"for the full error message and additional helpful warnings.")}else{var u=[n,i,r,o,a,s];var l=0;c=new Error(e.replace(/%s/g,function(){return u[l++]}));c.name="Invariant Violation"}c.framesToPop=1;throw c}}t.exports=i}]));