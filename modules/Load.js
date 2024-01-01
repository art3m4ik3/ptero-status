"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,o,r){void 0===r&&(r=o);var i=Object.getOwnPropertyDescriptor(t,o);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[o]}}),Object.defineProperty(e,r,i)}:function(e,t,o,r){void 0===r&&(r=o),e[r]=t[o]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)"default"!==o&&Object.prototype.hasOwnProperty.call(e,o)&&__createBinding(t,e,o);return __setModuleDefault(t,e),t};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Load=void 0;const express_1=require("express"),jspteroapi_1=require("jspteroapi");globalThis.commandArgs={nodes:[]};class Load{constructor(e){this.bot=e,this.disabledCommands=[...this.bot.config.disabledCommands,...this.bot.config.liveNodeEnabled?[]:["livenode"],...this.bot.config.whmcsEnabled?[]:["whmcs"]]}async loadGlobals(){let e=this.bot.settings.map((e=>e.pteroToken));e=e.filter((e=>""!==e));for(const t of e){const e=new jspteroapi_1.Application(this.bot.config.pteroHost,t,void 0,!0);if(await e.testAPI(!1)){globalThis.commandArgs.nodes=(await e.getAllNodes()).map((e=>({name:e.attributes.name,value:e.attributes.name})));break}}}async loadCommand(e){try{const{cmd:t}=await Promise.resolve(`../commands/${e}`).then((e=>__importStar(require(e))));if(this.disabledCommands.includes(t.name))return;this.bot.logger.log(`Loading Command: ${t.name}`),this.bot.commands.set(t.name,t)}catch(t){this.bot.logger.error(`Unable to load command ${e}`),console.error(t)}}async loadEvent(e){try{this.bot.logger.log(`Loading Event: ${e}`);const t=await Promise.resolve(`../events/${e}`).then((e=>__importStar(require(e))));this.bot.discordClient.on(e,t.run.bind(null,this.bot))}catch(t){this.bot.logger.error(`Unable to load event ${e}`),console.error(t)}}async loadRoute(e){try{if("whmcs"===e&&!this.bot.config.whmcsEnabled)return;if("live"===e&&!this.bot.config.liveNodeEnabled)return;const{run:t}=await Promise.resolve(`../routes/${e}`).then((e=>__importStar(require(e))));this.bot.logger.log(`Loading Route: ${e}`);const o=(0,express_1.Router)();await t(this.bot,o,this.bot.expressServer),this.bot.express.use(`/${e}`,o)}catch(t){this.bot.logger.error(`Unable to load route ${e}`),console.error(t)}}}exports.Load=Load;