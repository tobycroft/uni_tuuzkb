import{g as t,s as e,k as s,a as o,w as a,i,o as l,b as d,d as n,I as p,e as r}from"./index-BEFT-iLw.js";import{_ as c}from"./_plugin-vue_export-helper.BCo6x5W8.js";const u=c({data:()=>({ipAddress:"",port:""}),mounted(){const e=t("config_ip"),s=t("config_port");e&&(this.ipAddress=e),s&&(this.port=s)},methods:{setConfiguration(){""!==this.ipAddress&&""!==this.port?(s("config_ip",this.ipAddress),s("config_port",this.port),e({title:"设置已保存",icon:"success"})):e({title:"请输入有效的 IP 地址和端口号",icon:"none"})}}},[["render",function(t,e,s,c,u,f){const _=i,m=p,h=r;return l(),o(_,{class:"container"},{default:a((()=>[d(_,{class:"title"},{default:a((()=>[n("服务器设置")])),_:1}),d(_,{class:"input-container"},{default:a((()=>[d(m,{type:"text",placeholder:"请输入 IP 地址 或 http(s) 地址",modelValue:u.ipAddress,"onUpdate:modelValue":e[0]||(e[0]=t=>u.ipAddress=t),class:"input-field"},null,8,["modelValue"]),d(m,{type:"text",placeholder:"请输入端口号",modelValue:u.port,"onUpdate:modelValue":e[1]||(e[1]=t=>u.port=t),class:"input-field"},null,8,["modelValue"])])),_:1}),d(h,{onClick:f.setConfiguration,class:"set-button"},{default:a((()=>[n("设定")])),_:1},8,["onClick"])])),_:1})}],["__scopeId","data-v-764e9980"]]);export{u as default};
