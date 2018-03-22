/*
 * @Author: Mr.He 
 * @Date: 2018-03-02 17:05:04 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-20 14:11:25
 * @content what is the content of this file. */

import sequelize = require("sequelize");
import { DB } from 'common/db';

let columns = {
    id: {
        type: sequelize.UUID,
        primaryKey: true,
    },
    name: {
        type: sequelize.STRING(50),
        allowNull: false,
    },
    sex: {
        type: sequelize.INTEGER,
        allowNull: true,
    },
    avatar: {
        type: sequelize.STRING,
        allowNull: true,
    },
    roleId: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    companyId: {
        type: sequelize.UUID,
        allowNull: false
    },
    accountId: {
        type: sequelize.UUID,
        allowNull: false
    },
    deletedAt: {
        type: sequelize.DATE,
        allowNull: true,
    }
}

let options = {
    indexes: [
        {
            name: "companyId",
            fields: ['companyId']
        },
        {
            name: "accountId",
            fields: ['accountId']
        }
    ],
    underscored: true,
    timestamps: true,
    tableName: 'staff'
}
DB.models.staff = DB.define('Staff', columns, options);