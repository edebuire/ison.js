!function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(t,e,i){"use strict";var n,r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function o(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}console.log(window.mraid);var s=function(t){return document.getElementById(t)},a=function(t){return document.getElementsByClassName(t)},l=function(t){return document.getElementsByTagName(t)},h=function(t){return document.createElement(t)},c=function(t,e,i){var n=h(e);return n.id=i?""+t+i:t,n.className=i?i+" "+t:t,n},u=function(t){return function(e){for(var i=arguments.length,n=Array(i>1?i-1:0),r=1;r<i;r++)n[r-1]=arguments[r];return n.map(function(i){var n=i.classList;switch(t){case"add":n.add(e);break;case"remove":n.remove(e);break;case"toggle":n.toggle(e)}return i})}},d=u("add"),f=u("remove"),p=u("toggle"),y=function(t){for(var e=arguments.length,i=Array(e>1?e-1:0),n=1;n<e;n++)i[n-1]=arguments[n];i.map(function(e){switch(void 0===t?"undefined":r(t)){case"string":null!=document.body?document.body.appendChild(e):console.error("null error");break;default:t.appendChild(e)}})},g=function(t){for(var e=arguments.length,i=Array(e>1?e-1:0),n=1;n<e;n++)i[n-1]=arguments[n];return i.map(function(e){return e.innerHTML=t})},m=function(t){return function(){for(var e=arguments.length,i=Array(e),n=0;n<e;n++)i[n]=arguments[n];return i.map(function(e){return e.style.opacity=t.toString()})}},v=m(0),b=m(1),x=function(t){return function(){for(var e=arguments.length,i=Array(e),n=0;n<e;n++)i[n]=arguments[n];return i.map(function(e){return e.style.display=t})}},k=x("block"),w=x("none"),C=x("flex"),A=function(t){return function(){for(var e=arguments.length,i=Array(e),n=0;n<e;n++)i[n]=arguments[n];return i.map(function(e){return e.style.position=t})}},S=A("absolute"),O=A("relative"),P=A("fixed"),T=function(){for(var t=arguments.length,e=Array(t>1?t-1:0),i=1;i<t;i++)e[i-1]=arguments[i];var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return e.map(function(t){return t.style.zIndex=n.toString()})},j=function(t){for(var e=arguments.length,i=Array(e>1?e-1:0),n=1;n<e;n++)i[n-1]=arguments[n];return i.map(function(e){return e.style.backgroundColor=t})},E=function(t){return function(e){for(var i=arguments.length,n=Array(i>1?i-1:0),r=1;r<i;r++)n[r-1]=arguments[r];var o=["margin","padding"].indexOf(t);n.map(function(t){switch(o){case 0:t.style.margin=e+"px";break;case 1:t.style.padding=e+"px";break;default:console.error("margin/padding")}return t})}},I=E("margin"),M=E("padding"),_=function(t){return function(e){for(var i=arguments.length,n=Array(i>1?i-1:0),r=1;r<i;r++)n[r-1]=arguments[r];var o="string"==typeof e?/vw|vh/gi.test(e)?""+e:e+"%":e+"px";n.map(function(e){switch(t){case"width":e.style.width=o;break;case"height":e.style.height=o;break;case"top":e.style.top=o;break;case"bottom":e.style.bottom=o;break;case"right":e.style.right=o;break;case"left":e.style.left=o;break;default:console.error("dimension")}return e})}},B=_("height"),z=_("width"),L=_("top"),H=_("bottom"),N=_("right"),D=_("left"),F=function(t){return function(e,i,n){i.addEventListener(t,e,n)}},R=F("click"),W=F("touchstart"),Z=F("touchmove"),q=F("touchend"),G=function(t){var e="",i=!0,n=!1,o=void 0;try{for(var s,a=Object.keys(t)[Symbol.iterator]();!(i=(s=a.next()).done);i=!0){var l=s.value,h="";if("object"===r(t[l]))if("append"===l)h=t[l].id;else{var c=!0,u=!1,d=void 0;try{for(var f,p=Object.keys(t[l])[Symbol.iterator]();!(c=(f=p.next()).done);c=!0){var y=f.value;h+="\n"+y+" => "+t[l][y]+"\n"}}catch(t){u=!0,d=t}finally{try{!c&&p.return&&p.return()}finally{if(u)throw d}}}else h=t[l];e+=l+" => "+h+"\n"}}catch(t){n=!0,o=t}finally{try{!i&&a.return&&a.return()}finally{if(n)throw o}}return console.log("%c "+e,"color: yellow"),e};function J(t){this.opt=t,this.name=t.name,this.tag=t.tag,this.index=t.index,this.display=t.display,this.position=t.position,this.width=t.width,this.height=t.height,this.top=t.top,this.bottom=t.bottom,this.right=t.right,this.left=t.left,this.opacity=t.opacity,this.zIndex=t.zIndex,this.bkgColor=t.bkgColor,this.innerTxt=t.innerTxt,this.margin=t.margin,this.padding=t.padding,this.append=t.append,this.class=t.class,this.src=t.src,this.href=t.href,this.type=t.type,this.style=t.style,this.event=t.event,this.tstart=t.tstart,this.tmove=t.tmove,this.tend=t.tend,this.click=t.click,this.i,this.build()}J.prototype={build:function(){var t=this;if(this.i=c(this.name,this.tag,this.index),this.display&&x(this.display)(this.i),this.position&&A(this.position)(this.i),this.width&&z(this.width,this.i),this.height&&B(this.height,this.i),this.top&&L(this.top,this.i),this.bottom&&H(this.bottom,this.i),this.left&&D(this.left,this.i),this.right&&N(this.right,this.i),this.opacity&&m(this.opacity)(this.i),this.zIndex&&T(this.zIndex,this.i),this.bkgColor&&j(this.bkgColor,this.i),this.innerTxt&&g(this.innerTxt,this.i),this.margin&&I(this.margin,this.i),this.padding&&M(this.padding,this.i),this.append&&y(this.append,this.i),this.class&&d(this.class,this.i),this.style){var e=Object.keys(this.style),i=Object.values(this.style);e.forEach(function(e,n){"string"==typeof i[n]&&t.i.style.setProperty(e,i[n])})}this.src&&(this.i.src=this.src),this.href&&(this.i.href=this.href),this.type&&(this.i.type=this.type),this.tstart&&W(this.tstart,this.i),this.tmove&&Z(this.tmove,this.i),this.tend&&q(this.tend,this.i),this.click&&R(this.click,this.i)},info:function(){G(this.opt)},_event:function(t,e){F(t)(e,this.i)}},t.exports=(o(n={px:"px",getInt:function(t){return parseInt(t.replace("px",""),10)},amMraid:function(){return void 0!==window.mraid},isIos:function(){return navigator.userAgent.includes("iPhone")&&!navigator.userAgent.includes("Safari")},isLandscape:function(){return 90===window.orientation||-90===window.orientation},formatPortrait:function(){return 0==window.orientation},select:s,selectClass:a,selectTag:l,S:function(t){switch(t.charAt(0)){case".":return a(t.slice(1,t.length));case"#":return s(t.slice(1,t.length));default:return l(t)}},create:h,setElem:c,appendToDom:y,innerTxt:g,opacity:m,opacity0:v,opacity1:b,display:x,displayNone:w,displayFlex:C,displayBlock:k},"displayBlock",k),o(n,"setPos",A),o(n,"setFix",P),o(n,"setAbs",S),o(n,"setRel",O),o(n,"setZindex",T),o(n,"bkgColor",j),o(n,"setPM",E),o(n,"setMargin",I),o(n,"setPadding",M),o(n,"setTransition",function(t,e,i){for(var n=arguments.length,r=Array(n>3?n-3:0),o=3;o<n;o++)r[o-3]=arguments[o];var s=t+" "+e+"s "+i;r.map(function(t){return t.style.transition=s,t.style.setProperty("-webkit-transition",s),t})}),o(n,"setDim",_),o(n,"setWidth",z),o(n,"setHeight",B),o(n,"setTop",L),o(n,"setBottom",H),o(n,"setRight",N),o(n,"setLeft",D),o(n,"classe",u),o(n,"addClass",d),o(n,"remClass",f),o(n,"toggleClass",p),o(n,"eventHandler",F),o(n,"tstart",W),o(n,"tmove",Z),o(n,"tend",q),o(n,"click",R),o(n,"debugo",G),o(n,"CreateElem",J),n)},function(t,e,i){"use strict";var n=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}(i(0));var r=new n.CreateElem({name:"test",tag:"div",index:2,height:100,bkgColor:"yellow",append:n.S("#container"),style:{border:"5px solid red"},click:function(){console.log("yoyo")}});r.info(),n.eventHandler("click")(function(){console.log("pouet")},r.i),r._event();new n.CreateElem({name:"foo",tag:"div",height:100,bkgColor:"red",append:n.S("#container"),style:{border:"5px solid yellow"}});console.log("I.amMraid(): ",n.amMraid())}]);