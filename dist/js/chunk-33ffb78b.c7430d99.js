(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-33ffb78b"],{"1b46":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pdw-loader is-flex is-justify-content-center is-align-items-center"},[a("button",{staticClass:"button is-loading is-large is-rounded is-info is-outlined"})])}],i={name:"Loader"},o=i,s=(a("c0b3"),a("2877")),c=Object(s["a"])(o,n,r,!1,null,"47516428",null);e["a"]=c.exports},"368b":function(t,e,a){"use strict";a("d08d")},c0b3:function(t,e,a){"use strict";a("ec65")},d08d:function(t,e,a){},ec65:function(t,e,a){},f4eb:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h1",{staticClass:"is-size-4 mb-2"},[t._v("Report 1: Manufacturer's Product Report")]),t.loading?a("loader"):t._e(),a("div",{directives:[{name:"show",rawName:"v-show",value:t.dataSet&&t.dataSet.length>0,expression:"dataSet && dataSet.length > 0"}],staticClass:"block"},[a("table",{staticClass:"table is-striped is-hoverable is-fullwidth drill-down-table"},[t._m(0),a("tbody",t._l(t.dataSet,(function(e,n){return a("tr",{key:n,on:{click:function(a){return t.showDetail(e)}}},[a("th",[t._v(t._s(n+1))]),a("td",[t._v(t._s(e.ManufacturerName))]),a("td",[t._v(t._s(e.TotalProducts))]),a("td",[t._v(" "+t._s(null===e.AverageRetailPrice?"N/A":t.moneyFormatter(e.AverageRetailPrice))+" ")]),a("td",[t._v(" "+t._s(null===e.MinimumRetailPrice?"N/A":t.moneyFormatter(e.MinimumRetailPrice))+" ")]),a("td",[t._v(" "+t._s(null===e.MaximumRetailPrice?"N/A":t.moneyFormatter(e.MaximumRetailPrice))+" ")])])})),0)])])],1)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("Row")]),a("th",[t._v("Manufacturer Name")]),a("th",[t._v("Total Products")]),a("th",[t._v("Average Retail Price")]),a("th",[t._v("Minimum Retail Price")]),a("th",[t._v("Maximum Retail Price")])])])}],i=(a("d3b7"),a("1b46")),o={name:"Report1Summary",components:{Loader:i["a"]},data:function(){return{dataSet:[],loading:!1}},created:function(){var t=this;this.loading=!0,this.$api.get("report1.json").then((function(e){t.dataSet=e.data})).catch((function(e){t.$toasted.error("An error occured, unable to retrieve data, see console for detail"),console.log(e)})).finally((function(){t.loading=!1}))},methods:{showDetail:function(t){this.$router.push({name:"Report1Detail",params:{parentData:t}})},moneyFormatter:function(t){var e=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"});return e.format(t)}}},s=o,c=(a("368b"),a("2877")),l=Object(c["a"])(s,n,r,!1,null,"cfafce62",null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-33ffb78b.c7430d99.js.map