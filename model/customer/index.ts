/*
 * @Author: Mr.He 
 * @Date: 2018-03-28 11:08:01 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-01 11:56:06
 * @content what is the content of this file. */

import { DB } from "common/db";
import uuid = require("uuid");
import { Model } from "sequelize";
import { Context } from 'koa';
import * as moment from 'moment';

export class Customer {
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
        let { name, address, mobile } = ctx.request.body;
        if (!name) {
            throw new Error("customer add, need name.");
        }
        let companyId = ctx.state.users.company.id;
        let operaterId = ctx.state.users.staff.id;

        return await this.model.create({
            id: uuid.v1(),
            companyId,
            operaterId,
            name,
            address,
            mobile
        });
    }

    async put(ctx: Context) {
        let { id } = ctx.params;
        let companyId = ctx.state.users.company.id;
        let { name, address, mobile } = ctx.request.body;

        let _customer = await this.model.findById(id);
        if (!_customer) {
            throw new Error("customer record does not exist.");
        }
        if (_customer.companyId != companyId) {
            throw new Error("customer, Permission denied.");
        }

        name = name || _customer.name;
        address = address || _customer.address;
        mobile = mobile || _customer.mobile;

        return await this.model.update({
            name,
            address,
            mobile,
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
            throw new Error("customer record does not exist.");
        }
        if (_customer.companyId != companyId) {
            throw new Error("customer, Permission denied.");
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

export let customer = new Customer(DB.models.customer as Model<any, any>);
