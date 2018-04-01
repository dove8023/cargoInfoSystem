/*
 * @Author: Mr.He 
 * @Date: 2018-03-28 10:31:11 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-28 15:28:54
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
    price: {
        type: sequelize.NUMERIC,
        allowNull: false,
    },
    hisPrice: {
        type: sequelize.JSON,
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
            name: "company_id",
            fields: ['companyId']
        }
    ],
    underscored: true,
    timestamps: true,
    tableName: 'types'
}
DB.models.types = DB.define('Types', columns, options);