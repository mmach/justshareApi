"use strict";
import { makeInvoker, scopePerRequest } from "awilix-koa";
import CircularJSON from 'circular-json';
import fs from 'fs';
import Koa from "koa";
import koaBodyImport from "koa-body";
//import './../Integration/Cron/index.js'
//import './../Integration/MQReciver/index.js'
import compress from 'koa-compress';
import KoaRouter from "koa-router";
import cors from "koa2-cors";
import { URL } from "url";
import container from "./awilix.js";
import SequelizeDB from "./Database/models/index.js";
import CONFIG from './config.js';
import io from 'socket.io-emitter'
import redis from 'ioredis'
import { uuid } from '../node_modules/uuidv4/build/lib/uuidv4.js';
import { amqpFunc } from './Queues/index.js'
let Redis = redis

global.ioredis = new Redis({ host: process.env.REDIS_HOST || 'redis-13184.c78.eu-west-1-2.ec2.cloud.redislabs.com', port: process.env.REDIS_PORT || 13184, password: process.env.REDIS_PASSWORD || "oERk63TBgqihQWMYHakRnyCQoi0MSni7" })
global.socket = io(ioredis);

//io({ host: process.env.REDIS_HOST || 'redis-13184.c78.eu-west-1-2.ec2.cloud.redislabs.com', port: process.env.REDIS_PORT || 13184, auth_pass: process.env.REDIS_PASSWORD || "oERk63TBgqihQWMYHakRnyCQoi0MSni7" });

//TO REMOVE IN FUTURE



amqpFunc()

if (process.env.UPLOAD_PATH) {
  if (!fs.existsSync(process.env.UPLOAD_PATH)) {
    fs.mkdirSync(process.env.UPLOAD_PATH);
  }
}
// @ts-ignore
let koaBody = koaBodyImport({
  multipart: true,
  formLimit: "10mb",
  jsonLimit: "10mb",
  textLimit: "10mb",
  enableTypes: ['json', 'form', 'text']
});


const app = new Koa();
const router = new KoaRouter();

app.use(cors());
app.use(compress({
  filter: function (content_type) {
    return /text/i.test(content_type)
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))

// This installs a scoped container into our
// context - we will use this to register our current user!
// @ts-ignore
app.use(scopePerRequest(container));
// Let's do that now!
app.use((ctx, next) => {
  ctx.state.container.registerValue({
    // Imagine some auth middleware somewhere...
    // This makes currentUser available to all services!
    // currentUser: ctx.state.user
  });
  return next();
});

const cqrsPreprocess = () => {
  const commandExec = async ctx => {
    const body = ctx.request.body;
    const action = ctx.state.container.resolve(body.action);
    let model = {};
    if (typeof (body.model) == "object") {
      model = body.model
    } else {
      model = JSON.parse(decodeURIComponent(body.model));
    }
    action.init(model);
    await cqrsHandler(action, ctx);
  };
  const queryExec = async ctx => {

    const query = JSON.parse(ctx.request.query.action);
    const action = ctx.state.container.resolve(query.action);
    let model = {};
    if (typeof (query.model) == "object") {
      model = query.model
    } else {
      model = JSON.parse(decodeURIComponent(query.model));
    }
    action.init(model);
    return await cqrsHandler(action, ctx);
  };

  const cqrsHandler = async (action, ctx) => {
    let result = null;
    try {
      let token = ctx.request.header.authorization;
      let lang = ctx.request.header.language;
      action.token = token;
      action.projectToken = ctx.request.header.projectauthorization
      action.referer = ctx.request.header.referer ? (new URL(ctx.request.header.referer)).origin : 'http://localhost.8080'
      action.language = lang;
      action.context.language = lang;
      action.context.token = token;
      action.context.projectToken = ctx.request.header.projectauthorization
      result = await action.run();
      ctx.body = CircularJSON.stringify(result);;
      ctx.status = 200;
    } catch (exception) {
      ctx.body = CircularJSON.stringify(exception);;
      ctx.status = 400; // Number(exception.Status);
    }
    return ctx;
  };
  return {
    queryExecAsync: async ctx => {
      return await queryExec(ctx);
    },
    queryExec,
    commandExec,
    commandExecAsync: async ctx => {
      return await commandExec(ctx);
    },
    cqrsHandler
  };
};

const api = makeInvoker(cqrsPreprocess);
router.get("/query", api("queryExecAsync"));
router.post("/command", koaBody, api("commandExecAsync"));
app.use(router.routes());
app.listen(process.env.PORT || 1337);



// Create a new connection manager

module.exports = cqrsPreprocess;
