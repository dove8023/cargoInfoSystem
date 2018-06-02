/*
 * @Author: Mr.He 
 * @Date: 2018-04-06 23:23:45 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-06 23:33:09
 * @content what is the content of this file. */


export interface UserInfo {
    staff: {
        id: string;
        [index: string]: any
    },
    company: {
        id: string;
        [index: string]: any
    },
    account: {
        id: string;
        [index: string]: any
    }
}