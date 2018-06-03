/*
 * @Author: Mr.He 
 * @Date: 2018-01-22 17:40:12 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-03-21 16:48:57
 * @content what is the content of this file. */

import * as path from "path";
import { loadTest } from "common/utils";

let Models: { [index: string]: any } = {};


loadTest(path.join(__dirname, "./"), (model: any) => {
    console.log(model, model.name);
    if (model.default && model.default.name) {
        Models[model.default.name] = model.default;
    }

});

export default Models;