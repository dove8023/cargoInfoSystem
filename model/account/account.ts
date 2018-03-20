/*
 * @Author: Mr.He 
 * @Date: 2018-03-02 22:30:07 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-02 22:58:01
 * @content what is the content of this file. */

import { DB } from "common/db";
import uuid = require("uuid");

class Account {
    async get(id: string) {
        return await DB.models.Account.findOne({
            where: {
                id
            }
        });
    }

    async find(params: { page?: number, size?: number, mobile?: string, password?: string }) {
        let { page = 0, size = 20, mobile, password } = params;
        return await DB.models.Account.find({
            where: {
                mobile,
                password
            },
            limit: size,
            offset: page * size
        });
    }

    async add(params: { mobile: string, password: string, [index: string]: any }) {
        //check if the mobile already have.
        let result = await DB.models.Account.create({
            id: uuid.v1(),
            mobile: params.mobile,
            password: params.password,
            name: params.name,
            sex: params.sex,
            age: params.age
        });
        return result;
    }

    update() {

    }

    delete() {

    }
}

export let account = new Account();

setTimeout(async () => {
    let result = account.add({
        mobile: '15210102211',
        password: '123456'
    });
}, 3000);
