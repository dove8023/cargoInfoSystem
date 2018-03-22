/*
 * @Author: Mr.He 
 * @Date: 2018-03-21 17:17:54 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-21 23:24:13
 * @content what is the content of this file. */

import { account, company, staff } from "model";


class Register {
    async register(params: { mobile: string; password: string; authCode: string; username: string; companyName: string }) {
        let { mobile, password, authCode, username, companyName } = params;

        /* 检查验证码 */


        let hasAccount = await account.model.findOne({
            where: {
                mobile
            }
        });

        if (hasAccount) {
            throw new Error("mobile is already have.");
        }
        /* create account */
        let registAccount = await account.add({
            mobile,
            password,
            name: username
        });
        /* create company */
        let registCompany = await company.add({
            createUser: registAccount.id,
            name: companyName
        });
        /* create staff */
        let registStaff = await staff.model.create({
            name: username,
            roleId: 1,
            companyId: registCompany.id,
            accountId: registAccount.id
        });

        /* 企业注册成功 */
        return {
            code: 0,
            msg: "注册成功",
            data: null
        }
    }
}

export let register = new Register();