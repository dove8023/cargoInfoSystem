/*
 * @Author: Mr.He 
 * @Date: 2018-04-01 21:21:24 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-01 21:21:50
 * @content what is the content of this file. */

import { DB } from "common/db";
import uuid = require("uuid");
import { Model } from "sequelize";
import { Context } from 'koa';
import * as moment from 'moment';

export class Goods {
    model: Model<any, any>;
    constructor(model: Model<any, any>) {
        this.model = model;
    }

    async get(ctx: Context) {
        let { id } = ctx.params;
        let companyId = ctx.state.users.company.id;
        return await this.model.findOne({
            where: {
                id,
                companyId,
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

    async post(ctx: Context) {
        let { customerId, price } = ctx.request.body;
        if (!price || !customerId) {
            throw new Error("order add, total price and customerId need.");
        }
        let companyId = ctx.state.users.company.id;
        let operaterId = ctx.state.users.staff.id;

        return await this.model.create({
            id: uuid.v1(),
            companyId,
            operaterId,
            customerId,
            price
        });
    }

    async put(ctx: Context) {
        let { id } = ctx.params;
        let companyId = ctx.state.users.company.id;
        let { customerId, price } = ctx.request.body;

        let _customer = await this.model.findById(id);
        if (!_customer) {
            throw new Error("order record does not exist.");
        }
        if (_customer.companyId != companyId) {
            throw new Error("order, Permission denied.");
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
            throw new Error("order record does not exist.");
        }
        if (_customer.companyId != companyId) {
            throw new Error("order, Permission denied.");
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
