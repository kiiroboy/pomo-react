(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,a){e.exports=a(20)},16:function(e,t,a){},17:function(e,t,a){},19:function(e,t,a){},20:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(8),i=a.n(l),s=(a(16),a(17),a(2)),o=a(3),u=a(5),c=a(4),d=a(6),h=a(1),p=(a(18),function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return this.props.status?r.a.createElement("button",{onClick:this.props.onClick},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},r.a.createElement("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1.5",d:"M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"}))):r.a.createElement("button",{onClick:this.props.onClick},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},r.a.createElement("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1.5",d:"M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"}),r.a.createElement("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1.5",d:"M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})))}}]),t}(r.a.Component));a(19);var m=function(e){return r.a.createElement("button",e,r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},r.a.createElement("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1.5",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})))},v=a(9);var g=function(e){return r.a.createElement("button",e,r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},r.a.createElement("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1.5",d:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"}),r.a.createElement("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1.5",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"})))},w=25,E=100,f=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(c.a)(t).call(this,e))).handlePlayPause=function(){a.state.playing?(a.setState({playing:!a.state.playing}),a.updateDisplay(Math.round(a.currDur)),window.clearTimeout(a.timeout)):(a.setState({playing:!a.state.playing}),a.timeout=setTimeout(function(){a.handleReset()},a.currDur*E))},a.handleReset=function(){a.setState({playing:!1}),a.currVal=0,a.currDur=a.state.initial,window.clearTimeout(a.timeout),a.updateDisplay(Math.round(a.state.initial))},a.state={playing:!1,initial:w,seconds:"",minutes:"",hours:""},a.currVal=0,a.currDur=w,a.timeout=void 0,a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){console.log("did mount"),this.updateDisplay(w)}},{key:"updateTime",value:function(e,t){var a=this.autopad(t),n=isNaN(parseInt(a))?0:parseInt(a);n>60?n=59:(60===n||n<0)&&(n=0),console.log(a),"s"===e?(this.setState({seconds:a}),this.updateInput("s",n)):"m"===e?(this.setState({minutes:a}),this.updateInput("m",n)):(this.setState({hours:a}),this.updateInput("h",n)),this.currVal=0,this.currDur=this.state.initial,window.clearTimeout(this.timeout),this.setState({playing:!1})}},{key:"autopad",value:function(e){return(e=e.toString()).length<2?e.padStart(2,"0"):e.slice(-2)}},{key:"updateDisplay",value:function(e){var t=this.secondsToTime(e);console.log(this.autopad(t.h)),this.setState({hours:this.autopad(t.h)}),this.setState({minutes:this.autopad(t.m)}),this.setState({seconds:this.autopad(t.s)})}},{key:"secondsToTime",value:function(e){var t=e%3600,a=t%60;return{h:Math.floor(e/3600),m:Math.floor(t/60),s:Math.ceil(a)}}},{key:"updateInput",value:function(e,t){var a=this.currDur%60,n=Math.floor(this.currDur/60)%60,r=Math.floor(this.currDur/3600)%60;this.currDur="s"===e?t+60*n+3600*r:"m"===e?a+60*t+3600*r:a+60*n+3600*t,this.setState({initial:this.currDur}),this.currDur=this.state.initial}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{class:!0},r.a.createElement(v.a,{start:function(){return{value:e.currVal,seconds:e.currDur}},update:function(){return{value:[e.state.playing?100:e.currVal],seconds:[e.state.playing?0:e.currDur],timing:{duration:[e.state.playing?e.currDur*E:0]}}}},function(t){var a=t.value,n=t.seconds,l=e.secondsToTime(Math.round(n));return e.state.playing?(e.currVal=a,e.currDur=n,r.a.createElement("div",{class:"timer"},r.a.createElement("div",{class:"parent"},r.a.createElement(h.a,{value:a,strokeWidth:3,styles:Object(h.b)({pathTransition:"none"})}),r.a.createElement("div",{class:"child"},r.a.createElement("label",{class:"text"},r.a.createElement("input",{class:"disabledInput",value:"".concat(l.h.toString().padStart(2,"0")),onKeyDown:e.handleKeyDownH,onBlur:e.handleOnBlurH,disabled:!0}),":",r.a.createElement("input",{class:"disabledInput",value:"".concat(l.m.toString().padStart(2,"0")),onKeyDown:e.handleKeyDownM,onBlur:e.handleOnBlurM,disabled:!0}),":",r.a.createElement("input",{class:"disabledInput",value:"".concat(l.s.toString().padStart(2,"0")),onKeyDown:e.handleKeyDownS,onBlur:e.handleOnBlurS,disabled:!0})))),r.a.createElement("div",{class:"timer_button"},r.a.createElement(p,{status:e.state.playing,onClick:e.handlePlayPause}),r.a.createElement(m,{onClick:e.handleReset}),r.a.createElement(g,null)))):r.a.createElement("div",{class:"timer"},r.a.createElement("div",{class:"parent"},r.a.createElement(h.a,{value:a,strokeWidth:3,styles:Object(h.b)({pathTransition:"none"})}),r.a.createElement("div",{class:"child"},r.a.createElement("label",{class:"text"},r.a.createElement("input",{class:"activeInput",placeholder:e.state.hours,value:e.state.hours,onKeyDown:function(t){e.updateTime("h",t.target.value)},onBlur:function(t){e.updateTime("h",t.target.value)},onChange:function(t){e.updateTime("h",t.target.value)}}),":",r.a.createElement("input",{class:"activeInput",placeholder:e.state.minutes,value:e.state.minutes,onKeyDown:function(t){e.updateTime("m",t.target.value)},onBlur:function(t){return e.updateTime("m",t.target.value)},onChange:function(t){e.updateTime("m",t.target.value)}}),":",r.a.createElement("input",{class:"activeInput",placeholder:e.state.seconds,value:e.state.seconds,onKeyDown:function(t){e.updateTime("s",t.target.value)},onBlur:function(t){e.updateTime("s",t.target.value)},onChange:function(t){e.updateTime("s",t.target.value)}})))),r.a.createElement("div",{class:"timer_button"},r.a.createElement(p,{status:e.state.playing,onClick:e.handlePlayPause}),r.a.createElement(m,{onClick:e.handleReset}),r.a.createElement(g,null)))}))}}]),t}(r.a.Component);var k=function(){return r.a.createElement("div",null,r.a.createElement("div",{class:"top"},r.a.createElement("main",null,r.a.createElement(f,null))))},y=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,21)).then(function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,l=t.getLCP,i=t.getTTFB;a(e),n(e),r(e),l(e),i(e)})};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(k,null)),document.getElementById("root")),y()}},[[11,1,2]]]);
//# sourceMappingURL=main.ff5ad8c5.chunk.js.map