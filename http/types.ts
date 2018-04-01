/*
 * @Author: Mr.He 
 * @Date: 2018-03-28 15:29:56 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-01 11:38:46
 * @content what is the content of this file. */

import Router from "koa-router";
import { Context } from 'koa';
import { account, staff, company, types } from "model";
import * as uuid from 'uuid';


export function TypesRouter(router: Router) {
    router.get("/test", async (ctx: Context, next: Function) => {
        ctx.response.type = "text";
        ctx.response.body = "test, just";
    });


    router.get("/types/:id", async (ctx: Context, next: Function) => {
        let result = await types.get(ctx);
        ctx.response.body = {
            code: result ? 0 : -1,
            msg: result ? "Types查询成功" : "Types查询失败",
            data: result
        }
    });

    router.get("/types", async (ctx: Context, next: Function) => {
        let result = await types.find(ctx);
        ctx.response.body = {
            code: result ? 0 : -1,
            msg: result ? "Types查询成功" : "Types查询失败",
            data: result
        }
    });

    router.post("/types", async (ctx: Context, next: Function) => {
        let result = await types.post(ctx);
        ctx.response.body = {
            code: result ? 0 : -1,
            msg: result ? "Types添加成功" : "Types添加失败",
            data: result
        }
    });

    router.put("/types/:id", async (ctx: Context, next: Function) => {
        let result = await types.put(ctx);
        ctx.response.body = {
            code: result ? 0 : -1,
            msg: result ? "Types修改成功" : "Types修改失败",
            data: result
        }
    });

    router.delete("/types/:id", async (ctx: Context, next: Function) => {
        let result = await types.delete(ctx);
        ctx.response.body = {
            code: result ? 0 : -1,
            msg: result ? "Types删除成功" : "Types删除失败",
            data: result
        }
    });
}
