/*
 * @Author: Mr.He 
 * @Date: 2018-03-22 16:20:52 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-02 18:12:25
 * @content what is the content of this file. */

import * as Koa from "koa";
import koaBody = require("koa-body");
import * as moment from "moment";
import { Auth } from "api/auth";
import * as statics from "koa-static";
import "api/auth";
import { LoginCheck } from "middleware";

let app = new Koa();

app.use(async (ctx: Koa.Context, next: Function) => {
    try {
        //default type json.
        ctx.response.type = "json";
        await next();
    } catch (err) {
        ctx.response.status = err.status || err.statusCode || 500;
        ctx.response.type = "text";
        ctx.response.body = err.message || err;
        console.error(err);
    }
});

app.use(koaBody({
    jsonLimit: '8mb'
}));

// x-response-time
app.use(async (ctx: Koa.Context, next: Function) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx: Koa.Context, next: Function) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${moment().format()} ${ctx.method} ${ctx.url} ${ctx.status}--- ${ms}ms`);
});

// static 
app.use(statics("./www"));

app.use(LoginCheck);

import Router = require("koa-router");
import { RegisterRouter } from "common/restful";
import "model";

let router = new Router();
RegisterRouter(router);



app.use(router.routes());

export default app;