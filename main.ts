/*
 * @Author: Mr.He 
 * @Date: 2018-03-02 11:19:32 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-07 00:43:50
 * @content what is the content of this file. */

require('app-module-path').addPath(__dirname);
import fs = require("fs");
let config = require("config.local");
import { init, DB } from "common/db";
import cache from "common/cache";

process.on('unhandledRejection', (reason: any, p: PromiseLike<any>) => {
    console.error("1111 unhandledRejection", reason);
});
process.on('uncaughtException', function (err) {
    console.error('2222 uncaughtException==>', err.stack ? err.stack : err);
});

init(config.postgres.url, config.postgres.debug);
import "modelSql/index";
import "model";

cache.init(config.redis.url);

import app from "./http";
const http = require("http");

let PORT = config.port;

DB.sync({ force: false });

// import "model/account/account";

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

let server = http.createServer(app.callback());
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