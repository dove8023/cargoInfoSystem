/*
 * @Author: Mr.He 
 * @Date: 2018-04-10 08:57:56 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-10 22:59:02
 * @content what is the content of this file. */

import { Model } from 'sequelize';
import { getNamespace } from 'continuation-local-storage';
import { UserInfo } from 'httpModel/interface';
import * as moment from 'moment';
import { Context } from "koa";


export class ModelBase {
    model: any = '';
    name: string = '';
    constructor() { }

    static async resourceCheck(id: string, model: Model<any, any>): Promise<any> {
        let userInfo: UserInfo = getNamespace("session").get("session");
        let result = await model.findById(id);
        if (result && result.deletedAt) {
            throw new Error("Record not found.");
        }
        if (result.companyId != userInfo.company.id) {
            throw new Error("Permission denied.");
        }

        return result;
    }

    async get(ctx: Context) {
        let id = ctx.params.id;
        await ModelBase.resourceCheck(id, this.model);

        let result = await this.model.findById(id);
        if (result && result.deletedAt) {
            result = null;
        }
        ctx.body = {
            code: 0,
            data: result,
            msg: "ok"
        }
    }

    async find(ctx: Context) {
        let { page = 0, limit = 20 } = ctx.request.query;
        if (limit > 50) {
            limit = 50;
        }

        let userInfo: UserInfo = getNamespace("session").get("session");
        let whereOptions: { [index: string]: any } = {
            deletedAt: null
        }
        if (this.name != "Company" && this.name != "Account") {
            whereOptions.companyId = userInfo.company.id;
        }

        let result = await this.model.findAndCountAll({
            where: whereOptions,
            order: [["created_at", "desc"]],
            offset: page * limit,
            limit
        });
        ctx.body = {
            code: 0,
            data: result,
            msg: "ok"
        }
    }

    async post(ctx: Context) {

    }

    async put(ctx: Context) {
        let { id } = ctx.params;
        let params = ctx.request.body;
        await ModelBase.resourceCheck(id, this.model);
        let result = await this.model.update(params, {
            where: {
                id
            }
        });

        ctx.body = {
            code: 0,
            data: result,
            msg: "ok"
        }
    }

    async delete(ctx: Context) {
        let { id } = ctx.params;
        await ModelBase.resourceCheck(id, this.model);
        let result = await this.model.update({
            deletedAt: moment().format()
        }, {
                where: {
                    id
                }
            });

        ctx.body = {
            code: 0,
            data: result,
            msg: "ok"
        }
    }
}