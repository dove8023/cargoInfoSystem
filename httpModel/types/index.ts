/*
 * @Author: Mr.He 
 * @Date: 2018-06-10 10:18:57 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-10 23:16:46
 * @content what is the content of this file. */


import { ModelBase } from "common/model";
import { Context } from 'koa';
import { Restful, Router } from "common/restful";
import Models from "modelSql";
import * as uuid from "uuid";
import { UserInfo } from 'httpModel/interface';
import { getNamespace } from 'continuation-local-storage';


@Restful()
export class Types extends ModelBase {
    static model: any = Models.Types;
    constructor() {
        super();
    }


    async post(ctx: Context) {
        let { price, name } = ctx.request.body;
        let userInfo: UserInfo = getNamespace("session").get("session");

        /* name unique check. */
        let result = await this.model.findOne({
            where: {
                name,
                companyId: userInfo.company.id
            }
        });
        if (result) {
            throw new Error("品种名称必须唯一");
        }

        let types = await this.model.create({
            id: uuid.v1(),
            companyId: userInfo.company.id,
            operaterId: userInfo.staff.id,
            name,
            price,
            hisPrice: [{
                name,
                price
            }]
        });

        ctx.body = {
            code: 0,
            msg: "ok",
            data: types
        }
    }

    async put(ctx: Context) {
        let { id } = ctx.params;
        let { name, price } = ctx.request.body;
        if (!name && !price) {
            throw new Error("参数不正确");
        }

        let type = await ModelBase.resourceCheck(id, this.model);
        price = Number(price);
        price = price ? price : type.price;
        name = name ? name : type.name;

        type.hisPrice.push({
            name,
            price
        })

        await this.model.update({
            hisPrice: type.hisPrice,
            name,
            price
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