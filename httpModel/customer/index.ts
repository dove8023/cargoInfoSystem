/*
 * @Author: Mr.He 
 * @Date: 2018-06-10 10:18:57 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-10 23:16:46
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

        ctx.body = {
            code: 0,
            msg: "ok",
            data: addOne
        }
    }

    async put(ctx: Context) {
        let { id } = ctx.params;
        let { name, address, mobile, other } = ctx.request.body;
        if (!name) {
            throw new Error("参数不正确");
        }

        let type = await ModelBase.resourceCheck(id, this.model);

        await this.model.update({
            name,
            address,
            mobile,
            other
        }, {
                where: { id }
            })
        ctx.body = {
            code: 0,
            data: type,
            msg: "ok"
        }
    }
}