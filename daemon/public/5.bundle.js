(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{383:function(t,e,n){"use strict";n.d(e,"b",(function(){return o}));var r=n(462),o=function(){return Object(r.a)(new Date,"dd-MM-yyyy HH:mm:ss")};e.a=function(){return Object(r.a)(new Date,"HH:mm")}},461:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return m}));var r,o=n(1),c=n.n(o),u=n(106),a=n(383);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function p(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function y(t){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function b(t,e){return(b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var m=Object(u.b)("stores")(r=Object(u.c)(r=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}(i,t);var e,n,r,o,u=(e=i,function(){var t,n=y(e);if(p()){var r=y(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return s(this,t)});function i(){var t;f(this,i);for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return(t=u.call.apply(u,[this].concat(n))).state={clock:null,now:Object(a.a)()},t}return n=i,(r=[{key:"componentDidMount",value:function(){var t=this;this.setState({clock:setInterval((function(){t.setState({now:Object(a.a)()})}),1e3)})}},{key:"componentWillUnmount",value:function(){clearInterval(this.state.clock)}},{key:"render",value:function(){return c.a.createElement("div",{className:"container-fluid"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-xs-12 text-center"},c.a.createElement("h1",{style:{fontSize:"18em"}},this.state.now))))}}])&&l(n.prototype,r),o&&l(n,o),i}(c.a.Component))||r)||r}}]);