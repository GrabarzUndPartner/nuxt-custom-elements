(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{247:function(t,o,r){var content=r(264);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(54).default)("59f850b2",content,!0,{sourceMap:!1})},263:function(t,o,r){"use strict";r(247)},264:function(t,o,r){var e=r(53)(!1);e.push([t.i,".list-primary{--text-opacity:1;color:#51bbaf;color:rgba(81,187,175,var(--text-opacity))}.list-info{--text-opacity:1;color:#4299e1;color:rgba(66,153,225,var(--text-opacity))}.list-success{--text-opacity:1;color:#48bb78;color:rgba(72,187,120,var(--text-opacity))}.list-warning{--text-opacity:1;color:#ed8936;color:rgba(237,137,54,var(--text-opacity))}.list-danger{--text-opacity:1;color:#f56565;color:rgba(245,101,101,var(--text-opacity))}",""]),t.exports=e},286:function(t,o,r){"use strict";r.r(o);r(31);var e={props:{items:{type:Array,default:function(){return[]}},icon:{type:String,default:null},type:{type:String,default:"primary",validator:function(t){return["primary","info","success","warning","danger"].includes(t)}}},computed:{iconName:function(){return this.icon||{primary:"IconBadgeCheck",info:"IconInformationCircle",success:"IconCheckCircle",warning:"IconExclamationCircle",danger:"IconXCircle"}[this.type]}}},c=(r(263),r(2)),component=Object(c.a)(e,(function(){var t=this,o=t.$createElement,r=t._self._c||o;return r("div",t._l(t.items,(function(o,i){return r("div",{key:i,staticClass:"mt-3 flex"},[r("span",{staticClass:"mt-px mr-3 flex-shrink-0",class:"list-"+t.type},[r(t.iconName,{tag:"component",staticClass:"h-6 w-6"})],1),t._v("\n    "+t._s(o)+"\n  ")])})),0)}),[],!1,null,null,null);o.default=component.exports}}]);