/*
 * @Author: Mr.He 
 * @Date: 2018-06-10 10:18:57 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-07-13 20:35:22
 * @content what is the content of this file. */


import { ModelBase } from "common/model";
import { Context } from 'koa';
import { Restful, Router } from "common/restful";
import Models from "sqlModel";
import * as uuid from "uuid";
import { UserInfo } from 'httpModel/interface';
import { getNamespace } from 'continuation-local-storage';
import { Goods, addGoods } from "model/goods";



@Restful()
export class Order extends ModelBase {
    static model: any = Models.Order;
    constructor() {
        super();
    }

    async get(ctx: Context) {
        let id = ctx.params.id;
        let order = await ModelBase.resourceCheck(id, this.model, ctx);
        if (order && order.deletedAt) {
            order = null;
        }

        /* 查询相关联的goods */
        let goods = await Models.Goods.findAll({
            where: {
                orderId: order.id
            }
        });

        order = order.toJSON();
        order.goods = goods;

        ctx.success(order);
    }

    async post(ctx: Context) {
        let { customerId, totalAmount, list } = ctx.request.body;
        let userInfo: UserInfo = getNamespace("session").get("session");

        /* params check */
        totalAmount = Number(totalAmount);
        if (!totalAmount) {
            return ctx.error(301, "totalAmount need number");
        }

        let customer = await Models.Customer.findById(customerId);
        if (!customer) {
            return ctx.error(301, "该客户未找到");
        }

        let order = await this.model.create({
            id: uuid.v1(),
            companyId: userInfo.company.id,
            operaterId: userInfo.staff.id,
            customerId,
            totalAmount
        });

        /* add the goods */
        let goods = await addGoods({
            customerId,
            orderId: order.id,
            goods: list as Goods[]
        });

        order = order.toJSON();
        order.goods = goods;

        ctx.success(order);
    }

    async put(ctx: Context) {
        /*  let { id } = ctx.params;
         let { name, address, mobile, other } = ctx.request.body;
         if (!name) {
             throw new Error("参数不正确");
         }
 
         let type = await ModelBase.resourceCheck(id, this.model);
 
         await this.model.update({
             name,
             address,
             mobile,
             other
         }, {
                 where: { id }
             })
         ctx.body = {
             code: 0,
             data: type,
             msg: "ok"
         } */
    }
}