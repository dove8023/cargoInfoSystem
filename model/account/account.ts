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

    find() {

    }

    async add(params: { mobile: string, password: string, [index: string]: any }) {
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
