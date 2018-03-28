/*
 * @Author: Mr.He 
 * @Date: 2018-03-22 16:20:52 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-23 18:00:08
 * @content what is the content of this file. */

import koa = require("koa");
import koaBody = require("koa-body");
import * as moment from "moment";
import router from "./auth";

let app = new koa();
app.use(koaBody({
    jsonLimit: '1mb'
}));

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = err.status || err.statusCode || 500;
        ctx.response.type = "text";
        ctx.response.body = err.message || err;
        console.error(err);
    }
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${moment().format()} ${ctx.method} ${ctx.url} ${ctx.status}--- ${ms}ms`);
});



app.use(router.routes());

export default app;