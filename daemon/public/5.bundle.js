(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{385:function(t,e,n){"use strict";n.d(e,"b",(function(){return r}));var o=n(467),r=function(){return Object(o.a)(new Date,"dd-MM-yyyy HH:mm:ss")};e.a=function(){return Object(o.a)(new Date,"HH:mm")}},466:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return m}));var o,r=n(1),c=n.n(r),u=n(107),a=n(385);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function p(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=b(t);if(e){var r=b(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return y(this,n)}}function y(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function b(t){return(b=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var m=Object(u.b)("stores")(o=Object(u.c)(o=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(u,t);var e,n,o,r=p(u);function u(){var t;f(this,u);for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return(t=r.call.apply(r,[this].concat(n))).state={clock:null,now:Object(a.a)()},t}return e=u,(n=[{key:"componentDidMount",value:function(){var t=this;this.setState({clock:setInterval((function(){var e=Object(a.a)();e!=t.state.now&&t.setState({now:e})}),1e3)})}},{key:"componentWillUnmount",value:function(){clearInterval(this.state.clock)}},{key:"render",value:function(){return c.a.createElement("div",{className:"container-fluid"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-xs-12 text-center"},c.a.createElement("h1",{style:{fontSize:"18em"}},this.state.now))))}}])&&l(e.prototype,n),o&&l(e,o),u}(c.a.Component))||o)||o}}]);