(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{128:function(e,t,a){var n=a(130);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);(0,a(42).default)("144963ea",n,!0,{sourceMap:!1})},129:function(e,t,a){"use strict";a(128)},130:function(e,t,a){var n=a(41)(!1);n.push([e.i,".atom-headline[data-v-718636cb]{font-style:normal;font-weight:400}.atom-headline>*[data-v-718636cb]{display:block}.atom-headline.headline--h2 .overline[data-v-718636cb],.atom-headline.headline--h2 .subline[data-v-718636cb]{font-family:sans-serif;font-size:3.2vw;font-weight:400}@media (--xs){.atom-headline.headline--h2 .overline[data-v-718636cb],.atom-headline.headline--h2 .subline[data-v-718636cb]{font-size:12px}}.atom-headline.headline--h2 .subline[data-v-718636cb]{font-weight:500}.atom-headline.headline--h2 .headline[data-v-718636cb]{font-family:serif;font-size:9.6vw;font-weight:700}@media (--xs){.atom-headline.headline--h2 .headline[data-v-718636cb]{font-size:36px}}.atom-headline.headline--view-header[data-v-718636cb]{padding:15px;font-family:sans-serif;font-size:20px;font-weight:400}",""]),e.exports=n},131:function(e,t,a){"use strict";var n={props:{tag:{type:String,required:!1,default:()=>"h1"},styleType:{type:String,default:()=>null},overline:{type:String,required:!1,default:()=>"Lorem Overline"},headline:{type:String,required:!1,default:()=>"Lorem Headline"},subline:{type:String,required:!1,default:()=>"Lorem Subline"}},computed:{styleClasses(){var e={};return e["headline--".concat(this.tag)]=!0,e["headline--".concat(this.styleType)]=this.styleType,e}}},i=(a(129),a(6)),s=Object(i.a)(n,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a(e.tag,{tag:"component",staticClass:"atom-headline",class:e.styleClasses},[e._t("default",[e.$slots.overline||e.overline?a("span",{staticClass:"overline"},[e._t("overline",[e._v("\n        "+e._s(e.overline)+"\n      ")])],2):e._e(),e._v(" "),e.$slots.headline||e.headline?a("span",{staticClass:"headline"},[e._t("headline",[e._v("\n        "+e._s(e.headline)+"\n      ")])],2):e._e(),e._v(" "),e.$slots.subline||e.subline?a("span",{staticClass:"subline"},[e._t("subline",[e._v("\n        "+e._s(e.subline)+"\n      ")])],2):e._e()])],2)}),[],!1,null,"718636cb",null);t.a=s.exports},134:function(e,t,a){var n=a(145);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);(0,a(42).default)("a3423b48",n,!0,{sourceMap:!1})},135:function(e,t,a){var n=a(147);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);(0,a(42).default)("148673c8",n,!0,{sourceMap:!1})},143:function(e,t,a){e.exports=a.p+"img/image.72ec2fe.png"},144:function(e,t,a){"use strict";a(134)},145:function(e,t,a){var n=a(41)(!1);n.push([e.i,"",""]),e.exports=n},146:function(e,t,a){"use strict";a(135)},147:function(e,t,a){var n=a(41)(!1);n.push([e.i,".view-index img{height:32px}",""]),e.exports=n},43:function(e,t,a){"use strict";a.r(t);var n=a(131),i={computed:{storeValue(){return this.$store.getters["base/value"]}},methods:{onClick(){this.$store.dispatch("base/setValue",!this.storeValue)}}},s=(a(144),a(6)),l=Object(s.a)(i,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"organism-shared-store"},[t("p",[this._v("\n    Store Value: "+this._s(this.storeValue)+" -\n    "),t("button",{on:{click:this.onClick}},[this._v("\n      Change Value\n    ")])])])}),[],!1,null,"60aa4604",null).exports,o={components:{AtomHeadline:n.a,OrganismSharedStore:l},data:()=>({headline:{overline:null,headline:"Custom-Element Example",subline:null}}),mounted(){a.e(4).then(a.bind(null,154))}},r=(a(146),Object(s.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"view-index"},[t("atom-headline",this._b({attrs:{"style-type":"view"}},"atom-headline",this.headline,!1)),this._v(" "),t("img",{attrs:{src:a(143),alt:"image"}}),this._v(" "),t("organism-shared-store")],1)}),[],!1,null,null,null));t.default=r.exports}}]);