/*
 * @Author: Mr.He 
 * @Date: 2018-06-02 18:58:05 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-18 10:11:48
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
            return ctx.error(301);
        }
        /* 检查验证码 */

        /* check is already registed. */
        let hasAccount = await Models.Account.findOne({
            where: {
                mobile
            }
        });

        if (hasAccount) {
            return ctx.error(114);
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
            return ctx.error(301);
        }

        let account = await Models.Account.findOne({
            where: {
                mobile
            }
        });
        if (!account) {
            return ctx.error(112);
        }

        if (account.password != password) {
            return ctx.error(113);
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