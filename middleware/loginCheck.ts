/*
 * @Author: Mr.He 
 * @Date: 2018-06-02 18:03:36 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-09 22:33:56
 * @content: 
 */

import * as Koa from "koa";
import cache from "common/cache";
let session = require('continuation-local-storage').createNamespace("session");


let allowCrossUrls = ["/open", "/favicon.ico"];


export async function LoginCheck(ctx: Koa.Context, next: Function): Promise<any> {
    let url = ctx.url;
    let urlCheck = allowCrossUrls.some((value) => {
        return url.indexOf(value) > -1;
    });
    if (urlCheck) {
        return next();
    }

    let { token } = ctx.header;
    if (!token) {
        throw new Error("token dose not exist. " + url);
    }
    let loginInfo = await cache.read(token);
    if (!loginInfo) {
        throw new Error("token has expired. " + url);
    }

    return new Promise((resolve, reject) => {
        session.run(async () => {
            session.set("session", loginInfo);
            resolve(next());
        })
    })
}

/* 
await Auth.loginCheck(ctx);
    return new Promise((resolve, reject) => {
        session.run(async () => {
            if (Object.keys(ctx.state).length) {
                session.set("session", ctx.state.session);
            }
            resolve(next());
        });
    }); */