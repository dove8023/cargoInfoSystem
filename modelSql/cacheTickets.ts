/*
 * @Author: Mr.He 
 * @Date: 2018-01-22 17:34:11 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-02 12:09:23
 * @content what is the content of this file. */

import sequelize = require("sequelize");
import { DB } from "common/db";

let columns = {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    from: {
        type: sequelize.STRING(50),
        allowNull: false,
    },
    to: {
        type: sequelize.STRING(50),
        allowNull: false,
    },
    channel: {
        type: sequelize.STRING(50),
        allowNull: false,
    },
    date: {
        type: sequelize.DATEONLY,
        allowNull: false
    },
    data: {
        type: sequelize.JSONB,
        allowNull: false,
    },
    originData: {
        type: sequelize.JSONB
    },
}

let options = {
    indexes: [
        {
            name: "cache_ticket_from",
            fields: ['from']
        },
        {
            name: "cache_ticket_to",
            fields: ['to']
        },
        {
            name: 'cache_ticket_channel',
            fields: ['channel']
        },
        {
            name: 'cache_ticket_created_at',
            fields: ['created_at']
        },
        {
            name: 'cache_ticket_date',
            fields: ['date']
        }
    ],
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    tableName: 'cache_tickets'
}
DB.models.CacheTicket = DB.define('CacheTicket', columns, options);