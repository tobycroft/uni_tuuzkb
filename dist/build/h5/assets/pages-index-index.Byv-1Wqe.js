import{g as e,c as s,a,w as t,i as o,o as l,b as n,d as c,t as d,n as i,e as u,f as r,r as f,F as k,h as p,j as g,k as _,l as C}from"./index-Dd58Fv1d.js";import{_ as h}from"./_plugin-vue_export-helper.BCo6x5W8.js";const m=h({data:()=>({wake:null,wakeLock:null,MaskCtrl:"",MaskButton:"",pid:"",vid:"",baud:0,connectionMessage:"未连接",Endpoint_BeforeDelay_Random:0,Endpoint_BeforeDelay:0,Endpoint_delay:0,Endpoint_dynamic_mode:0,sep:1,LCD1:"",LCD2:"",connectionClass:"status-failed",Mode:0,socket:null,kbmode:0,kbcfg:0}),mounted(){this.setWakeLock(),this.reconnect()},methods:{reconnect(){const s=e("config_ip");s&&this.connectWebSocket(`${s}`)},cmdFunc(e){const s={route:"kbd",type:e};this.socket.send({data:JSON.stringify(s)})},onSliderChange(e,s){this[e]!==s.detail.value&&(this[e]=s.detail.value,console.log(`${e} value:`,s.detail.value),this.socket.send({data:JSON.stringify({route:"semi-config",type:e,data:this.$data})}))},connectWebSocket(e){this.socket=s({url:e,success:()=>{this.connectionMessage="连接中……",this.connectionClass="status-progress"},fail:()=>{this.connectionMessage="连接失败×",this.connectionClass="status-failed"}}),this.socket.onOpen((()=>{this.connectionMessage="连接建立",this.connectionClass="status-success",this.updateData()})),this.socket.onError((()=>{this.connectionMessage="连接错误",this.connectionClass="status-failed"})),this.socket.onMessage((e=>{if("update"===e.data)this.updateData();else{const s=JSON.parse(e.data);this.updateFormData(s)}})),this.socket.onClose((()=>{this.connectionMessage="连接被关闭",this.connectionClass="status-failed"}))},updateData(){this.socket.send({data:JSON.stringify({route:"info"})});let e=this;setInterval((function(){e.socket.send({data:JSON.stringify({route:"ping"})})}),9e3)},updateFormData(e){console.log(e);for(const s in e)null!==this[s]&&(this[s]=e[s])},modeOption(e){this.Mode=e,this.socket.send({data:JSON.stringify({route:"semi-config",type:"Mode",data:this.$data})})},endPointOption(e){this.Endpoint_dynamic_mode=e,this.socket.send({data:JSON.stringify({route:"semi-config",type:"Endpoint_dynamic_mode",data:this.$data})})},kbModeOption(e){this.kbmode=e,this.socket.send({data:JSON.stringify({route:"semi-config",type:"kbmode",data:this.$data})})},kbCfgOption(e){this.kbcfg=e,this.socket.send({data:JSON.stringify({route:"semi-config",type:"kbcfg",data:this.$data})})},getEndpointClass(e){return this.Endpoint_dynamic_mode===e?"option-selected":"option"},getModeClass(e){return this.Mode===e?"option-selected":"option"},getKbModeClass(e){return this.kbmode===e?"option-selected":"option"},getKbCfgClass(e){return this.kbcfg===e?"option-selected":"option"},setWakeLock(){this.wakeLock||navigator.wakeLock.request("screen").then((e=>{this.wakeLock=e,this.wake="唤醒锁定已激活",console.log("唤醒锁定已激活"),this.wakeLock.addEventListener("release",(()=>{this.wakeLock=null,this.wake="唤醒锁定已释放",console.log("唤醒锁定已释放")}))})).catch((e=>{console.error(`<span class="red">唤醒锁定失败：${e.message}</span>`)}))}}},[["render",function(e,s,h,m,b,M){const y=o,O=p,v=g,D=_,E=C;return l(),a(y,{class:"container"},{default:t((()=>[n(y,{class:i([b.connectionClass,"connection-status"])},{default:t((()=>[c(d(b.connectionMessage),1)])),_:1},8,["class"]),n(E,{class:"form"},{default:t((()=>[n(O,{onClick:M.reconnect,class:"submit-button"},{default:t((()=>[c("连接")])),_:1},8,["onClick"]),n(y,{class:"form-group"},{default:t((()=>[n(y,{class:"radio-group"},{default:t((()=>[n(y,null,{default:t((()=>[c("不息屏:"+d(b.wake),1)])),_:1}),n(y,null,{default:t((()=>[c("PID:"+d(b.pid),1)])),_:1}),n(y,null,{default:t((()=>[c("VID:"+d(b.vid),1)])),_:1}),n(y,null,{default:t((()=>[c("Baud:"+d(b.baud),1)])),_:1})])),_:1}),u("hr"),n(y,{class:"radio-group"},{default:t((()=>[n(y,null,{default:t((()=>[c(" MaskCtrl:")])),_:1}),(l(!0),r(k,null,f(b.MaskCtrl,(e=>(l(),a(y,{key:e},{default:t((()=>[c(d(e),1)])),_:2},1024)))),128))])),_:1}),u("hr"),n(y,{class:"radio-group"},{default:t((()=>[c(" MaskButton: "),(l(!0),r(k,null,f(b.MaskButton,(e=>(l(),a(y,{class:"radio-group",key:e},{default:t((()=>[c(d(e),1)])),_:2},1024)))),128))])),_:1}),u("hr"),n(y,{class:"radio-group"},{default:t((()=>[c("LCD1:"+d(b.LCD1),1)])),_:1}),u("hr"),n(y,{class:"radio-group"},{default:t((()=>[c("LCD2:"+d(b.LCD2),1)])),_:1})])),_:1}),u("hr"),n(y,{class:"slider-label"},{default:t((()=>[c("前置震动: "+d(b.Endpoint_BeforeDelay_Random),1)])),_:1}),n(v,{value:b.Endpoint_BeforeDelay_Random,min:"0",max:"30",step:"1","show-value":"",activeColor:"#3cc51f",backgroundColor:"#e5e5e5","block-color":"#3cc51f","block-size":"28",onChange:s[0]||(s[0]=e=>M.onSliderChange("Endpoint_BeforeDelay_Random",e))},null,8,["value"]),n(y,{class:"slider-label"},{default:t((()=>[c("前置时间: "+d(b.Endpoint_BeforeDelay),1)])),_:1}),n(v,{value:b.Endpoint_BeforeDelay,min:"0",max:"50",step:"1","show-value":"",activeColor:"#3cc51f",backgroundColor:"#e5e5e5","block-color":"#3cc51f","block-size":"28",onChange:s[1]||(s[1]=e=>M.onSliderChange("Endpoint_BeforeDelay",e))},null,8,["value"]),n(y,{class:"slider-label"},{default:t((()=>[c("操作间隔: "+d(b.Endpoint_delay),1)])),_:1}),n(v,{value:b.Endpoint_delay,min:"0",max:"200",step:"1","show-value":"",activeColor:"#3cc51f",backgroundColor:"#e5e5e5","block-color":"#3cc51f","block-size":"28",onChange:s[2]||(s[2]=e=>M.onSliderChange("Endpoint_delay",e))},null,8,["value"]),n(y,{class:"form-group"},{default:t((()=>[n(D,null,{default:t((()=>[c("选项选择:")])),_:1}),n(y,{class:"radio-group"},{default:t((()=>[n(O,{onClick:s[3]||(s[3]=e=>M.modeOption(0)),class:i(M.getModeClass(0))},{default:t((()=>[c("关闭")])),_:1},8,["class"]),n(O,{onClick:s[4]||(s[4]=e=>M.modeOption(1)),class:i(M.getModeClass(1))},{default:t((()=>[c("On-Q")])),_:1},8,["class"]),n(O,{onClick:s[5]||(s[5]=e=>M.modeOption(2)),class:i(M.getModeClass(2))},{default:t((()=>[c("On-Whel")])),_:1},8,["class"])])),_:1})])),_:1}),n(y,{class:"form-group"},{default:t((()=>[n(D,null,{default:t((()=>[c("选项选择:")])),_:1}),n(y,{class:"radio-group"},{default:t((()=>[n(O,{onClick:s[6]||(s[6]=e=>M.endPointOption(0)),class:i(M.getEndpointClass(0))},{default:t((()=>[c("Ste")])),_:1},8,["class"]),n(O,{onClick:s[7]||(s[7]=e=>M.endPointOption(1)),class:i(M.getEndpointClass(1))},{default:t((()=>[c("Dym")])),_:1},8,["class"]),n(O,{onClick:s[8]||(s[8]=e=>M.endPointOption(2)),class:i(M.getEndpointClass(2))},{default:t((()=>[c("Wde")])),_:1},8,["class"]),n(O,{onClick:s[9]||(s[9]=e=>M.endPointOption(3)),class:i(M.getEndpointClass(3))},{default:t((()=>[c("Ato")])),_:1},8,["class"]),n(O,{onClick:s[10]||(s[10]=e=>M.endPointOption(4)),class:i(M.getEndpointClass(4))},{default:t((()=>[c("Atw")])),_:1},8,["class"]),n(O,{onClick:s[11]||(s[11]=e=>M.endPointOption(5)),class:i(M.getEndpointClass(5))},{default:t((()=>[c("Man")])),_:1},8,["class"])])),_:1})])),_:1}),n(y,{class:"form-group"},{default:t((()=>[n(D,null,{default:t((()=>[c("BaseFunc:")])),_:1}),n(y,{class:"radio-group"},{default:t((()=>[n(O,{onClick:s[12]||(s[12]=e=>M.cmdFunc("setting_reset"))},{default:t((()=>[c("重置")])),_:1}),n(O,{onClick:s[13]||(s[13]=e=>M.cmdFunc("bankey"))},{default:t((()=>[c("屏蔽键")])),_:1}),n(O,{onClick:s[14]||(s[14]=e=>M.cmdFunc("unbanall"))},{default:t((()=>[c("解除屏蔽")])),_:1})])),_:1})])),_:1}),n(y,{class:"slider-label"},{default:t((()=>[c("系统Sep: "+d(b.sep),1)])),_:1}),n(v,{value:b.sep,min:"1",max:"50",step:"1","show-value":"",activeColor:"#3cc51f",backgroundColor:"#e5e5e5","block-color":"#3cc51f","block-size":"28",onChange:s[15]||(s[15]=e=>M.onSliderChange("sep",e))},null,8,["value"]),n(y,{class:"form-group"},{default:t((()=>[n(D,null,{default:t((()=>[c("PowerFunc:")])),_:1}),n(y,{class:"radio-group"},{default:t((()=>[n(O,{onClick:s[16]||(s[16]=e=>M.cmdFunc("reset"))},{default:t((()=>[c("重启")])),_:1}),n(O,{onClick:s[17]||(s[17]=e=>M.cmdFunc("cfgget"))},{default:t((()=>[c("获取CFG")])),_:1})])),_:1}),n(D,null,{default:t((()=>[c("CFG-Baud:")])),_:1}),n(y,{class:"radio-group"},{default:t((()=>[n(O,{onClick:s[18]||(s[18]=e=>M.cmdFunc("cfg3k"))},{default:t((()=>[c("B-300K")])),_:1}),n(O,{onClick:s[19]||(s[19]=e=>M.cmdFunc("cfg115k"))},{default:t((()=>[c("B-115k")])),_:1}),n(O,{onClick:s[20]||(s[20]=e=>M.cmdFunc("cfg9k"))},{default:t((()=>[c("B-9k")])),_:1})])),_:1}),n(D,null,{default:t((()=>[c("DefFunc:")])),_:1}),n(y,{class:"radio-group"},{default:t((()=>[n(O,{onClick:s[21]||(s[21]=e=>M.cmdFunc("05ac"))},{default:t((()=>[c("Def115")])),_:1}),n(O,{onClick:s[22]||(s[22]=e=>M.cmdFunc("alldef9k"))},{default:t((()=>[c("Def9k")])),_:1}),n(O,{onClick:s[23]||(s[23]=e=>M.cmdFunc("setusb"))},{default:t((()=>[c("设定USBstr")])),_:1})])),_:1}),n(y,{class:"form-group"},{default:t((()=>[n(D,null,{default:t((()=>[c("键盘模式:")])),_:1}),n(y,{class:"radio-group"},{default:t((()=>[n(O,{onClick:s[24]||(s[24]=e=>M.kbModeOption(0)),class:i(M.getKbModeClass(0))},{default:t((()=>[c("M1")])),_:1},8,["class"]),n(O,{onClick:s[25]||(s[25]=e=>M.kbModeOption(1)),class:i(M.getKbModeClass(1))},{default:t((()=>[c("M2")])),_:1},8,["class"]),n(O,{onClick:s[26]||(s[26]=e=>M.kbModeOption(2)),class:i(M.getKbModeClass(2))},{default:t((()=>[c("M3")])),_:1},8,["class"]),n(O,{onClick:s[27]||(s[27]=e=>M.kbModeOption(3)),class:i(M.getKbModeClass(3))},{default:t((()=>[c("M4")])),_:1},8,["class"])])),_:1})])),_:1}),n(y,{class:"form-group"},{default:t((()=>[n(D,null,{default:t((()=>[c("通信模式:")])),_:1}),n(y,{class:"radio-group"},{default:t((()=>[n(O,{onClick:s[28]||(s[28]=e=>M.kbCfgOption(0)),class:i(M.getKbCfgClass(0))},{default:t((()=>[c("Norm")])),_:1},8,["class"]),n(O,{onClick:s[29]||(s[29]=e=>M.kbCfgOption(1)),class:i(M.getKbCfgClass(1))},{default:t((()=>[c("ASCII")])),_:1},8,["class"]),n(O,{onClick:s[30]||(s[30]=e=>M.kbCfgOption(2)),class:i(M.getKbCfgClass(2))},{default:t((()=>[c("Pass")])),_:1},8,["class"])])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-8dbf50ed"]]);export{m as default};
