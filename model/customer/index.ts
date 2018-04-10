/*
 * @Author: Mr.He 
 * @Date: 2018-03-28 11:08:01 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-10 10:07:54
 * @content what is the content of this file. */

import { DB } from "common/db";
import uuid = require("uuid");
import { Model } from "sequelize";
import { Context } from 'koa';
import * as moment from 'moment';
import { UserInfo } from 'model/interface';
import { getNamespace } from 'continuation-local-storage';
import { ModelBase } from 'common/model';

export class Customer extends ModelBase {
    constructor(model: Model<any, any>) {
        super(model);
    }

    // async find(where: any) {
    //     let { page = 0 } = where;
    //     let limit = 20; //不允许接收外面转入值
    //     let userInfo: UserInfo = getNamespace("session").get("session");

    //     return await this.model.findAndCountAll({
    //         where: {
    //             companyId: userInfo.company.id,
    //             deletedAt: null
    //         },
    //         order: [["created_at", "desc"]],
    //         offset: page * limit,
    //         limit
    //     });
    // }

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

    // async put(ctx: Context) {
    //     let { id } = ctx.params;
    //     let companyId = ctx.state.users.company.id;
    //     let { name, address, mobile } = ctx.request.body;

    //     let _customer = await this.model.findById(id);
    //     if (!_customer) {
    //         throw new Error("customer record does not exist.");
    //     }
    //     if (_customer.companyId != companyId) {
    //         throw new Error("customer, Permission denied.");
    //     }

    //     name = name || _customer.name;
    //     address = address || _customer.address;
    //     mobile = mobile || _customer.mobile;

    //     return await this.model.update({
    //         name,
    //         address,
    //         mobile,
    //     }, {
    //             where: {
    //                 id
    //             }
    //         });
    // }

}

export let customer = new Customer(DB.models.customer as Model<any, any>);


setTimeout(async () => {
    let result = await customer.get("8081e890-3560-11e8-b146-193dfdcfe944");
    console.log(12345, result);
}, 3000);
