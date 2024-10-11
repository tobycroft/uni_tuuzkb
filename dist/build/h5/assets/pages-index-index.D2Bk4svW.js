import{g as s,c as t,a as e,w as o,i as n,o as a,b as l,d as i,t as c,n as d,e as u,f as r,h as f,j as p}from"./index-DE8q-gQA.js";import{_}from"./_plugin-vue_export-helper.BCo6x5W8.js";const g=_({data:()=>({size:22,connectionMessage:"未连接",Endpoint_BeforeDelay:0,Endpoint_delay:0,Endpoint_dynamic_mode:0,LCD1:"",LCD2:"",connectionClass:"status-failed",Mode:0,socket:null}),mounted(){this.reconnect()},methods:{reconnect(){const t=s("config_ip"),e=s("config_port");t&&e&&this.connectWebSocket(`ws://${t}:${e}`)},cmdFunc(s){const t={route:"kbd",type:s};this.socket.send({data:JSON.stringify(t)})},onSliderChange(s,t){this[s]!==t.detail.value&&(this[s]=t.detail.value,console.log(`${s} value:`,t.detail.value),this.socket.send({data:JSON.stringify({route:"semi-config",type:s,data:this.$data})}))},connectWebSocket(s){this.socket=t({url:s,success:()=>{this.connectionMessage="连接成功✔",this.connectionClass="status-success"},fail:()=>{this.connectionMessage="连接失败×",this.connectionClass="status-failed"}}),this.socket.onOpen((()=>{this.connectionMessage="连接建立",this.connectionClass="status-success",this.updateData()})),this.socket.onError((()=>{this.connectionMessage="连接错误",this.connectionClass="status-failed"})),this.socket.onMessage((s=>{if("update"===s.data)this.updateData();else{const t=JSON.parse(s.data);this.updateFormData(t)}})),this.socket.onClose((()=>{this.connectionMessage="连接被关闭",this.connectionClass="status-failed"}))},updateData(){this.socket.send({data:JSON.stringify({route:"info"})})},updateFormData(s){console.log(s);for(const t in s)null!==this[t]&&(this[t]=s[t])},modeOption(s){this.Mode=s,this.socket.send({data:JSON.stringify({route:"semi-config",type:"Mode",data:this.$data})})},endPointOption(s){this.Endpoint_dynamic_mode=s,this.socket.send({data:JSON.stringify({route:"semi-config",type:"Endpoint_dynamic_mode",data:this.$data})})},getEndpointClass(s){return this.Endpoint_dynamic_mode===s?"option-selected":"option"},getModeClass(s){return this.Mode===s?"option-selected":"option"}}},[["render",function(s,t,_,g,h,C){const m=n,k=u,y=r,E=f,O=p;return a(),e(m,{class:"container"},{default:o((()=>[l(m,{class:d([h.connectionClass,"connection-status"])},{default:o((()=>[i(c(h.connectionMessage),1)])),_:1},8,["class"]),l(O,{class:"form"},{default:o((()=>[l(k,{onClick:C.reconnect,class:"submit-button"},{default:o((()=>[i("连接")])),_:1},8,["onClick"]),l(m,{class:"form-group"},{default:o((()=>[l(m,null,{default:o((()=>[i("进度条:")])),_:1}),l(m,null,{default:o((()=>[i("LCD1:"+c(h.LCD1),1)])),_:1}),l(m,null,{default:o((()=>[i("LCD2:"+c(h.LCD2),1)])),_:1})])),_:1}),l(m,{class:"slider-label"},{default:o((()=>[i("前置时间: "+c(h.Endpoint_BeforeDelay),1)])),_:1}),l(y,{value:h.Endpoint_BeforeDelay,min:"0",max:"200",step:"1","show-value":"",activeColor:"#3cc51f",backgroundColor:"#e5e5e5","block-color":"#3cc51f","block-size":"28",onChange:t[0]||(t[0]=s=>C.onSliderChange("Endpoint_BeforeDelay",s))},null,8,["value"]),l(m,{class:"slider-label"},{default:o((()=>[i("间隔时间: "+c(h.Endpoint_delay),1)])),_:1}),l(y,{value:h.Endpoint_delay,min:"0",max:"200",step:"1","show-value":"",activeColor:"#3cc51f",backgroundColor:"#e5e5e5","block-color":"#3cc51f","block-size":"28",onChange:t[1]||(t[1]=s=>C.onSliderChange("Endpoint_delay",s))},null,8,["value"]),l(m,{class:"form-group"},{default:o((()=>[l(E,null,{default:o((()=>[i("选项选择:")])),_:1}),l(m,{class:"radio-group"},{default:o((()=>[l(k,{onClick:t[2]||(t[2]=s=>C.modeOption(0)),class:d(C.getModeClass(0))},{default:o((()=>[i("关闭")])),_:1},8,["class"]),l(k,{onClick:t[3]||(t[3]=s=>C.modeOption(1)),class:d(C.getModeClass(1))},{default:o((()=>[i("On-Q")])),_:1},8,["class"]),l(k,{onClick:t[4]||(t[4]=s=>C.modeOption(2)),class:d(C.getModeClass(2))},{default:o((()=>[i("On-Whel")])),_:1},8,["class"])])),_:1})])),_:1}),l(m,{class:"form-group"},{default:o((()=>[l(E,null,{default:o((()=>[i("选项选择:")])),_:1}),l(m,{class:"radio-group"},{default:o((()=>[l(k,{onClick:t[5]||(t[5]=s=>C.endPointOption(0)),class:d(C.getEndpointClass(0))},{default:o((()=>[i("Ste")])),_:1},8,["class"]),l(k,{onClick:t[6]||(t[6]=s=>C.endPointOption(1)),class:d(C.getEndpointClass(1))},{default:o((()=>[i("Dym")])),_:1},8,["class"]),l(k,{onClick:t[7]||(t[7]=s=>C.endPointOption(2)),class:d(C.getEndpointClass(2))},{default:o((()=>[i("Wde")])),_:1},8,["class"]),l(k,{onClick:t[8]||(t[8]=s=>C.endPointOption(3)),class:d(C.getEndpointClass(3))},{default:o((()=>[i("Ato")])),_:1},8,["class"]),l(k,{onClick:t[9]||(t[9]=s=>C.endPointOption(4)),class:d(C.getEndpointClass(4))},{default:o((()=>[i("Atw")])),_:1},8,["class"]),l(k,{onClick:t[10]||(t[10]=s=>C.endPointOption(5)),class:d(C.getEndpointClass(5))},{default:o((()=>[i("Man")])),_:1},8,["class"])])),_:1})])),_:1}),l(m,{class:"form-group"},{default:o((()=>[l(E,null,{default:o((()=>[i("PowerFunc:")])),_:1}),l(m,{class:"radio-group"},{default:o((()=>[l(k,{onClick:t[11]||(t[11]=s=>C.cmdFunc("reset"))},{default:o((()=>[i("重启")])),_:1}),l(k,{onClick:t[12]||(t[12]=s=>C.cmdFunc("restart"))},{default:o((()=>[i("重启")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-6a4ba74d"]]);export{g as default};
