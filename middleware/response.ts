/*
 * @Author: Mr.He 
 * @Date: 2018-06-18 09:40:43 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-18 10:33:16
 * @content what is the content of this file. */


import { Context } from 'koa';
import errorCode from "./error";
let config = require("config.local");

export async function response(ctx: Context, next: Function) {
    ctx.success = function (data: any) {
        ctx.body = {
            code: 0,
            msg: "ok",
            data
        }
    }

    ctx.error = function (code: number, msg?: string) {
        ctx.body = {
            code: config.appID + code,
            msg: msg || errorCode[code],
            data: null
        }
    }

    await next();
}