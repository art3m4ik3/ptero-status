"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.makeLiveServerEmbed=void 0;const status_1=require("./status"),console_1=require("./console"),makeLiveServerEmbed=(e,s,i,t,a)=>{const r=i.relationships.allocations.data.find((e=>!0===e.attributes.is_default))?.attributes,n=e.embed({title:`${i.name}`,description:a?"```ansi\n"+(0,console_1.logsUnderLimit)(a)+"\n```":i.description,fields:[{name:e.e("egg").toUpperCase(),value:i.relationships.egg?.attributes.name??"",inline:!0},{name:e.e("server_id").toUpperCase(),value:i.identifier,inline:!0},{name:e.e("connection").toUpperCase(),value:`${r?.ip_alias??r?.ip}:${r?.port}`,inline:!1}],url:`${e.config.pteroHost}/server/${i.identifier}`},{settings:s});return i.is_suspended?n.addFields([{name:e.e("status").toUpperCase(),value:e.e("suspended").toUpperCase()}]):(n.addFields([{name:"​",value:`**${e.e("server_info").toUpperCase()}:**`}]),t?n.addFields((0,status_1.serverStatusFields)(e,t)):n.addFields([{name:e.e("not_available").toUpperCase(),value:"​",inline:!0}])),n};exports.makeLiveServerEmbed=makeLiveServerEmbed;