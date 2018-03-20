/*
 * @Author: Mr.He 
 * @Date: 2018-03-02 10:04:30 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-02 10:31:07
 * @content what is the content of this file. */

let express = require("express");
let conn_timeout = require("connect-timeout");
let bodyParser = require("body-parser");
let moment = require("moment");
let heapdump = require("heapdump");

declare let gc: Function;

let app = express();
app.use(conn_timeout("6s"));
app.use(bodyParser.json({ limit: '8mb' }));
app.use(bodyParser.urlencoded({ limit: '8mb', extended: true }));


let Result: any[] = [];
let os = require("os");
function createBufffer() {
    for (let i = 0; i < 10000; i++) {
        let buf = new Buffer(100);
        Result.push(buf);
    }
}

app.use(usingTime);
app.get("/test", (req: any, res: any, next: Function) => {
    createBufffer();

    gc();
    heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');
    res.send(`test is ok. ${JSON.stringify(process.memoryUsage())} + \n os.totalmem : ${os.totalmem()};  os.freemem() : ${os.freemem()}`);
});

app.get("/ok", (req: any, res: any, next: Function) => {

    res.send("just is ok.");
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

export default app;