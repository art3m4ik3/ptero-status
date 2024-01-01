"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.run=void 0;const discord_js_1=require("discord.js"),express_1=require("express"),express_validator_1=require("express-validator"),invoice_1=require("../embeds/invoice"),order_1=require("../embeds/order"),WhmcsAPI_1=require("../modules/WhmcsAPI"),withSetup=async(e,s,r,d)=>{const t=(0,express_validator_1.validationResult)(r);if(!t.isEmpty())return void d.status(400).json({errors:t.array()});const n=r.body.guildId,i=e.functions.getSettingsById(n);if(i.whmcs.setup)if(r.body.token===i.whmcs.whmcsAPIBot){d.status(204).send();try{const t=await e.discordClient.guilds.fetch(n);if(!t)throw new Error("Guild not found.");const a=await t.channels.fetch(i.whmcs.whmcsAdminLogsChannel);if(!a)throw new Error("Bot can't find admin logs channel.");if(a.type!==discord_js_1.ChannelType.GuildText)throw new Error("Admin logs channel not text channel.");const o=new WhmcsAPI_1.WhmcsAPI(i);await s({bot:e,whmcs:o,guild:t,channel:a,settings:i,req:r,res:d})}catch(s){e.logger.error("Error in WHMCS request: "+s.message)}}else d.status(401).send({errors:["Invalid token."]});else d.status(400).send({errors:["Bot not setup to use whmcs."]})},send=(e,s,r)=>{e.send({embeds:[r.adminEmbed]}),s&&s.send({embeds:[r.userEmbed]})},getUser=async(e,s,r)=>{const d=await e.call("GetClientsDetails",{clientid:r});return{member:await s.members.fetch(d.customfields1).catch((()=>null)),client:d}},invoiceRoute=async(e,s)=>{s.post("/paid",withSetup.bind(null,e,(async({whmcs:s,channel:r,settings:d,guild:t,req:n})=>{const i=await s.call("GetInvoice",{invoiceid:n.body.invoiceId}),{member:a,client:o}=await getUser(s,t,i.userid),c=(0,invoice_1.makeInvoiceEmbed)(e,d,i,o,"Has Been Paid");send(r,a,c)}))),s.post("/refunded",withSetup.bind(null,e,(async({whmcs:s,settings:r,channel:d,guild:t,req:n})=>{const i=await s.call("GetInvoice",{invoiceid:n.body.invoiceId}),{member:a,client:o}=await getUser(s,t,i.userid),c=(0,invoice_1.makeInvoiceEmbed)(e,r,i,o,"Has Been Refunded");send(d,a,c)}))),s.post("/latefee",withSetup.bind(null,e,(async({whmcs:s,channel:r,settings:d,guild:t,req:n})=>{const i=await s.call("GetInvoice",{invoiceid:n.body.invoiceId}),{client:a,member:o}=await getUser(s,t,i.userid),c=(0,invoice_1.makeInvoiceEmbed)(e,d,i,a,"Has Had A Late Fee Added");send(r,o,c)})))},orderRoute=async(e,s)=>{s.post("/accepted",withSetup.bind(null,e,(async({whmcs:s,channel:r,settings:d,guild:t,req:n})=>{const{orders:{order:i}}=await s.call("GetOrders",{id:n.body.orderId}),a=i[0],{client:o,member:c}=await getUser(s,t,a.userid),l=(0,order_1.makeOrderEmbed)(e,d,a,o,"Has Been Accepted");send(r,c,l)}))),s.post("/canceled",withSetup.bind(null,e,(async({whmcs:s,channel:r,settings:d,guild:t,req:n})=>{const{orders:{order:i}}=await s.call("GetOrders",{id:n.body.orderId}),a=i[0],{client:o,member:c}=await getUser(s,t,a.userid),l=(0,order_1.makeOrderEmbed)(e,d,a,o,"Has Been Cancelled");send(r,c,l)}))),s.post("/canceledrefunded",withSetup.bind(null,e,(async({whmcs:s,channel:r,settings:d,guild:t,req:n})=>{const{orders:{order:i}}=await s.call("GetOrders",{id:n.body.orderId}),a=i[0],{client:o,member:c}=await getUser(s,t,a.userid),l=(0,order_1.makeOrderEmbed)(e,d,a,o,"Has Been Cancelled & Refunded");send(r,c,l)}))),s.post("/fraud",withSetup.bind(null,e,(async({whmcs:s,channel:r,settings:d,guild:t,req:n})=>{const{orders:{order:i}}=await s.call("GetOrders",{id:n.body.orderId}),a=i[0],{client:o,member:c}=await getUser(s,t,a.userid),l=(0,order_1.makeOrderEmbed)(e,d,a,o,"Has Been Marked As Fraudulent");send(r,c,l)}))),s.post("/paid",withSetup.bind(null,e,(async({whmcs:s,channel:r,settings:d,guild:t,req:n})=>{const{orders:{order:i}}=await s.call("GetOrders",{id:n.body.orderId}),a=i[0],{client:o,member:c}=await getUser(s,t,a.userid),l=(0,order_1.makeOrderEmbed)(e,d,a,o,"Has Been Paid");send(r,c,l)}))),s.post("/pending",withSetup.bind(null,e,(async({whmcs:s,channel:r,settings:d,guild:t,req:n})=>{const{orders:{order:i}}=await s.call("GetOrders",{id:n.body.orderId}),a=i[0],{client:o,member:c}=await getUser(s,t,a.userid),l=(0,order_1.makeOrderEmbed)(e,d,a,o,"Order Was Marked as Pending");send(r,c,l)})))},run=(e,s)=>{s.use((0,express_validator_1.body)("token").isString().isLength({min:28,max:28})),s.use((0,express_validator_1.body)("guildId").isNumeric().isLength({min:18,max:18}));const r=(0,express_1.Router)();r.use((0,express_validator_1.body)("invoiceId").isNumeric()),invoiceRoute(e,r),s.use("/invoice",r);const d=(0,express_1.Router)();d.use((0,express_validator_1.body)("orderId").isNumeric()),orderRoute(e,d),s.use("/order",d)};exports.run=run;