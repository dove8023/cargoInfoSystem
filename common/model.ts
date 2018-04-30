/*
 * @Author: Mr.He 
 * @Date: 2018-04-10 08:57:56 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-29 11:35:59
 * @content what is the content of this file. */

import { Model } from 'sequelize';
import { getNamespace } from 'continuation-local-storage';
import { UserInfo } from 'model/interface';
import * as moment from 'moment';
import { Context } from "koa";


export class ModelBase {
    model: any = '';
    constructor() {
        console.log("ModelBase has")
    }

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
        // let result = await ModelBase.resourceCheck(id, this.model);

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
        if (limit > 20) {
            limit = 20;
        }

        let userInfo: UserInfo = getNamespace("session").get("session");
        let result = await this.model.findAndCountAll({
            where: {
                companyId: userInfo.company.id,
                deletedAt: null
            },
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

    async post(params: any) {

    }

    async put(ctx: Context) {
        let { id } = ctx.params;
        let params = ctx.request.body;
        // await ModelBase.resourceCheck(id, this.model);
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
        // await ModelBase.resourceCheck(id, this.model);
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