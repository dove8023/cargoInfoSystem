import sequelize, { Sequelize } from 'sequelize';

/*
 * @Author: Mr.He 
 * @Date: 2018-03-02 11:55:52 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-21 18:29:53
 * @content what is the content of this file. */

export let DB: Sequelize;
export function init(conn_url: string, needlog: boolean = false) {
    var options = {
        timezone: '+08:00',
        logging: needlog
    } as any;
    if (/^postgres:\/\/.*ssl=true/.test(conn_url)) {
        options.dialect = 'postgres';
        options.dialectOptions = { ssl: true };
    }
    DB = new sequelize(conn_url, options);
    DB.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((err: Error) => {
            console.error('Unable to connect to the database:', err);
        });
}