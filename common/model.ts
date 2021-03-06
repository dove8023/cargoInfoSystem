/*
 * @Author: Mr.He 
 * @Date: 2018-04-10 08:57:56 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-18 10:20:56
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

    static async resourceCheck(id: string, model: Model<any, any>, ctx: Context): Promise<any> {
        let userInfo: UserInfo = getNamespace("session").get("session");
        let result = await model.findById(id);
        if (result && result.deletedAt) {
            return ctx.error(202);
        }
        if (result.companyId != userInfo.company.id) {
            return ctx.error(201);
        }

        return result;
    }

    async get(ctx: Context) {
        let id = ctx.params.id;
        let result = await ModelBase.resourceCheck(id, this.model, ctx);

        if (result && result.deletedAt) {
            result = null;
        }

        ctx.success(result);
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

        ctx.success(result);
    }

    async post(ctx: Context) {

    }

    async put(ctx: Context) {
        let { id } = ctx.params;
        let params = ctx.request.body;
        await ModelBase.resourceCheck(id, this.model, ctx);
        let result = await this.model.update(params, {
            where: {
                id
            }
        });

        ctx.success(result);
    }

    async delete(ctx: Context) {
        let { id } = ctx.params;
        await ModelBase.resourceCheck(id, this.model, ctx);
        let result = await this.model.update({
            deletedAt: moment().format()
        }, {
                where: {
                    id
                }
            });

        ctx.success(result);
    }
}