/*
 * @Author: Mr.He 
 * @Date: 2018-04-01 21:16:01 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-01 21:19:34
 * @content what is the content of this file. */

import sequelize = require("sequelize");
import { DB } from "common/db";

let columns = {
    id: {
        type: sequelize.UUID,
        primaryKey: true,
    },
    companyId: {
        type: sequelize.UUID,
        allowNull: false,
    },
    //added staff's id
    operaterId: {
        type: sequelize.UUID,
        allowNull: false,
    },
    customerId: {
        type: sequelize.UUID,
        allowNull: false,
    },
    orderId: {
        type: sequelize.UUID,
        allowNull: false,
    },
    typeId: {
        type: sequelize.UUID,
        allowNull: false,
    },
    price: {
        type: sequelize.NUMERIC,
        allowNull: false,
    },
    // 金额
    amount: {
        type: sequelize.NUMERIC,
        allowNull: false,
    },
    weight: {
        type: sequelize.FLOAT,
        allowNull: false,
    },
    deletedAt: {
        type: sequelize.DATE,
        allowNull: true,
    }
}

let options = {
    indexes: [
        {
            name: "good_company_id",
            fields: ['companyId']
        },
        {
            name: "good_customer_id",
            fields: ["customerId"]
        },
        {
            name: "good_operater_id",
            fields: ["operaterId"]
        },
        {
            name: "good_type_id",
            fields: ["typeId"]
        }
    ],
    underscored: true,
    timestamps: true,
    tableName: 'goods'
}

export default DB.define('Goods', columns, options);