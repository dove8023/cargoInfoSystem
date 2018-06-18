/*
 * @Author: Mr.He 
 * @Date: 2018-06-18 09:44:44 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-06-18 10:10:22
 * @content what is the content of this file. */



let errorCode: { [index: string]: any } = {
    //1** token 相关
    "100": "token 不存在",
    "101": "token 过期",

    //11* 登陆注册相关
    "112": "用户不存在",
    "113": "密码不正确",
    "114": "mobile is already have",

    //2** 与资源权限有关
    "201": "没有权限访问",
    "202": "资源不存在",

    //3** 参数相关
    "301": "参数不对"
}

export default errorCode;