(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{162:function(e,t,n){var a=n(164);a.__esModule&&(a=a.default),"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,n(60).default)("144963ea",a,!0,{sourceMap:!1})},163:function(e,t,n){"use strict";n(162)},164:function(e,t,n){var a=n(59)(!1);a.push([e.i,".atom-headline[data-v-718636cb]{font-style:normal;font-weight:400}.atom-headline>*[data-v-718636cb]{display:block}.atom-headline.headline--h2 .overline[data-v-718636cb],.atom-headline.headline--h2 .subline[data-v-718636cb]{font-family:sans-serif;font-size:3.2vw;font-weight:400}@media (--xs){.atom-headline.headline--h2 .overline[data-v-718636cb],.atom-headline.headline--h2 .subline[data-v-718636cb]{font-size:12px}}.atom-headline.headline--h2 .subline[data-v-718636cb]{font-weight:500}.atom-headline.headline--h2 .headline[data-v-718636cb]{font-family:serif;font-size:9.6vw;font-weight:700}@media (--xs){.atom-headline.headline--h2 .headline[data-v-718636cb]{font-size:36px}}.atom-headline.headline--view-header[data-v-718636cb]{padding:15px;font-family:sans-serif;font-size:20px;font-weight:400}",""]),e.exports=a},165:function(e,t,n){"use strict";var a={props:{tag:{type:String,required:!1,default:function(){return"h1"}},styleType:{type:String,default:function(){return null}},overline:{type:String,required:!1,default:function(){return"Lorem Overline"}},headline:{type:String,required:!1,default:function(){return"Lorem Headline"}},subline:{type:String,required:!1,default:function(){return"Lorem Subline"}}},computed:{styleClasses:function(){var e={};return e["headline--".concat(this.tag)]=!0,e["headline--".concat(this.styleType)]=this.styleType,e}}},i=(n(163),n(8)),s=Object(i.a)(a,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(e.tag,{tag:"component",staticClass:"atom-headline",class:e.styleClasses},[e._t("default",[e.$slots.overline||e.overline?n("span",{staticClass:"overline"},[e._t("overline",[e._v("\n        "+e._s(e.overline)+"\n      ")])],2):e._e(),e._v(" "),e.$slots.headline||e.headline?n("span",{staticClass:"headline"},[e._t("headline",[e._v("\n        "+e._s(e.headline)+"\n      ")])],2):e._e(),e._v(" "),e.$slots.subline||e.subline?n("span",{staticClass:"subline"},[e._t("subline",[e._v("\n        "+e._s(e.subline)+"\n      ")])],2):e._e()])],2)}),[],!1,null,"718636cb",null);t.a=s.exports},168:function(e,t,n){var a=n(183);a.__esModule&&(a=a.default),"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,n(60).default)("a3423b48",a,!0,{sourceMap:!1})},169:function(e,t,n){var a=n(185);a.__esModule&&(a=a.default),"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,n(60).default)("148673c8",a,!0,{sourceMap:!1})},181:function(e,t,n){e.exports=n.p+"img/image.72ec2fe.png"},182:function(e,t,n){"use strict";n(168)},183:function(e,t,n){var a=n(59)(!1);a.push([e.i,"",""]),e.exports=a},184:function(e,t,n){"use strict";n(169)},185:function(e,t,n){var a=n(59)(!1);a.push([e.i,".view-index img{height:32px}",""]),e.exports=a},61:function(e,t,n){"use strict";n.r(t);n(25),n(26),n(28);var a=n(165),i={computed:{storeValue:function(){return this.$store.getters["base/value"]}},methods:{onClick:function(){this.$store.dispatch("base/setValue",!this.storeValue)}}},s=(n(182),n(8)),l=Object(s.a)(i,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"organism-shared-store"},[t("p",[this._v("\n    Store Value: "+this._s(this.storeValue)+" -\n    "),t("button",{on:{click:this.onClick}},[this._v("\n      Change Value\n    ")])])])}),[],!1,null,"60aa4604",null).exports,o={components:{AtomHeadline:a.a,OrganismSharedStore:l},data:function(){return{headline:{overline:null,headline:"Custom-Element Example",subline:null}}},mounted:function(){n.e(4).then(n.bind(null,192))}},r=(n(184),Object(s.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"view-index"},[t("atom-headline",this._b({attrs:{"style-type":"view"}},"atom-headline",this.headline,!1)),this._v(" "),t("img",{attrs:{src:n(181),alt:"image"}}),this._v(" "),t("organism-shared-store")],1)}),[],!1,null,null,null));t.default=r.exports}}]);