/*
 * @Author: Mr.He 
 * @Date: 2018-03-02 22:30:07 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-29 11:37:12
 * @content what is the content of this file. */

import { DB } from "common/db";
import uuid = require("uuid");
import { Model } from "sequelize";
import { } from "common/"

export class Account {
    static model: Model<any, any> = DB.models.Account as Model<any, any>;
    constructor() {
    }

    async get(id: string) {
        return await Account.model.findOne({
            where: {
                id
            }
        });
    }

    async findOne(params: { mobile: string, password: string }) {
        let { mobile, password } = params;
        return await Account.model.findOne({
            where: {
                mobile,
                password
            }
        });
    }

    async find(params: { page?: number, size?: number, mobile?: string, password?: string }) {
        let { page = 0, size = 20, mobile, password } = params;
        return await Account.model.find({
            where: {
                mobile,
                password
            },
            limit: size,
            offset: page * size
        });
    }

    async add(params: { mobile: string, password: string, [index: string]: any }) {
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
    }

    update() {

    }

    delete() {

    }
}

// export let account = new Account(DB.models.Account as Model<any, any>);