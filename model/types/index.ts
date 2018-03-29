/*
 * @Author: Mr.He 
 * @Date: 2018-03-28 11:08:01 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-29 08:55:59
 * @content what is the content of this file. */

import { DB } from "common/db";
import uuid = require("uuid");
import { Model } from "sequelize";
import { Context } from 'koa';
import * as moment from 'moment';

export class Types {
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
        })
    }

    async find(ctx: Context) {
        let companyId = ctx.state.users.company.id;
        let { page = 0, limit = 20 } = ctx.request.query;
        return await this.model.findAndCountAll({
            where: {
                companyId,
                deletedAt: null
            },
            offset: page * limit,
            limit
        });
    }

    async post(ctx: Context) {
        let { name, price } = ctx.request.body;
        if (!name || !price) {
            throw new Error("types add, need name and price");
        }
        let companyId = ctx.state.users.company.id;
        let operaterId = ctx.state.users.staff.id;

        return await this.model.create({
            id: uuid.v1(),
            companyId,
            operaterId,
            name,
            price,
            hisPrice: [{
                price,
                time: moment().format()
            }]
        });
    }

    async put(ctx: Context) {
        let { id } = ctx.params;
        let companyId = ctx.state.users.company.id;
        let { name, price } = ctx.request.body;
        if (!price) {
            throw new Error("types update, need price");
        }

        let _types = await this.model.findById(id);
        if (!_types) {
            throw new Error("types record does not exist.");
        }

        let hisPrice = _types.hisPrice;
        hisPrice.push({
            price: _types.price,
            time: moment().format()
        });

        return await this.model.update({
            name,
            price,
            hisPrice,
        }, {
                where: {
                    id
                }
            });
    }

    async delete(ctx: Context) {
        let { id } = ctx.params;
        let companyId = ctx.state.users.company.id;
        let _types = await this.model.findById(id);
        if (!_types) {
            throw new Error("types record does not exist.");
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

export let types = new Types(DB.models.types as Model<any, any>);
