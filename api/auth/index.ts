/*
 * @Author: Mr.He 
 * @Date: 2018-03-02 22:40:37 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-29 10:03:00
 * @content login. */

import * as md5 from "md5";
import { Account, Staff, Company } from "model";
import cache from "common/cache";
import * as Koa from 'koa';
import { Restful, Router } from 'common/restful';
import { Context } from 'koa';

@Restful()
export class Auth {

    @Router("/test", "get")
    test(ctx: Context) {
        ctx.body = "test test";
    }

    @Router("/login", "post")
    async login(ctx: Context) {
        let { mobile, password } = ctx.request.body;
        mobile = String(mobile);
        password = String(password);
        if (!mobile || !password) {
            throw new Error("mobile, password is need.");
        }

        let _account = await Account.model.findOne({
            where: {
                mobile
            }
        });

        if (!_account) {
            return {
                code: -1,
                msg: "账户不存在",
                data: null
            }
        }

        if (_account.password != password) {
            return {
                code: -1,
                msg: "密码不正确"
            }
        }

        let Users = {
            staff: null,
            company: null,
            account: _account
        }

        let _staff = await Staff.model.findOne({
            where: {
                accountId: _account.id
            }
        });
        if (!_staff) {
            throw new Error("Staff, 丢失");
        }

        let _company = await Company.model.findOne({
            where: {
                id: _staff.companyId
            }
        });
        if (!_company) {
            throw new Error("Company, 丢失");
        }

        Users.staff = _staff;
        Users.company = _company;

        let token = Auth.getToken(_staff.id, _company.id);
        await cache.write(token, Users, 60 * 30);

        ctx.body = {
            code: 0,
            msg: "登陆成功",
            data: {
                token
            }
        }
    }

    static getToken(staffId: string, companyId: string) {
        let str = [...arguments, Date.now()].join(":");
        return md5(str);
    }

    static async loginCheck(ctx: Koa.Context) {
        let allowUrls = ["/auth/login", "/auth/register", "/test", "/favicon.ico"];
        let url = ctx.url;
        if (allowUrls.indexOf(url) > -1) {
            return true;
        }

        let { token } = ctx.header;
        if (!token) {
            throw new Error("token dose not exist. " + url);
        }
        let session = await cache.read(token);
        if (!session) {
            throw new Error("token has expired. " + url);
        }

        ctx.state = {
            session
        }
    }
}