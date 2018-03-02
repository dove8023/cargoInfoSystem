import sequelize, { Sequelize } from 'sequelize';

/*
 * @Author: Mr.He 
 * @Date: 2018-03-02 11:55:52 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-02 12:26:52
 * @content what is the content of this file. */

export let DB: Sequelize;
export function init(conn_url: string) {
    var url = conn_url;
    var options = {
        timezone: '+08:00',
    } as any;
    if (/^postgres:\/\/.*ssl=true/.test(url)) {
        options.dialect = 'postgres';
        options.dialectOptions = { ssl: true };
    }
    exports.DB = new sequelize(url, options);
}