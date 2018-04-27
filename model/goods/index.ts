/*
 * @Author: Mr.He 
 * @Date: 2018-04-01 21:21:24 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-06 23:46:39
 * @content what is the content of this file. */

import { DB } from "common/db";
import uuid = require("uuid");
import { Model } from "sequelize";
import { Context } from 'koa';
import * as moment from 'moment';
import { types } from "model";
import { UserInfo } from '../interface';
import { getNamespace } from 'continuation-local-storage';
import { company } from '../company/index';
import { ModelBase } from 'common/model';


export class Goods extends ModelBase {
    constructor(model: Model<any, any>) {
        super(model);
    }

    async post(params: any) {
        let userInfo: UserInfo = getNamespace("session").get("session");

        let { customerId, typeId, price, amount, weight } = params;
        if (!price || !customerId || price < 0 || amount < 0 || weight < 0) {
            throw new Error("Goods add, total price and customerId need.");
        }
        let companyId = userInfo.company.id;
        let operaterId = userInfo.staff.id;

        let _types = await types.get(typeId);
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

export let goods = new Goods(DB.models.goods as Model<any, any>);
