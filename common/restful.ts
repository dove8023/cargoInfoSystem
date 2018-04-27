/*
 * @Author: Mr.He 
 * @Date: 2018-04-10 17:24:21 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-04-12 07:46:43
 * @content what is the content of this file. */


export function Restful() {
    return function (target: any) {
        console.log(11111, target);
        target.prototype.test();
        for (let item in target) {
            console.log(item);
        }
    }
}


export function Router(one: string, two: string) {
    return function (target: any, propertyKey: any, desc: any) {
        console.log(22222, target);
        console.log(33333, propertyKey);
        console.log(44444, desc);
    }
}

export function RegisterRouter() {

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