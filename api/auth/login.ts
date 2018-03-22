/*
 * @Author: Mr.He 
 * @Date: 2018-03-02 22:40:37 
 * @Last Modified by:   Mr.He 
 * @Last Modified time: 2018-03-02 22:40:37 
 * @content login. */

import { account } from "model/account/account";

class Login {
    async login(mobile: string, password: string) {
        if (!mobile || !password) {

        }
        account.find({
            mobile,
            password
        })
    }
}