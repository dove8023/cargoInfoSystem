/*
 * @Author: Mr.He 
 * @Date: 2018-04-01 20:46:36 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-01 20:47:46
 * @content what is the content of this file. */


import Router from "koa-router";
import { Context } from 'koa';
import { account, staff, company, order } from "model";
import * as uuid from 'uuid';
import createOrder from "api/order/createOrder";


let apiModule = order;
export function OrderRouter(router: Router) {

    router.get("/order/:id", async (ctx: Context, next: Function) => {
        let result = await apiModule.get(ctx);
        ctx.response.body = {
            code: result ? 0 : -1,
            msg: result ? "Order查询成功" : "Order查询失败",
            data: result
        }
    });

    router.get("/order", async (ctx: Context, next: Function) => {
        let result = await apiModule.find(ctx);
        ctx.response.body = {
            code: result ? 0 : -1,
            msg: result ? "Order查询成功" : "Order查询失败",
            data: result
        }
    });

    router.post("/order", async (ctx: Context, next: Function) => {
        let result = await apiModule.post(ctx.request.body);
        ctx.response.body = {
            code: result ? 0 : -1,
            msg: result ? "Order添加成功" : "Order添加失败",
            data: result
        }
    });

    router.put("/order/:id", async (ctx: Context, next: Function) => {
        let result = await apiModule.put(ctx);
        ctx.response.body = {
            code: result ? 0 : -1,
            msg: result ? "Order修改成功" : "Order修改失败",
            data: result
        }
    });

    router.delete("/order/:id", async (ctx: Context, next: Function) => {
        let result = await apiModule.delete(ctx);
        ctx.response.body = {
            code: result ? 0 : -1,
            msg: result ? "Order删除成功" : "Order删除失败",
            data: result
        }
    });

    router.post("/createOrder", async (ctx: Context, next: Function) => {
        let result = await createOrder.add(ctx.request.body);
        ctx.response.body = {
            code: 0,
            msg: "订单创建成功",
            data: {
                orderId: result
            }
        }
    });
}