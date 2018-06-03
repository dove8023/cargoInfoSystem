/*
 * @Author: Mr.He 
 * @Date: 2018-04-01 17:48:06 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-29 08:14:10
 * @content what is the content of this file. */


import { DB } from "common/db";
import uuid = require("uuid");
import { Model } from "sequelize";
import { Context } from 'koa';
import * as moment from 'moment';
import { UserInfo } from 'model/interface';
import { getNamespace } from "continuation-local-storage";
import { ModelBase } from "common/model";

export class Order extends ModelBase {
    static model: any = DB.models.order;
    constructor() {
        super();
    }

    async post(ctx: Context) {
        let userInfo = getNamespace("session").get("session");
        let { customerId, total } = ctx.request.body;
        if (!total || !customerId) {
            throw new Error("order add, total total and customerId need.");
        }
        let companyId = userInfo.company.id;
        let operaterId = userInfo.staff.id;

        let result = await this.model.create({
            id: uuid.v1(),
            companyId,
            operaterId,
            customerId,
            total
        });

        ctx.body = {
            code: 0,
            msg: "ok",
            data: result
        }
    }
}