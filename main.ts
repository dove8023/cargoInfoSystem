/*
 * @Author: Mr.He 
 * @Date: 2018-03-02 11:19:32 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-02 12:28:15
 * @content what is the content of this file. */

require('app-module-path').addPath(__dirname);
import fs = require("fs");
let config = require("config.local");
import { init, DB } from "common/db";

process.on('unhandledRejection', (reason: any, p: PromiseLike<any>) => {
    console.error(reason);
});
process.on('uncaughtException', function (err) {
    console.error('uncaughtException==>', err.stack ? err.stack : err);
});

init(config.postgres.url);
import "modelSql/index";

import app from "./http";
const http = require("http");

console.log(1234, config);
let PORT = '3000';

DB.sync({ force: false });
/* 
import cluster = require("cluster");
const pkg = require("./package.json");


if (cluster.isMaster) {
    console.log("PORT  === >  ", PORT);
    let result = await checkListeningPort(PORT);
}
if (config.cluster && cluster.isMaster) {
    process.title = `${config.appName || pkg.name}-master`;
    let len = Number(config.cluster) || 2;
    for (var i = 0; i < len; i++) {
        cluster.fork();
    }
    cluster.on('exit', function (worker) {
        logger.error(`worker ${worker.process.pid} has died!`);
        cluster.fork();
    })
    return;
}
if (cluster.isWorker) {
    process.title = `${config.appName || pkg.name}-worker`;
} */


//开启http服务
let server = http.createServer(app);
server.on('listening', function () {
    if (!/^\d+$/.test(PORT)) {
        fs.chmodSync(PORT, '777')
    }
});

server.on('error', (err: Error) => {
    throw err;
})

server.listen(PORT, () => {
    console.log("http server running ", PORT);
});





/* var net = require('net');
function checkListeningPort(path: string) {

    var conn = {} as { port: any; path: any };
    if (/^\d+$/.test(path)) {
        conn.port = path;
    } else {
        conn.path = path;
        if (!fs.existsSync(path)) {
            return Promise.resolve();
        } else {
            fs.unlinkSync(path);
            return Promise.resolve();
        }
    }

    return new Promise(function (resolve, reject) {

        var client = net.connect(conn);
        client.on('error', function (e) {
            if (e.code == 'ECONNREFUSED') {
                if (conn.path) {
                    fs.unlink(conn.path, function () {
                        resolve();
                    });
                } else {
                    resolve();
                }
            } else {
                reject(e);
            }
        });
        client.on('connect', function () {
            reject(new Error('Address is in use: ' + path));
            client.end();
        });
    });
} */