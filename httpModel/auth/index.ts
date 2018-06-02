/*
 * @Author: Mr.He 
 * @Date: 2018-06-02 18:58:05 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-02 19:00:33
 * @content: Login and register
 */


import * as md5 from "md5";
import { Account, Staff, Company } from "httpModel";
import cache from "common/cache";
import * as Koa from 'koa';
import { Restful, Router } from 'common/restful';
import { Context } from 'koa';

@Restful()
export class Auth {

    @Router("/open/test", "get")
    test(ctx: Context) {
        console.log("what");
        ctx.body = "test test";
    }

    @Router("/open/register", "post")
    async register(ctx: Context) {
        let { mobile, password, authCode, username, companyName } = ctx.request.body;
        if (!mobile || !password || !username || !companyName) {
            throw new Error("注册参数不完善");
        }

        /* 检查验证码 */

        console.log(typeof Account, Account);
        let hasAccount = await Account.model.findOne({
            where: {
                mobile
            }
        });

        // if (hasAccount) {
        //     throw new Error("mobile is already have.");
        // }
        // /* create account */
        // let registAccount = await Account.post({
        //     mobile,
        //     password,
        //     name: username
        // });
        // /* create company */
        // let registCompany = await Company.post({
        //     createUser: registAccount.id,
        //     name: companyName
        // });
        // /* create staff */
        // let registStaff = await staff.model.create({
        //     id: uuid.v1(),
        //     name: username,
        //     roleId: Role.OWN,
        //     companyId: registCompany.id,
        //     accountId: registAccount.id
        // });

        /* 企业注册成功 */
        return {
            code: 0,
            msg: "注册成功，请立即登陆",
            data: null
        }
    }
}