/*
 * @Author: Mr.He 
 * @Date: 2018-06-18 00:23:10 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-18 00:50:40
 * @content what is the content of this file. */


import Models from "sqlModel";
import * as uuid from "uuid";
import { UserInfo } from 'httpModel/interface';
import { getNamespace } from 'continuation-local-storage';



export interface Goods {
    price: number;
    amount: number;
    weight: number;
    typeId: string;
};

let GoodsModel = Models.Goods;

export async function addGoods(params: {
    goods: Goods[],
    customerId: string,
    orderId: string
}): Promise<Goods[]> {
    let userInfo: UserInfo = getNamespace("session").get("session");
    let ps = [];
    for (let item of params.goods) {
        ps.push(GoodsModel.create({
            id: uuid.v1(),
            companyId: userInfo.company.id,
            operaterId: userInfo.staff.id,
            customerId: params.customerId,
            orderId: params.orderId,
            ...item
        }));
    }

    return Promise.all(ps);
}