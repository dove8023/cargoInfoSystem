/*
 * @Author: Mr.He 
 * @Date: 2018-03-22 16:20:52 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-29 09:58:39
 * @content what is the content of this file. */

import * as Koa from "koa";
import koaBody = require("koa-body");
import * as moment from "moment";
import login from "api/auth/login";

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

let session = require('continuation-local-storage').createNamespace("session");

// deal login user
app.use(async (ctx: Koa.Context, next: Function) => {
    await login.loginCheck(ctx);
    return new Promise((resolve, reject) => {
        session.run(async () => {
            if (Object.keys(ctx.state).length) {
                session.set("session", ctx.state.session);
            }
            resolve(next());
        });
    });
});


import Router = require("koa-router");
import { RegisterRouter } from "common/restful";
let router = new Router();
RegisterRouter(router);



app.use(router.routes());

export default app;