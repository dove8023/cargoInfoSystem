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

export class Goods {
    model: Model<any, any>;
    constructor(model: Model<any, any>) {
        this.model = model;
    }

    async get(id: string) {
        let userInfo = getNamespace("session").get("session");
        return await this.model.findOne({
            where: {
                id,
                companyId: userInfo.company.id,
                deletedAt: null
            }
        });
    }

    async find(ctx: Context) {
        let companyId = ctx.state.users.company.id;
        let { page = 0 } = ctx.request.query;
        let limit = 20; //不允许接收外面转入值
        return await this.model.findAndCountAll({
            where: {
                companyId,
                deletedAt: null
            },
            order: [["created_at", "desc"]],
            offset: page * limit,
            limit
        });
    }

    async post(params: any) {
        let userInfo: UserInfo = getNamespace("session").get("session");

        let { customerId, typeId, price, amount, weight } = params;
        if (!price || !customerId || price < 0 || amount < 0 || weight < 0) {
            throw new Error("Goods add, total price and customerId need.");
        }
        let companyId = userInfo.company.id;
        let operaterId = userInfo.staff.id;

        let _types = await types.get(typeId, userInfo);
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

    /* not use. */
    async put(ctx: Context) {
        let { id } = ctx.params;
        let companyId = ctx.state.users.company.id;
        let { customerId, price } = ctx.request.body;

        let _customer = await this.model.findById(id);
        if (!_customer) {
            throw new Error("Goods record does not exist.");
        }
        if (_customer.companyId != companyId) {
            throw new Error("Goods, Permission denied.");
        }

        customerId = customerId || _customer.customerId;
        price = price || _customer.price;

        return await this.model.update({
            customerId,
            price,
        }, {
                where: {
                    id
                }
            });
    }

    async delete(ctx: Context) {
        let { id } = ctx.params;
        let companyId = ctx.state.users.company.id;
        let _customer = await this.model.findById(id);
        if (!_customer) {
            throw new Error("Goods record does not exist.");
        }
        if (_customer.companyId != companyId) {
            throw new Error("Goods, Permission denied.");
        }

        return await this.model.update({
            deletedAt: moment().format()
        }, {
                where: {
                    id
                }
            });
    }
}

export let goods = new Goods(DB.models.goods as Model<any, any>);
