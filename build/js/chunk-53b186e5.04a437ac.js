(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-53b186e5"],{"481f":function(e,t,n){"use strict";n.r(t);n("b0c0");var c=n("7a23"),o={class:"navBarContainer"},i={class:"navBar"},a=["onClick"];function r(e,t,n,r,l,m){var u=Object(c["resolveComponent"])("router-view"),s=Object(c["resolveComponent"])("el-scrollbar");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",null,[Object(c["createElementVNode"])("div",o,[Object(c["createElementVNode"])("div",i,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(e.navBarData,(function(t,n){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:Object(c["normalizeClass"])(["barItem",n===e.activeNum?"active":""]),key:n,onClick:function(c){return e.clickBarItem(t.path,n)}},Object(c["toDisplayString"])(t.name),11,a)})),128))])]),Object(c["createVNode"])(s,{height:e.heights,class:"scr"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(u)]})),_:1},8,["height"])])}var l=n("afbc"),m=n("0613"),u=Object(c["defineComponent"])({setup:function(){var e=Object(m["c"])(),t=[{name:"个性推荐",path:"/main/discovr/music/recommend",id:0},{name:"歌单",path:"/main/discovr/music/musiclist",id:1},{name:"排行榜",path:"/main/discovr/music/ranking",id:2},{name:"歌手",path:"/main/discovr/music/singer",id:3}],n=Object(c["computed"])((function(){return e.state.songnumber})),o=function(t,n){e.commit("songnumber",n),l["a"].push({path:t})},i=function(e){window.open(e,"_blank")},a=(Object(c["ref"])(),Object(c["ref"])("".concat(document.documentElement.clientHeight/1.4,"px")));return window.onresize=function(){console.log("宽度",document.documentElement.clientWidth),console.log("高度",document.documentElement.clientHeight)},console.log("宽度aa",document.documentElement.clientWidth),console.log("高度aa",document.documentElement.clientHeight),{navBarData:t,clickBarItem:o,imgclick:i,activeNum:n,heights:a}}}),s=(n("4dd8"),n("d3cc"),n("6b0d")),d=n.n(s);const b=d()(u,[["render",r],["__scopeId","data-v-e74285f6"]]);t["default"]=b},"489e":function(e,t,n){},"4dd8":function(e,t,n){"use strict";n("489e")},"8f4a":function(e,t,n){},d3cc:function(e,t,n){"use strict";n("8f4a")}}]);
//# sourceMappingURL=chunk-53b186e5.04a437ac.js.map