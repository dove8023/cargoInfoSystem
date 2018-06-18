/*
 * @Author: Mr.He 
 * @Date: 2018-03-02 22:30:07 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-18 10:08:20
 * @content what is the content of this file. */

import { Model } from "sequelize";
import { ModelBase } from "common/model";
import { Context } from 'koa';
import Models from "sqlModel";
import { Restful, Router } from "common/restful";

export class Account extends ModelBase {
    static model: Model<any, any> = Models.Account as Model<any, any>;
    constructor() {
        super();
    }

    // async findOne(params: { mobile: string, password: string }) {
    //     let { mobile, password } = params;
    //     return await Account.model.findOne({
    //         where: {
    //             mobile,
    //             password
    //         }
    //     });
    // }

    async find(ctx: Context) {
        let { page = 0, size = 20, mobile } = ctx.request.query;
        return await Account.model.findOne({
            where: {
                mobile,
            },
            limit: size,
            offset: page * size
        });
    }

    /* async post(params: { mobile: string, password: string, [index: string]: any }) {
        let account = await Account.model.findOne({
            where: {
                mobile: params.mobile
            }
        });

        if (account) {
            throw new Error("mobile is already have");
        }

        if (!params.mobile || !params.password) {
            throw new Error("register account need mobile and password");
        }

        return await Account.model.create({
            id: uuid.v1(),
            mobile: params.mobile,
            password: params.password,
            name: params.name,
            sex: params.sex,
            age: params.age
        });
    } */
}