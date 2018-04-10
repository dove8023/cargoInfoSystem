/*
 * @Author: Mr.He 
 * @Date: 2018-03-21 22:52:23 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-09 00:27:28
 * @content what is the content of this file. */

import register from "api/auth/register";
import login from "api/auth/login";
import Router = require("koa-router");

let router = new Router();

let getNamespace = require('continuation-local-storage').getNamespace;

router.post("/auth/register", async (ctx, next) => {
    let result;
    result = await register.register(ctx.request.body);
    ctx.response.body = result;
});

router.post("/auth/login", async (ctx, next) => {
    ctx.response.body = await login.login(ctx.request.body);
});

router.get("/test", async (ctx, next) => {
    let session = getNamespace('session');

    console.log(session.get("user").length);
    ctx.response.body = "test result";
});

import { TypesRouter } from "./types";
import { CustomerRouter } from "./customer";
import { OrderRouter } from "./order";

TypesRouter(router);
CustomerRouter(router);
OrderRouter(router);

export default router;
