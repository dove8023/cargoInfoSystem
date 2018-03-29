/*
 * @Author: Mr.He 
 * @Date: 2018-03-21 16:46:54 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-28 11:02:53
 * @content what is the content of this file. */

import path = require("path");
import fs = require("fs");

export function loadTest(dir: string): void {
    let files = fs.readdirSync(dir);
    for (let f of files) {
        let fullPath = path.join(dir, f);
        let stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            loadTest(fullPath);
        } else {
            let p = fullPath.replace(/\.(ts|js)$/, "");
            require(p);
        }
    }
}