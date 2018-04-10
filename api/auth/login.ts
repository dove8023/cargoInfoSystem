/*
 * @Author: Mr.He 
 * @Date: 2018-03-02 22:40:37 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-29 08:36:25
 * @content login. */

import * as md5 from "md5";
import { account, staff, company } from "model";
import cache from "common/cache";
import * as Koa from 'koa';

class Login {
    async login(params: { mobile: string, password: string }) {
        let { mobile, password } = params;
        mobile = String(mobile);
        password = String(password);
        if (!mobile || !password) {
            throw new Error("mobile, password is need.");
        }

        let _account = await account.model.findOne({
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

        let _staff = await staff.model.findOne({
            where: {
                accountId: _account.id
            }
        });
        if (!_staff) {
            throw new Error("Staff, 丢失");
        }

        let _company = await company.model.findOne({
            where: {
                id: _staff.companyId
            }
        });
        if (!_company) {
            throw new Error("Company, 丢失");
        }

        Users.staff = _staff;
        Users.company = _company;

        let token = this.getToken(_staff.id, _company.id);
        await cache.write(token, Users, 60 * 30);

        return {
            code: 0,
            msg: "登陆成功",
            data: {
                token
            }
        }
    }

    getToken(staffId: string, companyId: string) {
        let str = [...arguments, Date.now()].join(":");
        return md5(str);
    }

    async loginCheck(ctx: Koa.Context) {
        let allowUrls = ["/auth/login", "/auth/register", "/test"];
        let url = ctx.url;
        if (allowUrls.indexOf(url) > -1) {
            return true;
        }

        let { token } = ctx.header;
        if (!token) {
            throw new Error("token dose not exist.");
        }
        let session = await cache.read(token);
        if (!session) {
            throw new Error("token has expired.");
        }

        ctx.state = {
            session
        }
    }
}

let login = new Login();
export default login;