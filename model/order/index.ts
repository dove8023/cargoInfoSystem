/*
 * @Author: Mr.He 
 * @Date: 2018-04-01 17:48:06 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-06 23:40:53
 * @content what is the content of this file. */


import { DB } from "common/db";
import uuid = require("uuid");
import { Model } from "sequelize";
import { Context } from 'koa';
import * as moment from 'moment';
import { UserInfo } from 'model/interface';
import { getNamespace } from "continuation-local-storage";
import { ModelBase } from "common/model"
export class Order extends ModelBase {
    constructor(model: Model<any, any>) {
        super(model);
    }

    async post(params: { customerId: string; total: number }) {
        let userInfo = getNamespace("session").get("session");
        let { customerId, total } = params;
        if (!total || !customerId) {
            throw new Error("order add, total total and customerId need.");
        }
        let companyId = userInfo.company.id;
        let operaterId = userInfo.staff.id;

        return await this.model.create({
            id: uuid.v1(),
            companyId,
            operaterId,
            customerId,
            total
        });
    }
}

export let order = new Order(DB.models.order as Model<any, any>);
