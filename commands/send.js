"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.cmd=void 0;const Command_1=require("../classes/Command"),console_1=require("../embeds/console"),run=async(e,{bot:t,interaction:n,client:o,settings:s})=>{const i=n.options.getString("command",!0),m=await t.functions.getConsole(o,e.identifier,i,5);await n.editReply({embeds:[(0,console_1.makeConsoleEmbed)(t,s,e,m,{limit:5,title:t.t("common.cmd_sent")})]})};exports.cmd=(new Command_1.CommandWithClientServer).setName("send").setDescription("send.main").setCategory("pterodactyl").setRun(run).addStringOption((e=>e.setName("command").setDescription("send.command").setRequired(!0)));