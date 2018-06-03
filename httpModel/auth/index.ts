/*
 * @Author: Mr.He 
 * @Date: 2018-06-02 18:58:05 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-02 19:00:33
 * @content: Login and register
 */


import * as md5 from "md5";
import Models from "modelSql";
import cache from "common/cache";
import Koa, { Context } from 'koa';
import { Restful, Router } from 'common/restful';
import uuid from "uuid";

@Restful()
export class Auth {

    @Router("/open/test", "get")
    test(ctx: Context) {
        console.log("what");
        ctx.body = "test test";
    }

    @Router("/open/register", "post")
    async register(ctx: Context) {
        let { mobile, password, authCode, name } = ctx.request.body;
        if (!mobile || !password || !name) {
            throw new Error("注册参数不完善");
        }

        /* 检查验证码 */

        /* check is already registed. */
        let hasAccount = await Models.Account.findOne({
            where: {
                mobile
            }
        });

        if (hasAccount) {
            throw new Error("mobile is already registed.");
        }

        /* create account */
        let account = await Models.Account.create({
            id: uuid.v1(),
            mobile,
            name,
            password
        });

        /* create company */
        let registCompany = await Models.Company.create({
            createUser: registAccount.id,
            name: companyName
        });

        /* create staff */
        let registStaff = await staff.model.create({
            id: uuid.v1(),
            name: username,
            roleId: Role.OWN,
            companyId: registCompany.id,
            accountId: registAccount.id
        });

        /* 企业注册成功 */
        ctx.body = {
            code: 0,
            msg: "注册成功，请立即登陆",
            data: hasAccount
        }
    }
}