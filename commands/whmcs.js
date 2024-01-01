"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.cmd=exports.run=void 0;const Command_1=require("../classes/Command"),WhmcsAPI_1=require("../modules/WhmcsAPI"),uuid_apikey_1=__importDefault(require("uuid-apikey")),whmcs_1=require("../embeds/whmcs"),run=async({bot:e,settings:t,interaction:s,client:i})=>{const n=s.options.getSubcommand();if("setup"===n){if(!s.guildId)return;const n=s.options.getString("identifier",!0),r=s.options.getString("secret",!0),o=s.options.getString("url",!0),c=s.options.getChannel("channel",!0),a={setup:!0,whmcsApiUrl:o.endsWith("/")?o.slice(0,-1):o,whmcsApiIdentifier:n,whmcsApiSecret:r,whmcsAdminLogsChannel:c.id,whmcsAPIBot:""};t.whmcs=a;const d=new WhmcsAPI_1.WhmcsAPI(t);await d.call("GetHealthStatus").catch((e=>{throw console.error(e),e})),a.whmcsAPIBot=uuid_apikey_1.default.create({noDashes:!0}).apiKey;let m=`FQDN:${e.config.serverPort}`;try{const t=await i.getServerInfo(e.config.botServerUUID),s=t.relationships.allocations.data.find((e=>!0===e.attributes.is_default))?.attributes;m=`${s?.ip_alias??s?.ip??"FQDN"}:${e.config.serverPort}`}catch(e){}e.settings.set(s.guildId,a,"whmcs"),await s.editReply({embeds:[e.embed({title:"WHMCS config",description:`\`\`\`$GLOBALS['discordBotURL'] = "${m}";\n$GLOBALS['discordServerID'] = "${s.guildId}";\n$GLOBALS['discordBotToken'] = "${a.whmcsAPIBot}";\`\`\``},{settings:t})]})}else if("show"===n){if(!t.whmcs.setup)return void await s.editReply({embeds:[e.embed({title:"Whmcs is not setup"},{settings:t})]});await s.editReply({embeds:[(0,whmcs_1.makeWhmcsEmbed)(e,t,t.whmcs)]})}};exports.run=run,exports.cmd=(new Command_1.CommandWithAdmin).setName("whmcs").setDescription("Manage whmcs").setRun(exports.run).addSubcommand((e=>e.setName("setup").setDescription("Setup whmcs").addStringOption((e=>e.setName("identifier").setDescription("WHMCS API identifier").setRequired(!0))).addStringOption((e=>e.setName("secret").setDescription("WHMCS API secret").setRequired(!0))).addStringOption((e=>e.setName("url").setDescription("WHMCS URL").setRequired(!0))).addChannelOption((e=>e.setName("channel").setDescription("Log Channel").setRequired(!0))))).addSubcommand((e=>e.setName("show").setDescription("Show whmcs settings")));