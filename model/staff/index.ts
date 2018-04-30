/*
 * @Author: Mr.He 
 * @Date: 2018-03-21 16:25:11 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-29 08:14:17
 * @content what is the content of this file. */

import { DB } from "common/db";
import uuid = require("uuid");
import { Model } from 'sequelize';
import { getNamespace } from "continuation-local-storage";
import { ModelBase } from "common/model";
import { Restful } from 'common/restful';

export enum Role {
    OWN = 1,
    MANGER = 2,
    COMMON = 3
}

@Restful()
class Staff extends ModelBase {
    static model: any = DB.models.staff;
    constructor() {
        super();
    }

    async post(params: { accountId: string, password: string, [index: string]: any }) {
        let account = await this.model.findOne({
            where: {
                mobile: params.mobile
            }
        });

        if (account) {
            throw new Error("mobile is already have");
        }

        if (!params.mobile || !params.password) {
            throw new Error("register account need mobile and password");
        }

        let result = await this.model.create({
            id: uuid.v1(),
            mobile: params.mobile,
            password: params.password,
            name: params.name,
            sex: params.sex,
            age: params.age
        });
        return result;
    }
}