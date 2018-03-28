/*
 * @Author: Mr.He 
 * @Date: 2018-03-02 10:04:30 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-21 23:24:38
 * @content what is the content of this file. */

import express = require("express");
let conn_timeout = require("connect-timeout");
let bodyParser = require("body-parser");
let moment = require("moment");
import { router } from "./auth";
import { Response, NextFunction } from 'express';

let app = express();
app.use(conn_timeout("6s"));
app.use(bodyParser.json({ limit: '8mb' }));
app.use(bodyParser.urlencoded({ limit: '8mb', extended: true }));
app.use(usingTime);

app.use(router);


app.get("/test", (req, res: Response, next: Function) => {
    res.send("test ok");
});

/* 处理错误 */
app.use((err: any, req: express.Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    console.error("express http error: ", err);
    res.send(err.message || err);
});

function usingTime(req: any, res: any, next: any) {
    req.enterTime = Date.now();
    res.json = function (data: object) {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(data));
        console.info(moment().format("YYYY-MM-DD hh:mm:ss"), req.method, req.url, process.title, (Date.now() - req.enterTime) / 1000, "s");
        res.end();
    }

    next();
}