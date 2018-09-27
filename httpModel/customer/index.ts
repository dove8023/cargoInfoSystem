/*
 * @Author: Mr.He 
 * @Date: 2018-06-10 10:18:57 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-18 10:23:52
 * @content what is the content of this file. */


import { ModelBase } from "common/model";
import { Context } from 'koa';
import { Restful, Router } from "common/restful";
import Models from "sqlModel";
import * as uuid from "uuid";
import { UserInfo } from 'httpModel/interface';
import { getNamespace } from 'continuation-local-storage';


@Restful()
export class Customer extends ModelBase {
    static model: any = Models.Customer;
    constructor() {
        super();
    }

    @Router("/customer/search")
    async search(ctx: Context) {
        let { keyword, limit = 10 } = ctx.request.query;
        let userInfo: UserInfo = getNamespace("session").get("session");

        if (!keyword) {
            return ctx.error(301);
        }

        if (limit > 10) {
            limit = 10;
        }

        let rows = await this.model.findAll({
            where: {
                name: {
                    $like: `%${keyword}%`
                },
                companyId: userInfo.company.id,
                deletedAt: null
            },
            limit
        })

        ctx.success(rows || []);
    }

    async post(ctx: Context) {
        let { name, address, mobile, other } = ctx.request.body;
        let userInfo: UserInfo = getNamespace("session").get("session");

        let addOne = await this.model.create({
            id: uuid.v1(),
            companyId: userInfo.company.id,
            operaterId: userInfo.staff.id,
            name,
            address,
            mobile,
            other
        });

        ctx.success(addOne);
    }

    async put(ctx: Context) {
        let { id } = ctx.params;
        let { name, address, mobile, other } = ctx.request.body;
        if (!name) {
            return ctx.error(301);
        }

        let type = await ModelBase.resourceCheck(id, this.model, ctx);

        await this.model.update({
            name,
            address,
            mobile,
            other
        }, {
                where: { id }
            })
        ctx.success(type);
    }
}