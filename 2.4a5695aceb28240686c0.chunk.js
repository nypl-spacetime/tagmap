webpackJsonp([2,3],{613:function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function a(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}function i(e){return{changeRoute:function(n){return e(t.i(d.push)(n))}}}var l=t(6),u=l&&l.__esModule?function(){return l["default"]}:function(){return l};t.d(u,"a",u);var f=t(83),c=f&&f.__esModule?function(){return f["default"]}:function(){return f};t.d(c,"a",c);var d=t(75),s=d&&d.__esModule?function(){return d["default"]}:function(){return d};t.d(s,"a",s);var p=t(624);t.d(n,"AboutPage",function(){return b});var v=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(n,t,r,o){var a=n&&n.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&a)for(var l in a)void 0===t[l]&&(t[l]=a[l]);else t||(t=a||{});if(1===i)t.children=o;else if(i>1){for(var u=Array(i),f=0;i>f;f++)u[f]=arguments[f+3];t.children=u}return{$$typeof:e,type:n,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}}(),y=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),m=t(660),b=function(e){function n(){var e,t,a,i;r(this,n);for(var l=arguments.length,u=Array(l),f=0;l>f;f++)u[f]=arguments[f];return t=a=o(this,(e=Object.getPrototypeOf(n)).call.apply(e,[this].concat(u))),a.openRoute=function(e){a.props.changeRoute(e)},a.start=function(){a.openRoute("/")},i=t,o(a,i)}return a(n,e),y(n,[{key:"render",value:function(){return v(p.a,{buttonAction:this.start},void 0,v("div",{dangerouslySetInnerHTML:{__html:m}}))}}]),n}(u.a.Component);n["default"]=t.i(f.connect)(null,i)(b)},614:function(e,n,t){"use strict";function r(e){var n,t=[l.a.button,e.className,e.type&&l.a[e.type]?l.a[e.type]:"",e.disabled?l.a.disabled:""];return e.disabled||(n=e.onClick),u("button",{tabindex:"0",className:t.join(" "),onClick:n},void 0,e.children)}var o=t(6),a=o&&o.__esModule?function(){return o["default"]}:function(){return o};t.d(a,"a",a);var i=t(618),l=i&&i.__esModule?function(){return i["default"]}:function(){return i};t.d(l,"a",l);var u=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(n,t,r,o){var a=n&&n.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&a)for(var l in a)void 0===t[l]&&(t[l]=a[l]);else t||(t=a||{});if(1===i)t.children=o;else if(i>1){for(var u=Array(i),f=0;i>f;f++)u[f]=arguments[f+3];t.children=u}return{$$typeof:e,type:n,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}}();n.a=r},615:function(e,n,t){"use strict";function r(e){return u("div",{className:l.a.buttons},void 0,e.children)}var o=t(6),a=o&&o.__esModule?function(){return o["default"]}:function(){return o};t.d(a,"a",a);var i=t(619),l=i&&i.__esModule?function(){return i["default"]}:function(){return i};t.d(l,"a",l);var u=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(n,t,r,o){var a=n&&n.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&a)for(var l in a)void 0===t[l]&&(t[l]=a[l]);else t||(t=a||{});if(1===i)t.children=o;else if(i>1){for(var u=Array(i),f=0;i>f;f++)u[f]=arguments[f+3];t.children=u}return{$$typeof:e,type:n,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}}();n.a=r},616:function(e,n,t){n=e.exports=t(263)(),n.push([e.i,"._3tez2OnhHZXdCwD81hRXzS{cursor:pointer;box-sizing:border-box;display:inline;background-color:#dededf;border-radius:2rem;color:#fff;display:inline-block;margin:.6rem;padding:.5rem 1.3rem .3rem;text-transform:uppercase;border:1px solid hsla(0,0%,100%,0)}._3tez2OnhHZXdCwD81hRXzS:not(._3ISOLl3xbvzjUffCWl1oT3):active{border-color:#fff}._371bnJ8txOs2SLokYSFtMm{background-color:#d0343a}._1rR3F0EgPd16FrJDWzWJ60{color:#d0343a;background:none}._3ISOLl3xbvzjUffCWl1oT3{background-color:#dededf;cursor:inherit}",""]),n.locals={button:"_3tez2OnhHZXdCwD81hRXzS",disabled:"_3ISOLl3xbvzjUffCWl1oT3",primary:"_371bnJ8txOs2SLokYSFtMm",secondary:"_1rR3F0EgPd16FrJDWzWJ60"}},617:function(e,n,t){n=e.exports=t(263)(),n.push([e.i,"._3F7V9M2-PAppGaYPXANKxW{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:distribute;justify-content:space-around;width:100%;max-width:300px;margin:0 auto;-ms-flex-negative:0;flex-shrink:0}",""]),n.locals={buttons:"_3F7V9M2-PAppGaYPXANKxW"}},618:[663,616],619:[663,617],622:function(e,n,t){"use strict";function r(e){return c("footer",{className:f.a.footer+" "+e.className},void 0,c("nav",{},void 0,c("div",{className:f.a.container+" "+f.a["nav-container"]},void 0,d,s,p,v)),c("div",{className:f.a.container},void 0,y,m,b))}var o=t(6),a=o&&o.__esModule?function(){return o["default"]}:function(){return o};t.d(a,"a",a);var i=t(267),l=i&&i.__esModule?function(){return i["default"]}:function(){return i};t.d(l,"a",l);var u=t(646),f=u&&u.__esModule?function(){return u["default"]}:function(){return u};t.d(f,"a",f);var c=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(n,t,r,o){var a=n&&n.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&a)for(var l in a)void 0===t[l]&&(t[l]=a[l]);else t||(t=a||{});if(1===i)t.children=o;else if(i>1){for(var u=Array(i),f=0;i>f;f++)u[f]=arguments[f+3];t.children=u}return{$$typeof:e,type:n,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}}(),d=c("a",{href:"http://www.nypl.org/help/about-nypl/legal-notices/privacy-policy",target:"_blank"},void 0,"Privacy Policy"),s=c("a",{href:"http://www.nypl.org/help/about-nypl/legal-notices/rules-and-regulations",target:"_blank"},void 0,"Rules and Regulations"),p=c("a",{href:"http://www.nypl.org/policy-patron-generated-web-content",target:"_blank"},void 0,"Policy on Patron-Generated Web Content"),v=c("a",{href:"http://www.nypl.org/help/about-nypl/legal-notices/website-terms-and-conditions",target:"_blank"},void 0,"Terms and Conditions"),y=c("p",{},void 0,"A ",c("a",{href:"http://spacetime.nypl.org/"},void 0,"NYC Space/Time Directory")," project"),m=c("p",{},void 0,"© The New York Public Library, Astor, Lenox, and Tilden Foundation 2013-2016"),b=c("p",{},void 0,c("a",{href:"http://www.nypl.org"},void 0,c("img",{alt:"The New York Public Library",src:l.a})));n.a=r},624:function(e,n,t){"use strict";function r(e){return d("div",{className:c.a.container},void 0,d("article",{className:c.a.article},void 0,e.children),d(u.a,{},void 0,d(l.a,{onClick:e.buttonAction,type:"primary"},void 0,"Start mapping!")),d(i.a,{className:c.a.footer}))}var o=t(6),a=o&&o.__esModule?function(){return o["default"]}:function(){return o};t.d(a,"a",a);var i=t(622),l=t(614),u=t(615),f=t(648),c=f&&f.__esModule?function(){return f["default"]}:function(){return f};t.d(c,"a",c);var d=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(n,t,r,o){var a=n&&n.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&a)for(var l in a)void 0===t[l]&&(t[l]=a[l]);else t||(t=a||{});if(1===i)t.children=o;else if(i>1){for(var u=Array(i),f=0;i>f;f++)u[f]=arguments[f+3];t.children=u}return{$$typeof:e,type:n,key:void 0===r?null:""+r,ref:null,props:t,_owner:null}}}();n.a=r},634:function(e,n,t){n=e.exports=t(263)(),n.push([e.i,"._12LGeWyqxzQ-d7QrWjWm94{width:100%;font-size:.8em;margin-top:2em;margin-bottom:2em}._12LGeWyqxzQ-d7QrWjWm94 ._1KP6vkZpft0IGd0usTiAbi{max-width:90%;margin:0 auto}._12LGeWyqxzQ-d7QrWjWm94 nav{padding-top:12px;padding-bottom:10px;width:100%;margin-bottom:1em}._2sLDfzkM1hCQd9MGqsQb19{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}._12LGeWyqxzQ-d7QrWjWm94 nav a{text-align:center;padding:0 .5em}._12LGeWyqxzQ-d7QrWjWm94 nav a,._12LGeWyqxzQ-d7QrWjWm94 nav a:visited{color:#fff}._12LGeWyqxzQ-d7QrWjWm94 nav a:focus,._12LGeWyqxzQ-d7QrWjWm94 nav a:hover{text-decoration:underline}._12LGeWyqxzQ-d7QrWjWm94 img{margin:0 auto;width:55px}._12LGeWyqxzQ-d7QrWjWm94 p{text-align:center}",""]),n.locals={footer:"_12LGeWyqxzQ-d7QrWjWm94",container:"_1KP6vkZpft0IGd0usTiAbi","nav-container":"_2sLDfzkM1hCQd9MGqsQb19"}},636:function(e,n,t){n=e.exports=t(263)(),n.push([e.i,".Bx84jMCskO46cj_SYztq{overflow-y:auto;width:100%;-ms-flex:1;flex:1}._35S30RSzYCndMCfSKaf_j8{width:760px;max-width:90%;margin:0 auto;padding-top:1em;box-sizing:border-box}._35S30RSzYCndMCfSKaf_j8 h1{text-align:center}._35S30RSzYCndMCfSKaf_j8 ol,._35S30RSzYCndMCfSKaf_j8 ul{margin:1em}._35S30RSzYCndMCfSKaf_j8 img{margin:1em 0;max-width:100%}._13H9hJkRQquROl0HbN4Fwz nav{background-color:#080808}",""]),n.locals={container:"Bx84jMCskO46cj_SYztq",article:"_35S30RSzYCndMCfSKaf_j8",footer:"_13H9hJkRQquROl0HbN4Fwz"}},646:[663,634],648:[663,636],660:function(e,n){e.exports="<h1>About TAGMAP</h1> <p>See tags. Map tags.</p>"},663:function(e,n,t,r){var o=t(r);"string"==typeof o&&(o=[[e.i,o,""]]),t(264)(o,{}),o.locals&&(e.exports=o.locals)}});