/*
 * @Author: Mr.He 
 * @Date: 2018-06-18 09:40:43 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-18 09:59:11
 * @content what is the content of this file. */


import { Context } from 'koa';
import errorCode from "./error";

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
            code,
            msg: msg || errorCode[code],
            data: null
        }
    }

    await next();
}