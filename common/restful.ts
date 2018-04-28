/*
 * @Author: Mr.He 
 * @Date: 2018-04-10 17:24:21 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-12 07:46:43
 * @content what is the content of this file. */


import * as koaRouter from 'koa-router';
import * as path from "path";


let allControlls: { [index: string]: any; } = {};

export function Restful(modelUrl?: string) {
    return function (target: any) {
        // console.log(11111, target.name);
        // console.log(111110000, Object.getOwnPropertyNames(target.prototype));

        // for (let key in target.prototype) {
        //     console.log(89, key);
        // }

        // if (typeof target.prototype.test == 'function') {
        //     console.log("test is function.");
        // }

        // target.prototype.test();
        // for (let item in target) {
        //     console.log(item);
        // }



        modelUrl = modelUrl || "/" + target.name.replace(/Controller/, '');
        allControlls[modelUrl] = target;
    }
}


export function Router(url: string, method: string = 'get') {
    return function (target: any, propertyKey: any, desc: any) {
        let fn = desc.value;
        fn.$url = url;
        fn.$method = method;
    }
}

export function RegisterRouter(router: koaRouter) {
    for (let url in allControlls) {
        let controlle = allControlls[url];
        loadRouter(url, controlle, router);
    }
}

let defaultMethod = ['get', 'find', 'post', 'put', 'delete'];
function loadRouter(modelUrl: string, target: any, router: any) {
    let methods = Object.getOwnPropertyNames(target.prototype);
    for (let item of defaultMethod) {
        if (methods.indexOf(item) < 0) {
            methods.push(item);
        }
    }
    methods.forEach((method: string) => {
        if (method == 'constructor') {
            return;
        }

        let fn = target.prototype[method];
        if (typeof fn != 'function') {
            return;
        }

        if (defaultMethod.indexOf(method) < 0 && !fn.$url) {
            return;
        }


        let url, httpMethod;
        switch (method) {
            case 'get':
                url = path.join(modelUrl, "/id");
                httpMethod = 'get';
                break;
            case 'find':
                url = modelUrl;
                httpMethod = 'get';
                break;
            case 'post':
                url = modelUrl;
                httpMethod = 'post';
                break;
            case 'put':
                url = path.join(modelUrl, "/id");
                httpMethod = 'put';
                break;
            case 'delete':
                url = path.join(modelUrl, "/id");
                httpMethod = 'delete';
                break;
            default:
                if (fn.$url && fn.$method) {
                    url = path.join(modelUrl, fn.$url);
                    httpMethod = fn.$method;
                }
        }

        if (url && httpMethod) {
            console.log("add router : ", httpMethod, url);
            router[httpMethod](url, fn);
        }
    });
}


// function Restful(mountUrl) {
//     return function (target) {
//         target.prototype.$isValidId = target.prototype.$isValidId || function (id) {
//             return /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(id.toString());
//         };
//         if (!mountUrl) {
//             mountUrl = '/' + target.name.replace(/Controller/, '');
//         }
//         controllers[mountUrl] = target;
//     };
// }