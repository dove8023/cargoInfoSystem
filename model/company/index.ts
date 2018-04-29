/*
 * @Author: Mr.He 
 * @Date: 2018-03-21 16:25:11 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-29 10:01:34
 * @content what is the content of this file. */

import { DB } from "common/db";
import uuid = require("uuid");
import { Model } from 'sequelize';

export class Company {
    model: Model<any, any>;
    static model: any = DB.models.customer;
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

    async find(params: { page?: number, size?: number, name: string, createUser: string, [index: string]: any }) {
        let { page = 0, size = 20, createUser } = params;
        let where = {
            createUser
        };

        return await this.model.findOne({
            where,
            limit: size,
            offset: page * size
        });
    }

    async add(params: { createUser: string, name: string, [index: string]: any }) {
        let { createUser, name } = params;

        let company = await this.model.findOne({
            where: {
                createUser
            }
        });

        if (company) {
            throw new Error("one mobile only create one company.");
        }

        let result = await this.model.create({
            id: uuid.v1(),
            createUser,
            name
        });
        return result;
    }

    update() {

    }

    delete() {

    }
}

// export let company = new Company(DB.models.Company as Model<any, any>);