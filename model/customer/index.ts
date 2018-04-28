/*
 * @Author: Mr.He 
 * @Date: 2018-03-28 11:08:01 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-10 17:25:00
 * @content what is the content of this file. */

import { DB } from "common/db";
import uuid = require("uuid");
import { Model } from "sequelize";
import { Context } from 'koa';
import * as moment from 'moment';
import { UserInfo } from 'model/interface';
import { getNamespace } from 'continuation-local-storage';
import { ModelBase } from 'common/model';
import { Restful, Router } from "common/restful";

@Restful()
export class Customer extends ModelBase {
    constructor(model: Model<any, any>) {
        super(model);
    }

    @Router("/ok", "get")
    ok(ctx: Context, next: Function) {
        console.log("ok has been");
        ctx.body = "ok has been called.";
    }

    // async post(ctx: Context) {
    //     let { name, address, mobile } = ctx.request.body;
    //     if (!name) {
    //         throw new Error("customer add, need name.");
    //     }
    //     let companyId = ctx.state.users.company.id;
    //     let operaterId = ctx.state.users.staff.id;

    //     return await this.model.create({
    //         id: uuid.v1(),
    //         companyId,
    //         operaterId,
    //         name,
    //         address,
    //         mobile
    //     });
    // }

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