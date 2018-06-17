/*
 * @Author: Mr.He 
 * @Date: 2018-06-02 18:58:05 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-10 18:18:11
 * @content: Login and register
 */


import * as md5 from "md5";
import Models from "sqlModel";
import cache from "common/cache";
import Koa, { Context } from 'koa';
import { Restful, Router } from 'common/restful';
import * as uuid from "uuid";
import { ROLE } from "httpModel/interface";

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
        mobile = String(mobile);
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
        let company = await Models.Company.create({
            id: uuid.v1(),
            createUser: account.id,
            name: mobile + "'s Company"
        });

        /* create staff */
        let staff = await Models.Staff.create({
            id: uuid.v1(),
            name,
            roleId: ROLE.OWN,
            companyId: company.id,
            accountId: account.id
        });

        /* 企业注册成功 */
        ctx.body = {
            code: 0,
            msg: "注册成功，请立即登陆",
            data: {
                account,
                company,
                staff
            }
        }
    }

    @Router("/open/login", "post")
    async login(ctx: Context) {
        let { mobile, password } = ctx.request.body;
        mobile = String(mobile);
        if (!mobile || !password) {
            throw new Error("注册参数不完善");
        }

        let account = await Models.Account.findOne({
            where: {
                mobile
            }
        });
        if (!account) {
            ctx.body = {
                code: -1,
                msg: "未注册"
            }
            return;
        }

        if (account.password != password) {
            ctx.body = {
                code: -1,
                msg: "密码不正确"
            }
            return;
        }

        let staff = await Models.Staff.findOne({
            where: {
                accountId: account.id
            }
        });

        let company = await Models.Company.findById(staff.companyId);

        /* 存储token */
        let token = [account.id, mobile, Date.now(), "secret"].join(":");
        token = md5(token);
        await cache.write(token, {
            account, staff, company
        }, 60 * 300);

        ctx.body = {
            code: 0,
            msg: "登陆成功",
            data: {
                token
            }
        }
    }
}