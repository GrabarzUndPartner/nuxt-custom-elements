(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{118:function(e,t,n){var r=n(178);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,n(42).default)("576efcf3",r,!0,{sourceMap:!1})},177:function(e,t,n){"use strict";n(118)},178:function(e,t,n){var r=n(41)(!1);r.push([e.i,".custom-element-app-abstract[data-v-53df5fde]{padding:15px;background:#eee;border:1px solid #eee}.custom-element-app-abstract .header[data-v-53df5fde],.custom-element-app-abstract .router-view[data-v-53df5fde]{background:#fff;border:1px solid #eee}.custom-element-app-abstract .router-view[data-v-53df5fde]{min-height:160px;padding:0 15px;margin-top:20px}",""]),e.exports=r},205:function(e,t,n){"use strict";n.r(t);n(16);var r=n(72),i=n(51),a={components:{OrganismViewHeader:function(){return n.e(1).then(n.bind(null,203))}},extends:r.a,router:Object(i.a)("abstract"),data:function(){return{views:["index","view-1","view-2","view-3"]}},computed:{content:function(){return{header:{title:'App with router mode "abstract"',linksTitle:"Views:",navigation:[{title:"Home",url:"/"},{title:"View 1",url:"/view-1"},{title:"View 2",url:"/view-2"},{title:"View 3",url:"/view-3"}]}}},header:function(){return this.content.header}}},o=(n(177),n(40)),u=Object(o.a)(a,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"custom-element-app-abstract"},[t("organism-view-header",this._b({staticClass:"header"},"organism-view-header",this.header,!1)),this._v(" "),t("custom-element-router-view",{staticClass:"router-view"})],1)}),[],!1,null,"53df5fde",null);t.default=u.exports},50:function(e,t,n){var r=n(70);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,n(42).default)("1f385c52",r,!0,{sourceMap:!1})},51:function(e,t,n){"use strict";(function(e){n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return o}));n(73),n(16),n(49),n(53);var r=n(0),i=n(94);function a(e){return e.map((function(e){return{path:"/".concat(e).replace(/index$/,""),component:function(){return function(e){return n(71)("./"+e)}(e)}}}))}function o(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"abstract",n=new i.a({mode:t,base:e.CUSTOM_ELEMENT_ROUTER_BASE||e.location.pathname});return"abstract"===t&&n.replace("/"),n}r.a.use(i.a)}).call(this,n(2))},54:function(e,t,n){var r={"./base.js":55};function i(e){var t=a(e);return n(t)}function a(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}i.keys=function(){return Object.keys(r)},i.resolve=a,e.exports=i,i.id=54},55:function(e,t,n){"use strict";n.r(t),n.d(t,"state",(function(){return r})),n.d(t,"mutations",(function(){return i})),n.d(t,"getters",(function(){return a})),n.d(t,"actions",(function(){return o}));var r=function(){return{value:!0}},i={value:function(e,t){e.value=Boolean(t)}},a={value:function(e){return e.value}},o={setValue:function(e,t){e.commit("value",t)}}},56:function(e,t,n){"use strict";n(77),n(78),n(79),n(80),n(16),n(49),n(53),n(68);var r=n(0),i=n(83);r.a.use(i.a);r.a.component("NuxtLink",{extends:r.a.component("RouterLink")});var a,o={store:new i.a.Store({modules:(a=n(54),a.keys().reduce((function(e,t){var n=t.replace(/\.\/(.*)\.js/,"$1");return e[String(n)]=Object.assign({namespaced:!0},a(t)),e}),{}))}),props:{basePath:{type:String,default:function(){return"/"}}}},u=n(40),c=Object(u.a)(o,void 0,void 0,!1,null,null,null);t.a=c.exports},69:function(e,t,n){"use strict";n(50)},70:function(e,t,n){var r=n(41)(!1);r.push([e.i,"div[data-v-b1e8b39c]{position:relative}.router-view-change-enter-active[data-v-b1e8b39c],.router-view-change-leave-active[data-v-b1e8b39c]{transition:opacity 0s linear .15s}.router-view-change-enter[data-v-b1e8b39c],.router-view-change-leave-to[data-v-b1e8b39c]{position:absolute;width:100%;opacity:0;transition:opacity .15s linear .15s}",""]),e.exports=r},71:function(e,t,n){var r={"./":[47,2],"./index":[47,2],"./index.vue":[47,2],"./view-1":[59,4],"./view-1.vue":[59,4],"./view-2":[60,5],"./view-2.vue":[60,5],"./view-3":[61,6],"./view-3.vue":[61,6]};function i(e){if(!n.o(r,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=r[e],i=t[0];return n.e(t[1]).then((function(){return n(i)}))}i.keys=function(){return Object.keys(r)},i.id=71,e.exports=i},72:function(e,t,n){"use strict";var r={name:"CustomElementRouterView"},i=(n(69),n(40)),a=Object(i.a)(r,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("transition",{attrs:{name:"router-view-change"}},[t("keep-alive",[this.$router?t("router-view"):this._e()],1)],1)],1)}),[],!1,null,"b1e8b39c",null).exports,o=n(51),u={components:{CustomElementRouterView:a},extends:n(56).a,props:{mode:{type:String,default:function(){return"history"}}},data:function(){return{views:["index"]}},created:function(){this.$router&&this.$router.addRoutes(Object(o.b)(this.views))}},c=Object(i.a)(u,void 0,void 0,!1,null,null,null);t.a=c.exports}}]);