/*
 * @Author: Mr.He 
 * @Date: 2018-03-29 10:21:01 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-01 11:54:41
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
    name: {
        type: sequelize.STRING(50),
        allowNull: false,
    },
    address: {
        type: sequelize.STRING(150),
        allowNull: true,
    },
    mobile: {
        type: sequelize.STRING,
        allowNull: true,
    },
    deletedAt: {
        type: sequelize.DATE,
        allowNull: true,
    }
}

let options = {
    indexes: [
        {
            name: "customer_company_id",
            fields: ['companyId']
        },
        {
            name: "customer_name",
            fields: ["name"]
        }
    ],
    underscored: true,
    timestamps: true,
    tableName: 'customer'
}
DB.models.customer = DB.define('Customer', columns, options);