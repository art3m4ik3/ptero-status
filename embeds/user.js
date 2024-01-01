"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.makeUserEmbed=void 0;const makeUserEmbed=(e,s,a)=>{const n=[];return a.relationships?.servers.data.forEach((({attributes:s})=>{n.push({name:"​",value:`[**${s.name}**](${e.config.pteroHost}/server/${s.uuid})`,inline:!0})})),0===n.length&&n.push({name:e.e("no_servers"),value:"​",inline:!0}),e.embed({title:`${a.username} ${a.root_admin?"🔑":""}`,description:`${a.first_name} ${a.last_name}`,fields:[{name:"UUID",value:a.uuid},{name:"ID",value:`${a.id}`},{name:e.e("email").toUpperCase(),value:a.email,inline:!0},{name:"2FA",value:a["2fa"]?"✅":"❌",inline:!0},{name:"​",value:`**${e.e("servers")}:**`},...n],url:`${e.config.pteroHost}/admin/users/view/${a.id}`},{settings:s})};exports.makeUserEmbed=makeUserEmbed;