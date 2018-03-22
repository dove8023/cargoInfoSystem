/*
 * @Author: Mr.He 
 * @Date: 2018-03-21 16:25:11 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-21 19:22:46
 * @content what is the content of this file. */

import { DB } from "common/db";
import uuid = require("uuid");
import { Model } from 'sequelize';

export interface ROLE {
    OWN: 1,
    MANGER: 2,
    COMMON: 3
}

class Staff {
    public model: Model<any, any>;
    constructor(model: Model<any, any>) {
        this.model = model;
    }

    async get(id: string) {
        return await this.model.findOne({
            where: {
                id
            }
        });
    }

    async find(params: { page?: number, size?: number, companyId: string, [index: string]: any }) {
        let { page = 0, size = 20, companyId } = params;
        let where = {
            companyId
        };

        return await this.model.find({
            where,
            limit: size,
            offset: page * size
        });
    }

    async add(params: { accountId: string, password: string, [index: string]: any }) {
        let account = await this.model.findOne({
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

        let result = await this.model.create({
            id: uuid.v1(),
            mobile: params.mobile,
            password: params.password,
            name: params.name,
            sex: params.sex,
            age: params.age
        });
        return result;
    }

    update() {

    }

    delete() {

    }
}

export let staff = new Staff(DB.models.Staff as Model<any, any>);