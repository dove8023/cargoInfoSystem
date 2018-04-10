/*
 * @Author: Mr.He 
 * @Date: 2018-04-03 22:57:04 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-06 23:48:51
 * @content what is the content of this file. */

import { account, staff, company, customer, types, order, goods } from "model";
import * as Koa from 'koa';
import { UserInfo } from 'model/interface';
import { getNamespace } from 'continuation-local-storage';

class CreateOrder {
    async get(id: string) {

    }

    async find() {

    }

    async add(params: {
        customerId: string;
        total: number;
        datas: {
            typeId: string;
            price: number;
            amount: number;
            weight: number;
            customerId: string; //前端可不传入
        }[]
    }): Promise<string> {
        let userInfo: UserInfo = getNamespace("session").get("session");
        let { customerId, total, datas } = params;
        let companyId = userInfo.company.id;

        /* customer check */
        let _customer = await customer.get(customerId);
        if (!_customer) {
            throw new Error("Customer isn't exist.");
        }

        if (!datas || !datas.length) {
            throw new Error("参数不正确");
        }

        /* create order. */
        let _order = await order.post({
            customerId,
            total
        });

        /* create goods. */
        for (let item of datas) {
            item.customerId = customerId;
            await goods.post(item);
        }

        return _order.id;
    }
}

let createOrder = new CreateOrder();
export default createOrder;