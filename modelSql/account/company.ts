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
    createUser: {
        type: sequelize.UUID,
        allowNull: false,
    },
    staffNum: {
        type: sequelize.INTEGER,
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
            name: "name",
            fields: ['name']
        },
        {
            name: "createUser",
            fields: ['createUser']
        }
    ],
    underscored: true,
    timestamps: true,
    tableName: 'company'
}
DB.models.company = DB.define('Company', columns, options);