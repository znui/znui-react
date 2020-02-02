(function(e,t){for(var n in t)e[n]=t[n]})(this,function(n){var r={};function i(e){if(r[e]){return r[e].exports}var t=r[e]={i:e,l:false,exports:{}};n[e].call(t.exports,t,t.exports,i);t.l=true;return t.exports}i.m=n;i.c=r;i.d=function(e,t,n){if(!i.o(e,t)){Object.defineProperty(e,t,{enumerable:true,get:n})}};i.r=function(e){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(e,"__esModule",{value:true})};i.t=function(t,e){if(e&1)t=i(t);if(e&8)return t;if(e&4&&typeof t==="object"&&t&&t.__esModule)return t;var n=Object.create(null);i.r(n);Object.defineProperty(n,"default",{enumerable:true,value:t});if(e&2&&typeof t!="string")for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n};i.n=function(t){var e=t&&t.__esModule?function e(){return t["default"]}:function e(){return t};i.d(e,"a",e);return e};i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};i.p="";return i(i.s=11)}([function(e,t,n){"use strict";var o=n(3);var r=n(19);var i=Object.prototype.toString;function s(e){return i.call(e)==="[object Array]"}function a(e){return i.call(e)==="[object ArrayBuffer]"}function u(e){return typeof FormData!=="undefined"&&e instanceof FormData}function c(e){var t;if(typeof ArrayBuffer!=="undefined"&&ArrayBuffer.isView){t=ArrayBuffer.isView(e)}else{t=e&&e.buffer&&e.buffer instanceof ArrayBuffer}return t}function f(e){return typeof e==="string"}function l(e){return typeof e==="number"}function p(e){return typeof e==="undefined"}function h(e){return e!==null&&typeof e==="object"}function d(e){return i.call(e)==="[object Date]"}function m(e){return i.call(e)==="[object File]"}function v(e){return i.call(e)==="[object Blob]"}function g(e){return i.call(e)==="[object Function]"}function y(e){return h(e)&&g(e.pipe)}function _(e){return typeof URLSearchParams!=="undefined"&&e instanceof URLSearchParams}function E(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function b(){if(typeof navigator!=="undefined"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")){return false}return typeof window!=="undefined"&&typeof document!=="undefined"}function w(e,t){if(e===null||typeof e==="undefined"){return}if(typeof e!=="object"){e=[e]}if(s(e)){for(var n=0,r=e.length;n<r;n++){t.call(null,e[n],n,e)}}else{for(var i in e){if(Object.prototype.hasOwnProperty.call(e,i)){t.call(null,e[i],i,e)}}}}function x(){var n={};function e(e,t){if(typeof n[t]==="object"&&typeof e==="object"){n[t]=x(n[t],e)}else{n[t]=e}}for(var t=0,r=arguments.length;t<r;t++){w(arguments[t],e)}return n}function N(){var n={};function e(e,t){if(typeof n[t]==="object"&&typeof e==="object"){n[t]=N(n[t],e)}else if(typeof e==="object"){n[t]=N({},e)}else{n[t]=e}}for(var t=0,r=arguments.length;t<r;t++){w(arguments[t],e)}return n}function R(r,e,i){w(e,function e(t,n){if(i&&typeof t==="function"){r[n]=o(t,i)}else{r[n]=t}});return r}e.exports={isArray:s,isArrayBuffer:a,isBuffer:r,isFormData:u,isArrayBufferView:c,isString:f,isNumber:l,isObject:h,isUndefined:p,isDate:d,isFile:m,isBlob:v,isFunction:g,isStream:y,isURLSearchParams:_,isStandardBrowserEnv:b,forEach:w,merge:x,deepMerge:N,extend:R,trim:E}},function(e,t){(function(){e.exports=this["React"]})()},function(e,t){(function(){e.exports=this["ReactDOM"]})()},function(e,t,n){"use strict";e.exports=function e(r,i){return function e(){var t=new Array(arguments.length);for(var n=0;n<t.length;n++){t[n]=arguments[n]}return r.apply(i,t)}}},function(e,t,n){"use strict";var a=n(0);function u(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function e(t,n,r){if(!n){return t}var i;if(r){i=r(n)}else if(a.isURLSearchParams(n)){i=n.toString()}else{var o=[];a.forEach(n,function e(t,n){if(t===null||typeof t==="undefined"){return}if(a.isArray(t)){n=n+"[]"}else{t=[t]}a.forEach(t,function e(t){if(a.isDate(t)){t=t.toISOString()}else if(a.isObject(t)){t=JSON.stringify(t)}o.push(u(n)+"="+u(t))})});i=o.join("&")}if(i){var s=t.indexOf("#");if(s!==-1){t=t.slice(0,s)}t+=(t.indexOf("?")===-1?"?":"&")+i}return t}},function(e,t,n){"use strict";e.exports=function e(t){return!!(t&&t.__CANCEL__)}},function(a,e,u){"use strict";(function(t){var r=u(0);var i=u(25);var n={"Content-Type":"application/x-www-form-urlencoded"};function o(e,t){if(!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])){e["Content-Type"]=t}}function e(){var e;if(typeof t!=="undefined"&&Object.prototype.toString.call(t)==="[object process]"){e=u(7)}else if(typeof XMLHttpRequest!=="undefined"){e=u(7)}return e}var s={adapter:e(),transformRequest:[function e(t,n){i(n,"Accept");i(n,"Content-Type");if(r.isFormData(t)||r.isArrayBuffer(t)||r.isBuffer(t)||r.isStream(t)||r.isFile(t)||r.isBlob(t)){return t}if(r.isArrayBufferView(t)){return t.buffer}if(r.isURLSearchParams(t)){o(n,"application/x-www-form-urlencoded;charset=utf-8");return t.toString()}if(r.isObject(t)){o(n,"application/json;charset=utf-8");return JSON.stringify(t)}return t}],transformResponse:[function e(t){if(typeof t==="string"){try{t=JSON.parse(t)}catch(e){}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function e(t){return t>=200&&t<300}};s.headers={common:{Accept:"application/json, text/plain, */*"}};r.forEach(["delete","get","head"],function e(t){s.headers[t]={}});r.forEach(["post","put","patch"],function e(t){s.headers[t]=r.merge(n)});a.exports=s}).call(this,u(24))},function(e,t,l){"use strict";var p=l(0);var h=l(26);var d=l(4);var m=l(28);var v=l(29);var g=l(8);e.exports=function e(f){return new Promise(function e(i,o){var r=f.data;var s=f.headers;if(p.isFormData(r)){delete s["Content-Type"]}var a=new XMLHttpRequest;if(f.auth){var t=f.auth.username||"";var n=f.auth.password||"";s.Authorization="Basic "+btoa(t+":"+n)}a.open(f.method.toUpperCase(),d(f.url,f.params,f.paramsSerializer),true);a.timeout=f.timeout;a.onreadystatechange=function e(){if(!a||a.readyState!==4){return}if(a.status===0&&!(a.responseURL&&a.responseURL.indexOf("file:")===0)){return}var t="getAllResponseHeaders"in a?m(a.getAllResponseHeaders()):null;var n=!f.responseType||f.responseType==="text"?a.responseText:a.response;var r={data:n,status:a.status,statusText:a.statusText,headers:t,config:f,request:a};h(i,o,r);a=null};a.onabort=function e(){if(!a){return}o(g("Request aborted",f,"ECONNABORTED",a));a=null};a.onerror=function e(){o(g("Network Error",f,null,a));a=null};a.ontimeout=function e(){o(g("timeout of "+f.timeout+"ms exceeded",f,"ECONNABORTED",a));a=null};if(p.isStandardBrowserEnv()){var u=l(30);var c=(f.withCredentials||v(f.url))&&f.xsrfCookieName?u.read(f.xsrfCookieName):undefined;if(c){s[f.xsrfHeaderName]=c}}if("setRequestHeader"in a){p.forEach(s,function e(t,n){if(typeof r==="undefined"&&n.toLowerCase()==="content-type"){delete s[n]}else{a.setRequestHeader(n,t)}})}if(f.withCredentials){a.withCredentials=true}if(f.responseType){try{a.responseType=f.responseType}catch(e){if(f.responseType!=="json"){throw e}}}if(typeof f.onDownloadProgress==="function"){a.addEventListener("progress",f.onDownloadProgress)}if(typeof f.onUploadProgress==="function"&&a.upload){a.upload.addEventListener("progress",f.onUploadProgress)}if(f.cancelToken){f.cancelToken.promise.then(function e(t){if(!a){return}a.abort();o(t);a=null})}if(r===undefined){r=null}a.send(r)})}},function(e,t,n){"use strict";var a=n(27);e.exports=function e(t,n,r,i,o){var s=new Error(t);return a(s,n,r,i,o)}},function(e,t,n){"use strict";var o=n(0);e.exports=function e(n,r){r=r||{};var i={};o.forEach(["url","method","params","data"],function e(t){if(typeof r[t]!=="undefined"){i[t]=r[t]}});o.forEach(["headers","auth","proxy"],function e(t){if(o.isObject(r[t])){i[t]=o.deepMerge(n[t],r[t])}else if(typeof r[t]!=="undefined"){i[t]=r[t]}else if(o.isObject(n[t])){i[t]=o.deepMerge(n[t])}else if(typeof n[t]!=="undefined"){i[t]=n[t]}});o.forEach(["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"],function e(t){if(typeof r[t]!=="undefined"){i[t]=r[t]}else if(typeof n[t]!=="undefined"){i[t]=n[t]}});return i}},function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function e(){return"Cancel"+(this.message?": "+this.message:"")};r.prototype.__CANCEL__=true;e.exports=r},function(e,t,n){var r=n(1);var i=n(2);var o=n(12);if(r&&o&&!r.createClass){r.createClass=o}znui.React=r;znui.ReactDOM=i;znui.axios=zn.data.zncaller=n(17);e.exports=znui.react={Application:n(35),DataView:n(36),config:{__zr__:{},set:function e(t,n){return this.__zr__["__"+t+"__"]=n,this},sets:function e(t){for(var n in t){this.set(n,t[n])}return this},get:function e(t){return this.__zr__["__"+t+"__"]}},fixCreateReactClass:function e(t,n){if(t&&n&&!t.createClass){t.createClass=n}return znui.React=t,t},fixReactCreateClass:function e(t){var n=t||n;if(n){if(!n.createClass){n.createClass=o}if(n.createClass){return znui.React=n,n}else{throw new Error("create-react-class is not exist.")}}else{throw new Error("react is not exist.")}},registerComponent:function e(t,n){if(this[t]){throw new Error("znui.react."+t+" is exist.")}var o=n||{enableDisplayName:true};var r=zn.Class({static:true,properties:{},methods:{init:function e(){this.__components__=components||{};this.__config__={}},register:function e(){var t=arguments,n=t.length,r=null,i=null;if(n==1){i=t[0];r=i.displayName}else{i=t[0];r=t[1];if(o.enableDisplayName){r=i.displayName}}if(this[r]){throw new Error("The key "+r+" is exist.")}this.__components__[r]=i;this[r]=i;return this},registers:function e(t){if(zn.is(t,"array")){t.forEach(function(e){this.register(e)}.bind(this))}else if(zn.is(t,"object")){for(var n in t){this.register(t[n],n)}}else if(zn.is(t,"function")){this.register(t.call())}return this},resolve:function e(t){return this.__components__[t]},setConfig:function e(t,n){return this.__config__[t]=n},getConfig:function e(t){return this.__config__[t]},components:function e(){return this.__components__},keys:function e(){return Object.keys(this.__components__)}}});return this[t]=r,r},initRegister:function e(n){if(n){n.__data__={};n.register=function(e,t){return n.__data__[e]=t,n};n.resolve=function(e){return n.__data__[e]}}return this},destroyRegister:function e(t){if(t){t.__data__=null;delete t.__data__;t.register=null;delete t.register;t.resolve=null;delete t.resolve}return this},createClass:function e(t){if(znui.React){return znui.React.createClass.call(znui.React,t)}else{if(r&&r.createClass){return r.createClass.call(r,t)}else{throw new Error("react or createClass is not exist.")}}},classname:function e(){return znui.classname.apply(this,Array.prototype.slice.call(arguments))},style:function e(){var n={};zn.each(Array.prototype.slice.call(arguments),function(e,t){if(e){switch(zn.type(e)){case"object":zn.extend(n,e);break;case"array":zn.extend(n,this.style.apply(this,e));break;case"function":zn.extend(n,e.call(null)||{});break}}}.bind(this));return n}}},function(e,t,n){"use strict";var r=n(1);var i=n(13);if(typeof r==="undefined"){throw Error("create-react-class could not find the React object. If you are using script tags, "+"make sure that React is being loaded before create-react-class.")}var o=(new r.Component).updater;e.exports=i(r.Component,r.isValidElement,o)},function(e,t,n){"use strict";var b=n(14);var w=n(15);var x=n(16);if(false){var r}var N="mixins";function R(e){return e}var i;if(false){}else{i={}}function o(e,h,o){var n=[];var d={mixins:"DEFINE_MANY",statics:"DEFINE_MANY",propTypes:"DEFINE_MANY",contextTypes:"DEFINE_MANY",childContextTypes:"DEFINE_MANY",getDefaultProps:"DEFINE_MANY_MERGED",getInitialState:"DEFINE_MANY_MERGED",getChildContext:"DEFINE_MANY_MERGED",render:"DEFINE_ONCE",componentWillMount:"DEFINE_MANY",componentDidMount:"DEFINE_MANY",componentWillReceiveProps:"DEFINE_MANY",shouldComponentUpdate:"DEFINE_ONCE",componentWillUpdate:"DEFINE_MANY",componentDidUpdate:"DEFINE_MANY",componentWillUnmount:"DEFINE_MANY",UNSAFE_componentWillMount:"DEFINE_MANY",UNSAFE_componentWillReceiveProps:"DEFINE_MANY",UNSAFE_componentWillUpdate:"DEFINE_MANY",updateComponent:"OVERRIDE_BASE"};var a={getDerivedStateFromProps:"DEFINE_MANY_MERGED"};var m={displayName:function(e,t){e.displayName=t},mixins:function(e,t){if(t){for(var n=0;n<t.length;n++){r(e,t[n])}}},childContextTypes:function(e,t){if(false){}e.childContextTypes=b({},e.childContextTypes,t)},contextTypes:function(e,t){if(false){}e.contextTypes=b({},e.contextTypes,t)},getDefaultProps:function(e,t){if(e.getDefaultProps){e.getDefaultProps=g(e.getDefaultProps,t)}else{e.getDefaultProps=t}},propTypes:function(e,t){if(false){}e.propTypes=b({},e.propTypes,t)},statics:function(e,t){i(e,t)},autobind:function(){}};function t(e,t,n){for(var r in t){if(t.hasOwnProperty(r)){if(false){}}}}function v(e,t){var n=d.hasOwnProperty(t)?d[t]:null;if(p.hasOwnProperty(t)){x(n==="OVERRIDE_BASE","ReactClassInterface: You are attempting to override "+"`%s` from your class specification. Ensure that your method names "+"do not overlap with React methods.",t)}if(e){x(n==="DEFINE_MANY"||n==="DEFINE_MANY_MERGED","ReactClassInterface: You are attempting to define "+"`%s` on your component more than once. This conflict may be due "+"to a mixin.",t)}}function r(e,t){if(!t){if(false){var n,r}return}x(typeof t!=="function","ReactClass: You're attempting to "+"use a component class or function as a mixin. Instead, just use a "+"regular object.");x(!h(t),"ReactClass: You're attempting to "+"use a component as a mixin. Instead, just use a regular object.");var i=e.prototype;var o=i.__reactAutoBindPairs;if(t.hasOwnProperty(N)){m.mixins(e,t.mixins)}for(var s in t){if(!t.hasOwnProperty(s)){continue}if(s===N){continue}var a=t[s];var u=i.hasOwnProperty(s);v(u,s);if(m.hasOwnProperty(s)){m[s](e,a)}else{var c=d.hasOwnProperty(s);var f=typeof a==="function";var l=f&&!c&&!u&&t.autobind!==false;if(l){o.push(s,a);i[s]=a}else{if(u){var p=d[s];x(c&&(p==="DEFINE_MANY_MERGED"||p==="DEFINE_MANY"),"ReactClass: Unexpected spec policy %s for key %s "+"when mixing in component specs.",p,s);if(p==="DEFINE_MANY_MERGED"){i[s]=g(i[s],a)}else if(p==="DEFINE_MANY"){i[s]=y(i[s],a)}}else{i[s]=a;if(false){}}}}}}function i(e,t){if(!t){return}for(var n in t){var r=t[n];if(!t.hasOwnProperty(n)){continue}var i=n in m;x(!i,"ReactClass: You are attempting to define a reserved "+'property, `%s`, that shouldn\'t be on the "statics" key. Define it '+"as an instance property instead; it will still be accessible on the "+"constructor.",n);var o=n in e;if(o){var s=a.hasOwnProperty(n)?a[n]:null;x(s==="DEFINE_MANY_MERGED","ReactClass: You are attempting to define "+"`%s` on your component more than once. This conflict may be "+"due to a mixin.",n);e[n]=g(e[n],r);return}e[n]=r}}function s(e,t){x(e&&t&&typeof e==="object"&&typeof t==="object","mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.");for(var n in t){if(t.hasOwnProperty(n)){x(e[n]===undefined,"mergeIntoWithNoDuplicateKeys(): "+"Tried to merge two objects with the same key: `%s`. This conflict "+"may be due to a mixin; in particular, this may be caused by two "+"getInitialState() or getDefaultProps() methods returning objects "+"with clashing keys.",n);e[n]=t[n]}}return e}function g(i,o){return function e(){var t=i.apply(this,arguments);var n=o.apply(this,arguments);if(t==null){return n}else if(n==null){return t}var r={};s(r,t);s(r,n);return r}}function y(t,n){return function e(){t.apply(this,arguments);n.apply(this,arguments)}}function u(e,t){var n=t.bind(e);if(false){var r,i}return n}function c(e){var t=e.__reactAutoBindPairs;for(var n=0;n<t.length;n+=2){var r=t[n];var i=t[n+1];e[r]=u(e,i)}}var f={componentDidMount:function(){this.__isMounted=true}};var l={componentWillUnmount:function(){this.__isMounted=false}};var p={replaceState:function(e,t){this.updater.enqueueReplaceState(this,e,t)},isMounted:function(){if(false){}return!!this.__isMounted}};var _=function(){};b(_.prototype,e.prototype,p);function E(e){var i=R(function(e,t,n){if(false){}if(this.__reactAutoBindPairs.length){c(this)}this.props=e;this.context=t;this.refs=w;this.updater=n||o;this.state=null;var r=this.getInitialState?this.getInitialState():null;if(false){}x(typeof r==="object"&&!Array.isArray(r),"%s.getInitialState(): must return an object or null",i.displayName||"ReactCompositeComponent");this.state=r});i.prototype=new _;i.prototype.constructor=i;i.prototype.__reactAutoBindPairs=[];n.forEach(r.bind(null,i));r(i,f);r(i,e);r(i,l);if(i.getDefaultProps){i.defaultProps=i.getDefaultProps()}if(false){}x(i.prototype.render,"createClass(...): Class specification must implement a `render` method.");if(false){}for(var t in d){if(!i.prototype[t]){i.prototype[t]=null}}return i}return E}e.exports=o},function(e,t,n){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var u=Object.getOwnPropertySymbols;var c=Object.prototype.hasOwnProperty;var f=Object.prototype.propertyIsEnumerable;function l(e){if(e===null||e===undefined){throw new TypeError("Object.assign cannot be called with null or undefined")}return Object(e)}function r(){try{if(!Object.assign){return false}var e=new String("abc");e[5]="de";if(Object.getOwnPropertyNames(e)[0]==="5"){return false}var t={};for(var n=0;n<10;n++){t["_"+String.fromCharCode(n)]=n}var r=Object.getOwnPropertyNames(t).map(function(e){return t[e]});if(r.join("")!=="0123456789"){return false}var i={};"abcdefghijklmnopqrst".split("").forEach(function(e){i[e]=e});if(Object.keys(Object.assign({},i)).join("")!=="abcdefghijklmnopqrst"){return false}return true}catch(e){return false}}e.exports=r()?Object.assign:function(e,t){var n;var r=l(e);var i;for(var o=1;o<arguments.length;o++){n=Object(arguments[o]);for(var s in n){if(c.call(n,s)){r[s]=n[s]}}if(u){i=u(n);for(var a=0;a<i.length;a++){if(f.call(n,i[a])){r[i[a]]=n[i[a]]}}}}return r}},function(e,t,n){"use strict";var r={};if(false){}e.exports=r},function(e,t,n){"use strict";var l=function e(t){};if(false){}function r(e,t,n,r,i,o,s,a){l(t);if(!e){var u;if(t===undefined){u=new Error("Minified exception occurred; use the non-minified dev environment "+"for the full error message and additional helpful warnings.")}else{var c=[n,r,i,o,s,a];var f=0;u=new Error(t.replace(/%s/g,function(){return c[f++]}));u.name="Invariant Violation"}u.framesToPop=1;throw u}}e.exports=r},function(e,t,n){e.exports=n(18)},function(e,t,n){"use strict";var r=n(0);var i=n(3);var o=n(20);var s=n(9);var a=n(6);function u(e){var t=new o(e);var n=i(o.prototype.request,t);r.extend(n,o.prototype,t);r.extend(n,t);return n}var c=u(a);c.Axios=o;c.create=function e(t){return u(s(c.defaults,t))};c.Cancel=n(10);c.CancelToken=n(33);c.isCancel=n(5);c.all=function e(t){return Promise.all(t)};c.spread=n(34);e.exports=c;e.exports.default=c},function(e,t){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function e(t){return t!=null&&t.constructor!=null&&typeof t.constructor.isBuffer==="function"&&t.constructor.isBuffer(t)}},function(e,t,n){"use strict";var i=n(0);var r=n(4);var o=n(21);var s=n(22);var a=n(9);function u(e){this.defaults=e;this.interceptors={request:new o,response:new o}}u.prototype.request=function e(t){if(typeof t==="string"){t=arguments[1]||{};t.url=arguments[0]}else{t=t||{}}t=a(this.defaults,t);t.method=t.method?t.method.toLowerCase():"get";var n=[s,undefined];var r=Promise.resolve(t);this.interceptors.request.forEach(function e(t){n.unshift(t.fulfilled,t.rejected)});this.interceptors.response.forEach(function e(t){n.push(t.fulfilled,t.rejected)});while(n.length){r=r.then(n.shift(),n.shift())}return r};u.prototype.getUri=function e(t){t=a(this.defaults,t);return r(t.url,t.params,t.paramsSerializer).replace(/^\?/,"")};i.forEach(["delete","get","head","options"],function e(n){u.prototype[n]=function(e,t){return this.request(i.merge(t||{},{method:n,url:e}))}});i.forEach(["post","put","patch"],function e(r){u.prototype[r]=function(e,t,n){return this.request(i.merge(n||{},{method:r,url:e,data:t}))}});e.exports=u},function(e,t,n){"use strict";var r=n(0);function i(){this.handlers=[]}i.prototype.use=function e(t,n){this.handlers.push({fulfilled:t,rejected:n});return this.handlers.length-1};i.prototype.eject=function e(t){if(this.handlers[t]){this.handlers[t]=null}};i.prototype.forEach=function e(n){r.forEach(this.handlers,function e(t){if(t!==null){n(t)}})};e.exports=i},function(e,t,n){"use strict";var r=n(0);var i=n(23);var o=n(5);var s=n(6);var a=n(31);var u=n(32);function c(e){if(e.cancelToken){e.cancelToken.throwIfRequested()}}e.exports=function e(n){c(n);if(n.baseURL&&!a(n.url)){n.url=u(n.baseURL,n.url)}n.headers=n.headers||{};n.data=i(n.data,n.headers,n.transformRequest);n.headers=r.merge(n.headers.common||{},n.headers[n.method]||{},n.headers||{});r.forEach(["delete","get","head","post","put","patch","common"],function e(t){delete n.headers[t]});var t=n.adapter||s.adapter;return t(n).then(function e(t){c(n);t.data=i(t.data,t.headers,n.transformResponse);return t},function e(t){if(!o(t)){c(n);if(t&&t.response){t.response.data=i(t.response.data,t.response.headers,n.transformResponse)}}return Promise.reject(t)})}},function(e,t,n){"use strict";var i=n(0);e.exports=function e(n,r,t){i.forEach(t,function e(t){n=t(n,r)});return n}},function(e,t){var n=e.exports={};var r;var i;function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}(function(){try{if(typeof setTimeout==="function"){r=setTimeout}else{r=o}}catch(e){r=o}try{if(typeof clearTimeout==="function"){i=clearTimeout}else{i=s}}catch(e){i=s}})();function a(t){if(r===setTimeout){return setTimeout(t,0)}if((r===o||!r)&&setTimeout){r=setTimeout;return setTimeout(t,0)}try{return r(t,0)}catch(e){try{return r.call(null,t,0)}catch(e){return r.call(this,t,0)}}}function u(t){if(i===clearTimeout){return clearTimeout(t)}if((i===s||!i)&&clearTimeout){i=clearTimeout;return clearTimeout(t)}try{return i(t)}catch(e){try{return i.call(null,t)}catch(e){return i.call(this,t)}}}var c=[];var f=false;var l;var p=-1;function h(){if(!f||!l){return}f=false;if(l.length){c=l.concat(c)}else{p=-1}if(c.length){d()}}function d(){if(f){return}var e=a(h);f=true;var t=c.length;while(t){l=c;c=[];while(++p<t){if(l){l[p].run()}}p=-1;t=c.length}l=null;f=false;u(e)}n.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1){for(var n=1;n<arguments.length;n++){t[n-1]=arguments[n]}}c.push(new m(e,t));if(c.length===1&&!f){a(d)}};function m(e,t){this.fun=e;this.array=t}m.prototype.run=function(){this.fun.apply(null,this.array)};n.title="browser";n.browser=true;n.env={};n.argv=[];n.version="";n.versions={};function v(){}n.on=v;n.addListener=v;n.once=v;n.off=v;n.removeListener=v;n.removeAllListeners=v;n.emit=v;n.prependListener=v;n.prependOnceListener=v;n.listeners=function(e){return[]};n.binding=function(e){throw new Error("process.binding is not supported")};n.cwd=function(){return"/"};n.chdir=function(e){throw new Error("process.chdir is not supported")};n.umask=function(){return 0}},function(e,t,n){"use strict";var o=n(0);e.exports=function e(r,i){o.forEach(r,function e(t,n){if(n!==i&&n.toUpperCase()===i.toUpperCase()){r[i]=t;delete r[n]}})}},function(e,t,n){"use strict";var o=n(8);e.exports=function e(t,n,r){var i=r.config.validateStatus;if(!i||i(r.status)){t(r)}else{n(o("Request failed with status code "+r.status,r.config,null,r.request,r))}}},function(e,t,n){"use strict";e.exports=function e(t,n,r,i,o){t.config=n;if(r){t.code=r}t.request=i;t.response=o;t.isAxiosError=true;t.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}};return t}},function(e,t,n){"use strict";var s=n(0);var a=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function e(t){var n={};var r;var i;var o;if(!t){return n}s.forEach(t.split("\n"),function e(t){o=t.indexOf(":");r=s.trim(t.substr(0,o)).toLowerCase();i=s.trim(t.substr(o+1));if(r){if(n[r]&&a.indexOf(r)>=0){return}if(r==="set-cookie"){n[r]=(n[r]?n[r]:[]).concat([i])}else{n[r]=n[r]?n[r]+", "+i:i}}});return n}},function(e,t,n){"use strict";var s=n(0);e.exports=s.isStandardBrowserEnv()?function e(){var n=/(msie|trident)/i.test(navigator.userAgent);var r=document.createElement("a");var i;function o(e){var t=e;if(n){r.setAttribute("href",t);t=r.href}r.setAttribute("href",t);return{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:r.pathname.charAt(0)==="/"?r.pathname:"/"+r.pathname}}i=o(window.location.href);return function e(t){var n=s.isString(t)?o(t):t;return n.protocol===i.protocol&&n.host===i.host}}():function e(){return function e(){return true}}()},function(e,t,n){"use strict";var u=n(0);e.exports=u.isStandardBrowserEnv()?function e(){return{write:function e(t,n,r,i,o,s){var a=[];a.push(t+"="+encodeURIComponent(n));if(u.isNumber(r)){a.push("expires="+new Date(r).toGMTString())}if(u.isString(i)){a.push("path="+i)}if(u.isString(o)){a.push("domain="+o)}if(s===true){a.push("secure")}document.cookie=a.join("; ")},read:function e(t){var n=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return n?decodeURIComponent(n[3]):null},remove:function e(t){this.write(t,"",Date.now()-864e5)}}}():function e(){return{write:function e(){},read:function e(){return null},remove:function e(){}}}()},function(e,t,n){"use strict";e.exports=function e(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)}},function(e,t,n){"use strict";e.exports=function e(t,n){return n?t.replace(/\/+$/,"")+"/"+n.replace(/^\/+/,""):t}},function(e,t,n){"use strict";var i=n(10);function r(e){if(typeof e!=="function"){throw new TypeError("executor must be a function.")}var n;this.promise=new Promise(function e(t){n=t});var r=this;e(function e(t){if(r.reason){return}r.reason=new i(t);n(r.reason)})}r.prototype.throwIfRequested=function e(){if(this.reason){throw this.reason}};r.source=function e(){var n;var t=new r(function e(t){n=t});return{token:t,cancel:n}};e.exports=r},function(e,t,n){"use strict";e.exports=function e(n){return function e(t){return n.apply(null,t)}}},function(e,t,i){e.exports=zn.Class({statics:{create:function e(t){var n={},r={init:function e(t){this["super"](t);this.sets(t)}};zn.each(t,function(e,t){if(zn.type(e)=="function"&&!e.displayName){r[t]=e}else{n[t]=e}});var i=zn.Class(this,{methods:r,properties:n});return new i(n)}},properties:{container:"container",absolute:true,home:null,main:null,host:window.location.origin,router:null,global:null,plugins:[]},methods:{init:function e(t){this.sets(t);this.__initArgv(t);var n=this.onInit&&this.onInit.call(this,this.gets());if(n!==false){this.update(n)}},__initArgv:function e(t){var n={},r={},i=null,o=this.get("path"),s=this;this.get("plugins")&&this.get("plugins").forEach(function(e){if(zn.is(e,"string")){e=s.onLoading(e)}if(zn.is(e,"array")){zn.extend(n,e[1]);e=e[0]}zn.extend(r,e)});if(t.routers){var a=zn.deepEachObject(t.routers,this.onLoading.bind(this));zn.extend(r,a);if(o){var u={},c=n[o]||r[o];r["/"]=c;n[o]=r}else{n=r;zn.extend(n,a)}}this._routers=n;this._relativeRouters=r;console.log(this._routers,this._relativeRouters);znui.util.Session.setHome(this.get("home")).setMain(this.get("main")).setBasePath(this.get("path"));zn.http.setHost(this.get("host"),this.get("port"))},onLoading:function e(t){return t},__getRenderView:function e(){return this.render&&this.render.call(this,this.gets())},update:function e(t){var n=this.get("router");if(!n){n=znui.isMobile()?znui.react.WapRouter:znui.react.WebRouter}if(!n){return alert("只适合手机版本打开!"),false}var r=t||this.__getRenderView();_container=this.get("container");_container=zn.type(_container)=="string"?document.getElementById(_container):_container;if(this.get("absolute")){_container.style.position="absolute";_container.style.width="100%";_container.style.height="100%"}if(znui.isMobile()){_container.classList.add("zr-mobile")}if(this.get("global")){r=React.createElement("div",{style:{width:"100%",height:"100%"}},r,this.get("global"))}setTimeout(function(){return i(2).render(r,_container)},50)}}})},function(e,t,n){var r=znui.React||n(1);var i=r.createClass({displayName:"ZRDataView",getInitialState:function e(){return{data:null,loading:false}},componentDidMount:function e(){var t=this.props.events||{},n=t.before,r=t.after;this.state.data=zn.data.create(this.props.data,zn.extend(t,{before:function(e,t){this.setState({loading:true});this.props.onLoading&&this.props.onLoading(t,this);n&&n(e,t)}.bind(this),after:function(e,t){this.setState({loading:false,data:t});this.props.onFinished&&this.props.onFinished(t,this);r&&r(e,t)}.bind(this)}),this.props.context)},componentWillReceiveProps:function e(t){if(t.data!==this.props.data){this.state.data.overwriteCall(t.data)}},__itemRender:function e(t,n){return this.props.itemRender&&this.props.itemRender(t,n)},render:function e(){var t=this.state.data;if(this.state.loading){var n=this.props.loadingRender&&this.props.loadingRender(this);if(n===null){n=i.loadingRender||r.createElement(r.Fragment,null)}return n}if(t&&t.length){var n=this.props.dataRender&&this.props.dataRender(t,this);if(n){return n}return r.createElement(r.Fragment,null,t.map(this.__itemRender))}else if(!this.state.loading){var n=this.props.emptyRender&&this.props.emptyRender();if(n){return n}}return r.createElement(r.Fragment,null)}});i.loadingRender=null;e.exports=i}]));