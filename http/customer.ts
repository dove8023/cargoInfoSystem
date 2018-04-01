/*
 * @Author: Mr.He 
 * @Date: 2018-04-01 11:38:18 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-01 11:54:05
 * @content what is the content of this file. */

import Router from "koa-router";
import { Context } from 'koa';
import { account, staff, company, customer } from "model";
import * as uuid from 'uuid';


export function CustomerRouter(router: Router) {

    router.get("/customer/:id", async (ctx: Context, next: Function) => {
        let result = await customer.get(ctx);
        ctx.response.body = {
            code: result ? 0 : -1,
            msg: result ? "Customer查询成功" : "Customer查询失败",
            data: result
        }
    });

    router.get("/customer", async (ctx: Context, next: Function) => {
        let result = await customer.find(ctx);
        ctx.response.body = {
            code: result ? 0 : -1,
            msg: result ? "Customer查询成功" : "Customer查询失败",
            data: result
        }
    });

    router.post("/customer", async (ctx: Context, next: Function) => {
        let result = await customer.post(ctx);
        ctx.response.body = {
            code: result ? 0 : -1,
            msg: result ? "Customer添加成功" : "Customer添加失败",
            data: result
        }
    });

    router.put("/customer/:id", async (ctx: Context, next: Function) => {
        let result = await customer.put(ctx);
        ctx.response.body = {
            code: result ? 0 : -1,
            msg: result ? "Customer修改成功" : "Customer修改失败",
            data: result
        }
    });

    router.delete("/customer/:id", async (ctx: Context, next: Function) => {
        let result = await customer.delete(ctx);
        ctx.response.body = {
            code: result ? 0 : -1,
            msg: result ? "Customer删除成功" : "Customer删除失败",
            data: result
        }
    });
}
