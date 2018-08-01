/*
 * @Author: Mr.He 
 * @Date: 2018-08-01 19:48:14 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-08-01 20:05:59
 * @content: 
 */


const path = require("path");
require('app-module-path').addPath(path.join(__dirname, "../"));
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


/* init DB, import table models. */
init(config.postgres.url, config.postgres.debug);
import "sqlModel/index";
DB.sync({ force: false });

/* inject redis server. */
cache.init(config.redis.url);

import app from "../http";


const superkoa = require('superkoa')
const bootup = superkoa(app);
const HTTP_OK = 200;
const HTTP_ERR = 500;
import test from "ava";

test("arrasy are equal", (t) => {
    t.deepEqual([11, 22], [11, 22])
})