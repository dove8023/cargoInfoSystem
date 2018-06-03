/*
 * @Author: Mr.He 
 * @Date: 2018-03-21 16:25:11 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-29 08:14:17
 * @content what is the content of this file. */

import { DB } from "common/db";
import uuid = require("uuid");
import { Model } from 'sequelize';
import { getNamespace } from "continuation-local-storage";
import { ModelBase } from "common/model";
import { Restful } from 'common/restful';
import { Context } from 'koa';

export enum Role {
    OWN = 1,
    MANGER = 2,
    COMMON = 3
}

@Restful()
export class Staff extends ModelBase {
    static model: any = DB.models.staff;
    constructor() {
        super();
    }

    async post(ctx: Context) {

        let { accountId, password, mobile, sex, name, age } = ctx.request.body;
        let account = await this.model.findOne({
            where: {
                mobile: mobile
            }
        });

        if (account) {
            throw new Error("mobile is already have");
        }

        if (!mobile || !password) {
            throw new Error("register account need mobile and password");
        }

        let result = await this.model.create({
            id: uuid.v1(),
            mobile: mobile,
            password: password,
            name: name,
            sex: sex,
            age: age
        });
        ctx.body = {
            code: 0,
            msg: "ok",
            data: result
        }
    }
}