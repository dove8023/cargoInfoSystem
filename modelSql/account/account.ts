/*
 * @Author: Mr.He 
 * @Date: 2018-03-02 17:05:04 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-20 14:11:25
 * @content what is the content of this file. */

import sequelize = require("sequelize");
import { DB } from "common/db";

let columns = {
    id: {
        type: sequelize.UUID,
        primaryKey: true,
    },
    mobile: {
        type: sequelize.STRING(50),
        allowNull: false,
    },
    password: {
        type: sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize.STRING(50),
        allowNull: true,
    },
    recentlyStaffId: {
        type: sequelize.UUID,
        allowNull: true,
    },
    sex: {
        type: sequelize.CHAR(1),
        allowNull: true,
    },
    age: {
        type: sequelize.INTEGER,
        allowNull: true
    },
    deletedAt: {
        type: sequelize.DATE,
        allowNull: true,
    }
}

let options = {
    indexes: [
        {
            name: "mobile",
            fields: ['mobile']
        },
        {
            name: "password",
            fields: ['password']
        }
    ],
    underscored: true,
    timestamps: true,
    tableName: 'account'
}

export default DB.models.account = DB.define('Account', columns, options);