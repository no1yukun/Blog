(function(){"use strict";var e={5492:function(e,t,n){var o=n(6369),r=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("div",{staticClass:"app-nav"},[t("div",{staticClass:"app-nav-inner"},[t("el-menu",{staticClass:"app-nav-menu",attrs:{mode:"horizontal","active-text-color":"#1989fa","default-active":e.activeRoute,router:""}},[t("el-menu-item",{attrs:{index:"/home"}},[e._v("vue-simple-uploader")]),t("el-menu-item",{attrs:{index:"/about"}},[e._v("关于")])],1),t("div",{staticClass:"app-nav-title"},[e._v("Vue Uploader Solutions")])],1)]),t("div",{staticClass:"app-main"},[t("div",{staticClass:"container"},[t("router-view")],1)]),t("global-uploader")],1)},i=[],s=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"global-uploader"}},[t("uploader",{ref:"uploader",staticClass:"uploader-app",attrs:{options:e.options,fileStatusText:e.fileStatusText,autoStart:!1},on:{"file-added":e.onFileAdded,"file-success":e.onFileSuccess,"file-progress":e.onFileProgress,"file-error":e.onFileError}},[t("uploader-unsupport"),t("uploader-btn",{ref:"uploadBtn",attrs:{id:"global-uploader-btn"}},[e._v("选择文件")]),t("uploader-list",{directives:[{name:"show",rawName:"v-show",value:e.panelShow,expression:"panelShow"}],scopedSlots:e._u([{key:"default",fn:function(n){return t("div",{staticClass:"file-panel",class:{collapse:e.collapse}},[t("div",{staticClass:"file-title"},[t("div",{staticClass:"title"},[e._v("文件列表")]),t("div",{staticClass:"operate"},[t("el-button",{attrs:{type:"text",title:e.collapse?"展开":"折叠"},on:{click:function(t){e.collapse=!e.collapse}}},[t("i",{staticClass:"iconfont",class:e.collapse?"el-icon-full-screen":"el-icon-minus"})]),t("el-button",{attrs:{type:"text",title:"关闭"},on:{click:e.close}},[t("i",{staticClass:"el-icon-close"})])],1)]),t("ul",{staticClass:"file-list"},[e._l(n.fileList,(function(e){return t("li",{key:e.id,staticClass:"file-item",class:`file-${e.id}`},[t("uploader-file",{ref:"files",refInFor:!0,class:"file_"+e.id,attrs:{file:e,list:!0}})],1)})),n.fileList.length?e._e():t("div",{staticClass:"no-file"},[t("i",{staticClass:"iconfont icon-empty-file"}),e._v(" 暂无待上传文件 ")])],2)])}}])})],1)],1)},a=[];const l={image:[".png",".jpg",".jpeg",".gif",".bmp"],video:[".mp4",".rmvb",".mkv",".wmv",".flv"],document:[".doc",".docx",".xls",".xlsx",".ppt",".pptx",".pdf",".txt",".tif",".tiff"],getAll(){return[...this.image,...this.video,...this.document]}};var u=n(8558),c=n(7335),d=n.n(c);function f(){return Promise.resolve()}var p={data(){return{options:{target:"",chunkSize:"2048000",fileParameterName:"upfile",maxChunkRetries:3,testChunks:!0,checkChunkUploadedByResponse:function(e,t){let n=JSON.parse(t);return!!n.skipUpload||(n.uploaded||[]).indexOf(e.offset+1)>=0},query:(e,t)=>({...e.params})},fileStatusText:{success:"上传成功",error:"上传失败",uploading:"上传中",paused:"已暂停",waiting:"等待上传"},panelShow:!1,collapse:!1,params:{}}},mounted(){u.Z.$on("openUploader",(({params:e={},options:t={}})=>{this.params=e,this.customizeOptions(t),this.$refs.uploadBtn&&this.$refs.uploadBtn.$el.click()}))},computed:{uploader(){return this.$refs.uploader.uploader}},methods:{customizeOptions(e){e.target&&(this.uploader.opts.target=e.target),void 0!==e.testChunks&&(this.uploader.opts.testChunks=e.testChunks),this.mergeFn=e.mergeFn||f;let t=document.querySelector("#global-uploader-btn input"),n=e.accept||l.getAll();t.setAttribute("accept",n.join())},onFileAdded(e){this.panelShow=!0,u.Z.$emit("fileAdded"),e.params=this.params,this.computeMD5(e).then((e=>this.startUpload(e)))},computeMD5(e){let t=new FileReader,n=(new Date).getTime(),o=File.prototype.slice||File.prototype.mozSlice||File.prototype.webkitSlice,r=0;const i=1024e4;let s=Math.ceil(e.size/i),a=new(d().ArrayBuffer);return this.statusSet(e.id,"md5"),e.pause(),this.$nextTick((()=>{document.querySelector(`.file-${e.id} .uploader-file-resume`).style.display="none"})),l(),new Promise(((o,i)=>{t.onload=t=>{if(a.append(t.target.result),r<s)r++,l(),this.$nextTick((()=>{const t="校验MD5 "+(r/s*100).toFixed(0)+"%";document.querySelector(`.custom-status-${e.id}`).innerText=t}));else{let t=a.end();o({md5:t,file:e}),console.log(`MD5计算完毕：${e.name} \nMD5：${t} \n分片：${s} 大小:${e.size} 用时：${(new Date).getTime()-n} ms`)}},t.onerror=function(){this.error(`文件${e.name}读取出错，请检查该文件`),e.cancel(),i()}}));function l(){let n=r*i,s=n+i>=e.size?e.size:n+i;t.readAsArrayBuffer(o.call(e.file,n,s))}},startUpload({md5:e,file:t}){t.uniqueIdentifier=e,t.resume(),this.statusRemove(t.id)},onFileSuccess(e,t,n,o){let r=JSON.parse(n);if(!r.result)return this.error(r.message),void this.statusSet(t.id,"failed");r.needMerge?(this.statusSet(t.id,"merging"),this.mergeFn({tempName:r.tempName,fileName:t.name,...t.params}).then((e=>{u.Z.$emit("fileSuccess"),this.statusRemove(t.id)})).catch((e=>{}))):(u.Z.$emit("fileSuccess"),console.log("上传成功"))},onFileProgress(e,t,n){console.log(`上传中 ${t.name}，chunk：${n.startByte/1024/1024} ~ ${n.endByte/1024/1024}`)},onFileError(e,t,n,o){this.error(n)},close(){this.uploader.cancel(),this.panelShow=!1},statusSet(e,t){let n={md5:{text:"校验MD5",bgc:"#fff"},merging:{text:"合并中",bgc:"#e2eeff"},transcoding:{text:"转码中",bgc:"#e2eeff"},failed:{text:"上传失败",bgc:"#e2eeff"}};this.$nextTick((()=>{const o=document.createElement("p");o.className=`custom-status-${e} custom-status`,o.innerText=n[t].text,o.style.backgroundColor=n[t].bgc;const r=document.querySelector(`.file_${e} .uploader-file-status`);r.appendChild(o)}))},statusRemove(e){this.$nextTick((()=>{const t=document.querySelector(`.custom-status-${e}`);t.remove()}))},error(e){this.$notify({title:"错误",message:e,type:"error",duration:2e3})}}},m=p,h=n(1001),v=(0,h.Z)(m,s,a,!1,null,null,null),g=v.exports,b={name:"app",components:{GlobalUploader:g},data(){return{activeRoute:""}},watch:{"$route.path":{handler(e){this.activeRoute=e},immediate:!1}}},y=b,C=(0,h.Z)(y,r,i,!1,null,null,null),S=C.exports,k=n(2631);o["default"].use(k.Z);var x=new k.Z({mode:"history",base:"/vue-uploader-solutions/",routes:[{path:"/",redirect:"/home"},{path:"/home",name:"home",component:()=>n.e(536).then(n.bind(n,3536))},{path:"/about",name:"about",component:()=>n.e(171).then(n.bind(n,8171))},{path:"*",redirect:"/"}]}),w=n(3103),$=n.n(w),_=n(8499),F=n.n(_);o["default"].use($()),o["default"].use(F()),o["default"].config.productionTip=!1,new o["default"]({router:x,render:e=>e(S)}).$mount("#app")},8558:function(e,t,n){var o=n(6369);t["Z"]=new o["default"]}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,o,r,i){if(!o){var s=1/0;for(c=0;c<e.length;c++){o=e[c][0],r=e[c][1],i=e[c][2];for(var a=!0,l=0;l<o.length;l++)(!1&i||s>=i)&&Object.keys(n.O).every((function(e){return n.O[e](o[l])}))?o.splice(l--,1):(a=!1,i<s&&(s=i));if(a){e.splice(c--,1);var u=r();void 0!==u&&(t=u)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[o,r,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,o){return n.f[o](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{171:"200a437f",536:"3da343e0"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{171:"9d29b676",536:"5816b05f"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="vue-uploader-soultions:";n.l=function(o,r,i,s){if(e[o])e[o].push(r);else{var a,l;if(void 0!==i)for(var u=document.getElementsByTagName("script"),c=0;c<u.length;c++){var d=u[c];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==t+i){a=d;break}}a||(l=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,n.nc&&a.setAttribute("nonce",n.nc),a.setAttribute("data-webpack",t+i),a.src=o),e[o]=[r];var f=function(t,n){a.onerror=a.onload=null,clearTimeout(p);var r=e[o];if(delete e[o],a.parentNode&&a.parentNode.removeChild(a),r&&r.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=f.bind(null,a.onerror),a.onload=f.bind(null,a.onload),l&&document.head.appendChild(a)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/vue-uploader-solutions/"}(),function(){var e=function(e,t,n,o){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css";var i=function(i){if(r.onerror=r.onload=null,"load"===i.type)n();else{var s=i&&("load"===i.type?"missing":i.type),a=i&&i.target&&i.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=s,l.request=a,r.parentNode.removeChild(r),o(l)}};return r.onerror=r.onload=i,r.href=t,document.head.appendChild(r),r},t=function(e,t){for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var r=n[o],i=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(i===e||i===t))return r}var s=document.getElementsByTagName("style");for(o=0;o<s.length;o++){r=s[o],i=r.getAttribute("data-href");if(i===e||i===t)return r}},o=function(o){return new Promise((function(r,i){var s=n.miniCssF(o),a=n.p+s;if(t(s,a))return r();e(o,a,r,i)}))},r={143:0};n.f.miniCss=function(e,t){var n={171:1,536:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=o(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,o){var r=n.o(e,t)?e[t]:void 0;if(0!==r)if(r)o.push(r[2]);else{var i=new Promise((function(n,o){r=e[t]=[n,o]}));o.push(r[2]=i);var s=n.p+n.u(t),a=new Error,l=function(o){if(n.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var i=o&&("load"===o.type?"missing":o.type),s=o&&o.target&&o.target.src;a.message="Loading chunk "+t+" failed.\n("+i+": "+s+")",a.name="ChunkLoadError",a.type=i,a.request=s,r[1](a)}};n.l(s,l,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,i,s=o[0],a=o[1],l=o[2],u=0;if(s.some((function(t){return 0!==e[t]}))){for(r in a)n.o(a,r)&&(n.m[r]=a[r]);if(l)var c=l(n)}for(t&&t(o);u<s.length;u++)i=s[u],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(c)},o=self["webpackChunkvue_uploader_soultions"]=self["webpackChunkvue_uploader_soultions"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(5492)}));o=n.O(o)})();