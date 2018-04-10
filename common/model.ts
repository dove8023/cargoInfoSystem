/*
 * @Author: Mr.He 
 * @Date: 2018-04-10 08:57:56 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-10 10:06:02
 * @content what is the content of this file. */

import { Model } from 'sequelize';
import { getNamespace } from 'continuation-local-storage';
import { UserInfo } from 'model/interface';
import * as moment from 'moment';


export class ModelBase {
    model: Model<any, any>;
    constructor(model: Model<any, any>) {
        this.model = model;
    }

    async resourceCheck(id: string): Promise<any> {
        let userInfo: UserInfo = getNamespace("session").get("session");
        let result = await this.model.findById(id);
        if (result && result.deletedAt) {
            throw new Error("Record not found.");
        }
        if (result.companyId != userInfo.company.id) {
            throw new Error("Permission denied.")
        }

        return result;
    }

    async get(id: string) {
        return await this.resourceCheck(id);
    }

    async find(where: any) {
        let { page = 0, limit = 20 } = where;
        if (limit > 20) {
            limit = 20;
        }

        let userInfo: UserInfo = getNamespace("session").get("session");
        return await this.model.findAndCountAll({
            where: {
                companyId: userInfo.company.id,
                deletedAt: null
            },
            order: [["created_at", "desc"]],
            offset: page * limit,
            limit
        });
    }

    async post(params: any) {

    }

    async put(id: string, params: any) {
        let result = await this.resourceCheck(id);
        return await this.model.update(params, {
            where: {
                id
            }
        });
    }

    async delete(id: string) {
        let result = await this.resourceCheck(id);
        return await this.model.update({
            deletedAt: moment().format()
        }, {
                where: {
                    id
                }
            })
    }
}