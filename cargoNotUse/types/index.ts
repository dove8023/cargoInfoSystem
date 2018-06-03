/*
 * @Author: Mr.He 
 * @Date: 2018-03-28 11:08:01 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-29 08:14:22
 * @content what is the content of this file. */

import { DB } from "common/db";
import uuid = require("uuid");
import { Model } from "sequelize";
import { Context } from 'koa';
import * as moment from 'moment';
import { UserInfo } from '../interface';
import { ModelBase } from "common/model";
import { Restful } from 'common/restful';

@Restful()
export class Types extends ModelBase {
    static model: any = DB.models.types;
    constructor() {
        super();
    }

    async post(ctx: Context) {
        let { name, price } = ctx.request.body;
        if (!name || !price) {
            throw new Error("types add, need name and price");
        }
        let companyId = ctx.state.users.company.id;
        let operaterId = ctx.state.users.staff.id;

        return await this.model.create({
            id: uuid.v1(),
            companyId,
            operaterId,
            name,
            price,
            hisPrice: [{
                price,
                time: moment().format()
            }]
        });
    }
}

// export let types = new Types(DB.models.types as Model<any, any>);
