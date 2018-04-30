/*
 * @Author: Mr.He 
 * @Date: 2018-03-21 16:25:11 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-29 10:01:34
 * @content what is the content of this file. */

import { DB } from "common/db";
import uuid = require("uuid");
import { Model } from 'sequelize';
import { ModelBase } from "common/model";
import { Context } from 'koa';
import { Restful, Router } from "common/restful";

@Restful()
export class Company extends ModelBase {
    static model: any = DB.models.company;
    constructor() {
        super();
    }

    async find(ctx: Context) {
        ctx.body = {
            code: -1,
            msg: "not Open"
        }
    }

    async post(ctx: Context) {
        let { createUser, name } = ctx.request.body;

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
        ctx.body = {
            code: 0,
            msg: "ok",
            data: result
        };
    }

    async delete(ctx: Context) {
        ctx.body = {
            code: -1,
            msg: "not Open"
        }
    }
}