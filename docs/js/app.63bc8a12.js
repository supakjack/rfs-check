(function(t){function e(e){for(var r,i,l=e[0],o=e[1],c=e[2],d=0,f=[];d<l.length;d++)i=l[d],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&f.push(s[i][0]),s[i]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r]);u&&u(e);while(f.length)f.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,l=1;l<n.length;l++){var o=n[l];0!==s[o]&&(r=!1)}r&&(a.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},s={app:0},a=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var u=o;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"28f3":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{attrs:{id:"app"}},[r("div",{attrs:{id:"nav"}},[r("div",[r("vs-navbar",{staticClass:"nabarx",model:{value:t.activeItem,callback:function(e){t.activeItem=e},expression:"activeItem"}},[r("div",{attrs:{slot:"title"},slot:"title"},[r("div",{staticClass:"flex"},[r("div",{staticClass:"flex-initial ..."},[r("img",{staticStyle:{"max-width":"5rem"},attrs:{src:n("b382"),alt:""}})]),r("div",{staticClass:"flex-initial mt-6"},[r("vs-navbar-title",[r("span",{staticClass:"text-2xl"},[t._v("โรงพยาบาลหัวหิน")])])],1)])])])],1)]),r("vs-row",{staticClass:"mt-5",attrs:{"vs-justify":"center"}},[r("vs-col",{attrs:{type:"flex","vs-justify":"center","vs-align":"center","vs-w":"12"}},[r("vs-card",[r("div",{attrs:{slot:"header"},slot:"header"},[r("div",{staticClass:"flex justify-between ..."},[r("span",{staticClass:"text-xl"},[t._v("วางข้อความเพื่อตรวจสอบ")]),r("vs-button",{attrs:{color:"danger",type:"filled"},on:{click:t.onClickProcessLine}},[t._v("คลิกเพื่อตรวจสอบ")])],1)]),r("div",[r("div",{staticClass:"lined-textarea"},[t.disabled?t._e():r("div",{staticClass:"lined-textarea__lines",style:{"padding-right":t.longestWidth+"px"}},[r("div",{ref:"lines",staticClass:"lined-textarea__lines__inner"},t._l(t.lines,(function(e,n){return r("p",{key:n,staticClass:"lined-textarea__lines__line",class:{"lined-textarea__lines__line--invalid":t.invalidLines.includes(e)},domProps:{innerHTML:t._s(e)}})})),0)]),r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],ref:"textarea",staticClass:"lined-textarea__content",class:{"lined-textarea__content--disabled":t.disabled,"lined-textarea__content--wrap":!t.nowrap,"lined-textarea__content--nowrap":t.nowrap},style:t.styles,attrs:{disabled:t.disabled,placeholder:t.placeholder},domProps:{value:t.content},on:{scroll:t.scrollLines,input:[function(e){e.target.composing||(t.content=e.target.value)},t.onInput],mousedown:t.detectResize}}),r("div",{ref:"helper",staticClass:"count-helper"})])])])],1)],1),r("vs-row",{staticClass:"mt-8",attrs:{"vs-justify":"center"}},[r("vs-col",{attrs:{type:"flex","vs-justify":"center","vs-align":"center","vs-w":"12"}},[r("vs-card",[r("div",{attrs:{slot:"header"},slot:"header"},[r("span",{staticClass:"text-xl"},[t._v("ผลลัพธ์")])]),r("div",[t._l(t.results,(function(e,n){return r("div",{key:n},[t.content?r("div",{staticClass:"mt-5"},[r("span",{staticClass:"text-xl"},[t._v("ตรวจพบข้อผิดพลาด '|' มีจำนวน : "),r("span",{staticClass:"text-red-900 text-3xl"},[t._v(" "+t._s(e.number))]),t._v(" (ต้องมี 12 เท่านั้น) "),r("br"),t._v(" ณ บรรทัดที่ : "),r("span",{staticClass:"text-red-900 text-3xl"},[t._v(" "+t._s(e.index)+" ")]),r("br"),t._v(" ข้อความ : "),r("span",{staticClass:"text-red-900 text-3xl"},[t._v(" "+t._s(e.line)+" ")]),r("hr")])]):t._e()])})),t.content&&0!=t.results.length?t._e():r("div",{staticClass:"mt-5"},[r("span",{staticClass:"text-xl"},[t._v(" ไม่พบข้อผิดพลาด (กดปุ่มตรวจสอบซ้ำเพื่อตรวจสอบใหม่) "),r("hr")])])],2)])],1)],1)],1)])},a=[],i=n("1da1"),l=(n("96cf"),n("159b"),n("ac1f"),n("1276"),n("fb6a"),n("d81d"),n("aff5"),n("a9e3"),{name:"LinedTextarea",mounted:function(){this.content=this.value,this.syncScroll(),this.calculateCharactersPerLine()},data:function(){return{results:[],content:"",widthPerChar:8,numPerLine:1,previousWidth:0,scrolledLength:0}},props:{disabled:{type:Boolean,default:!1},nowrap:{type:Boolean,default:!0},placeholder:{type:String,default:""},styles:{type:Object,default:function(){return{height:"300px"}}},value:{type:String,default:""},validate:{type:Function,default:function(){return!0}}},computed:{invalidLines:function(){var t=this,e=[];return this.content.split("\n").forEach((function(n,r){t.validate(n)||e.push(r+1)})),e},lines:function(){var t=this;if(""===this.content)return[1];var e=[],n=1;function r(t,e){if(e<=0)return console.warn("Please set the min-width of textarea to allow at least one character per line."),t.length+1;var n=t.split(" "),r=1,s=e;return n.forEach((function(t){while(s===e&&t.length>=s)r++,t=t.slice(e);s!==e?(t.length+1>s&&(r++,s=e),s-=s===e?t.length:t.length+1):s-=t.length})),s===e?r-1:r}return this.content.split("\n").forEach((function(s){var a=r(s,t.numPerLine)-1;e.push(n);for(var i=0;i<a;i++)e.push("&nbsp;");n++})),e},longestWidth:function(){for(var t=this.lines.length-1;t>=0;t--)if("&nbsp;"!==this.lines[t])return(this.lines[t]+"").length*this.widthPerChar+10}},watch:{longestWidth:function(t,e){var n=this;t!==e&&this.$nextTick((function(){return n.calculateCharactersPerLine()}))},nowrap:function(){this.calculateCharactersPerLine()},value:function(t){t!==this.content&&(this.content=t)},content:function(t){t||(this.results=[])}},methods:{onClickProcessLine:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.results=[],n=t.content,r=n.split(/\r?\n/),console.log(r),console.log(r.length),e.next=7,r.map((function(e,n){for(var r=0,s=0;s<e.length;s++)"|"==e.charAt(s)&&(r+=1);12!=r&&t.results.push({number:r,index:n+1,line:e})}));case 7:console.log(t.results);case 8:case"end":return e.stop()}}),e)})))()},calculateCharactersPerLine:function(){if(this.nowrap)this.numPerLine=Number.MAX_SAFE_INTEGER;else{var t=this.$refs.textarea,e=getComputedStyle(t),n=parseFloat(e.getPropertyValue("padding-left")),r=parseFloat(e.getPropertyValue("padding-right")),s=e.getPropertyValue("font-size"),a=e.getPropertyValue("font-family"),i=t.clientWidth-n-r,l=this.$refs.helper;l.style.fontSize=s,l.style.fontFamily=a,l.innerHTML="";for(var o=1;o<999;o++)if(l.innerHTML+="a",l.getBoundingClientRect().width>i){this.numPerLine=o-1;break}}},detectResize:function(){var t=this,e=this.$refs.textarea,n=e.clientWidth,r=e.clientHeight,s=function(){var s=e.clientWidth,a=e.clientHeight;n===s&&r===a||t.calculateCharactersPerLine()},a=function e(){t.calculateCharactersPerLine(),document.removeEventListener("mousemove",s),document.removeEventListener("mouseup",e)};document.addEventListener("mousemove",s),document.addEventListener("mouseup",a)},onInput:function(){this.$emit("input",this.content),this.recalculate()},recalculate:function(){var t=this.$refs.textarea,e=t.clientWidth;e!==this.previousWidth&&this.calculateCharactersPerLine(),this.previousWidth=e},scrollLines:function(t){this.scrolledLength=t.target.scrollTop,this.syncScroll()},syncScroll:function(){this.$refs.lines.style.transform="translateY(".concat(-this.scrolledLength,"px)")}}}),o=l,c=(n("56f6"),n("2877")),u=Object(c["a"])(o,s,a,!1,null,"f2d404c6",null),d=u.exports,f=n("8c4f");r["default"].use(f["a"]);var h=[],p=new f["a"]({mode:"history",base:"",routes:h}),v=p,m=n("2f62");r["default"].use(m["a"]);var g=new m["a"].Store({state:{},mutations:{},actions:{},modules:{}}),x=n("fb9a"),_=n.n(x);n("04f2");r["default"].use(_.a),r["default"].config.productionTip=!1,new r["default"]({router:v,store:g,render:function(t){return t(d)}}).$mount("#app")},"56f6":function(t,e,n){"use strict";n("28f3")},b382:function(t,e,n){t.exports=n.p+"img/hh-logo.26a5ad31.jpeg"}});
//# sourceMappingURL=app.63bc8a12.js.map