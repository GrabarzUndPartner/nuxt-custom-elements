(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{130:function(e,t,l){var i=l(132);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,l(43).default)("144963ea",i,!0,{sourceMap:!1})},131:function(e,t,l){"use strict";l(130)},132:function(e,t,l){var i=l(42)(!1);i.push([e.i,".atom-headline[data-v-718636cb]{font-style:normal;font-weight:400}.atom-headline>*[data-v-718636cb]{display:block}.atom-headline.headline--h2 .overline[data-v-718636cb],.atom-headline.headline--h2 .subline[data-v-718636cb]{font-family:sans-serif;font-size:3.2vw;font-weight:400}@media (--xs){.atom-headline.headline--h2 .overline[data-v-718636cb],.atom-headline.headline--h2 .subline[data-v-718636cb]{font-size:12px}}.atom-headline.headline--h2 .subline[data-v-718636cb]{font-weight:500}.atom-headline.headline--h2 .headline[data-v-718636cb]{font-family:serif;font-size:9.6vw;font-weight:700}@media (--xs){.atom-headline.headline--h2 .headline[data-v-718636cb]{font-size:36px}}.atom-headline.headline--view-header[data-v-718636cb]{padding:15px;font-family:sans-serif;font-size:20px;font-weight:400}",""]),e.exports=i},133:function(e,t,l){"use strict";var i={props:{tag:{type:String,required:!1,default:()=>"h1"},styleType:{type:String,default:()=>null},overline:{type:String,required:!1,default:()=>"Lorem Overline"},headline:{type:String,required:!1,default:()=>"Lorem Headline"},subline:{type:String,required:!1,default:()=>"Lorem Subline"}},computed:{styleClasses(){var e={};return e["headline--".concat(this.tag)]=!0,e["headline--".concat(this.styleType)]=this.styleType,e}}},a=(l(131),l(6)),n=Object(a.a)(i,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l(e.tag,{tag:"component",staticClass:"atom-headline",class:e.styleClasses},[e._t("default",[e.$slots.overline||e.overline?l("span",{staticClass:"overline"},[e._t("overline",[e._v("\n        "+e._s(e.overline)+"\n      ")])],2):e._e(),e._v(" "),e.$slots.headline||e.headline?l("span",{staticClass:"headline"},[e._t("headline",[e._v("\n        "+e._s(e.headline)+"\n      ")])],2):e._e(),e._v(" "),e.$slots.subline||e.subline?l("span",{staticClass:"subline"},[e._t("subline",[e._v("\n        "+e._s(e.subline)+"\n      ")])],2):e._e()])],2)}),[],!1,null,"718636cb",null);t.a=n.exports},134:function(e,t,l){var i=l(142);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,l(43).default)("5b6d3ee6",i,!0,{sourceMap:!1})},135:function(e,t,l){var i=l(144);i.__esModule&&(i=i.default),"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,l(43).default)("7093e955",i,!0,{sourceMap:!1})},141:function(e,t,l){"use strict";l(134)},142:function(e,t,l){var i=l(42)(!1);i.push([e.i,".molecule-link-list.type--view-header[data-v-3d4e64dd]{display:flex;padding:0;margin:0;list-style:none}.molecule-link-list.type--view-header a[data-v-3d4e64dd]{display:block;padding:10px 15px;font-family:sans-serif;color:#333;text-decoration:none}.molecule-link-list.type--view-header a.router-link-exact-active.router-link-active[data-v-3d4e64dd]{font-weight:700}.molecule-link-list.type--view-header a.router-link-exact-active.router-link-active[data-v-3d4e64dd],.molecule-link-list.type--view-header a[data-v-3d4e64dd]:hover{background:#eee}",""]),e.exports=i},143:function(e,t,l){"use strict";l(135)},144:function(e,t,l){var i=l(42)(!1);i.push([e.i,".organisms-view-header[data-v-47124960]{position:relative}.organisms-view-header nav[data-v-47124960]{display:flex;line-height:1}.organisms-view-header nav>span[data-v-47124960]{padding:10px 15px;font-family:sans-serif;color:#333}",""]),e.exports=i},157:function(e,t,l){"use strict";l.r(t);var i=l(133),a={props:{url:{type:String,required:!1,default:"#url"},title:{type:String,required:!1,default:null},click:{type:Function,default(){}},target:{type:String,required:!1,default:"_blank"}},computed:{isExternal(){return/^(http(s)?|ftp):\/\//.test(this.url)||this.url.startsWith("#")}}},n=l(6),s={components:{AtomLinkTo:Object(n.a)(a,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return e.isExternal?l("a",{attrs:{href:e.url,target:e.target||"_blank",rel:"noopener",title:e.title},on:{click:e.click}},[e._t("default",[e._v(e._s(e.title))])],2):e.isExternal?e._e():l("router-link",{attrs:{to:e.url,title:e.title},on:{click:e.click}},[e._t("default",[e._v(e._s(e.title))])],2)}),[],!1,null,null,null).exports},props:{type:{type:String,default:()=>null},list:{type:Array,default:()=>[]}},computed:{styleClasses(){var e={};return e["type--".concat(this.type)]=this.type,e}},methods:{getUrl(e){if(!("$i18n"in this&&this.$i18n&&"localePath"in this.$i18n))return e.url;this.localePath(e.url)}}},r=(l(141),Object(n.a)(s,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("ul",{staticClass:"molecule-link-list",class:e.styleClasses},[e._t("default",e._l(e.list,(function(t){return l("li",{key:t.title},[l("atom-link-to",e._b({attrs:{url:e.getUrl(t)}},"atom-link-to",t,!1),[e._v("\n        "+e._s(t.title)+"\n      ")])],1)})))],2)}),[],!1,null,"3d4e64dd",null).exports),o={components:{AtomHeadline:i.a,MoleculeLinkList:r},props:{title:{type:String,default:"Header Title"},linksTitle:{type:String,default:"Links:"},navigation:{type:Array,default:()=>[{title:"Link 1.",url:"#link-1",target:"_self"},{title:"Link 2.",url:"#link-2",target:"_self"},{title:"Link 3.",url:"#link-3",target:"_self"}]}},computed:{headline(){return{overline:null,headline:this.title,subline:null}}}},d=(l(143),Object(n.a)(o,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"organisms-view-header"},[l("atom-headline",e._b({attrs:{tag:"div","style-type":"view-header"}},"atom-headline",e.headline,!1)),e._v(" "),e.navigation.length>0?l("nav",[l("span",[e._v(e._s(e.linksTitle))]),e._v(" "),l("molecule-link-list",{staticClass:"links",attrs:{type:"view-header",list:e.navigation}})],1):e._e(),e._v(" "),l("LazyGithubCorner")],1)}),[],!1,null,"47124960",null));t.default=d.exports}}]);