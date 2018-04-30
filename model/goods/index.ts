/*
 * @Author: Mr.He 
 * @Date: 2018-04-01 21:21:24 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-29 08:14:05
 * @content what is the content of this file. */

import { DB } from "common/db";
import uuid = require("uuid");
import { Model } from "sequelize";
import { Context } from 'koa';
import * as moment from 'moment';
import { Types } from "model";
import { UserInfo } from '../interface';
import { getNamespace } from 'continuation-local-storage';
import { ModelBase } from 'common/model';
import { Restful } from 'common/restful';

@Restful()
export class Goods extends ModelBase {
    static model: any = DB.models.goods;
    constructor() {
        super();
    }

    async post(ctx: Context) {
        let userInfo: UserInfo = getNamespace("session").get("session");

        let { customerId, typeId, price, amount, weight } = ctx.request.body;
        if (!price || !customerId || price < 0 || amount < 0 || weight < 0) {
            throw new Error("Goods add, total price and customerId need.");
        }
        let companyId = userInfo.company.id;
        let operaterId = userInfo.staff.id;

        let _types = await Types.get(typeId);
        if (!_types) {
            throw new Error("Goods add, typeId not right");
        }

        return await this.model.create({
            id: uuid.v1(),
            companyId,
            operaterId,
            customerId,
            typeId,
            price,
            amount,
            weight
        });
    }
}