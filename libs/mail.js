/*
 * @Author: he@whaleblue.design 
 * @Date: 2018-08-09 22:24:15 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-08-30 15:08:46
 * @content what is the content of this file. */


const nodemailer = require('nodemailer')
const moment = require('moment')

let mailConfig = {
    // host: 'smtp.exmail.qq.com',
    // host: 'smtp.mxhichina.com',
    host: 'smtpdm.aliyun.com',
    secureConnection: true,
    use_authentication: true,
    port: 465,
    auth: {
        // user: 'vivianmaple',
        // pass: 'Tik123456'

        // aliyun

        user: 'service@mail.tik.com',
        pass: 'HeXisen0987'

        // user: 'tik@zuimd.com',
        // pass: 'wang.chao.507'

        // qq email
        // user: 'service@tik-support.com',
        // pass: 'Tap4fun99123'
    }
}

const transporter = nodemailer.createTransport(mailConfig)




const sendMail = () => {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            // from: 'service@tik.com',
            // from: 'test@goodsinfo.cn',
            // from: 'tik@goodsinfo.cn',
            // from: `<foo@example.com>`,
            // from: "service@tik.com <service@tik-support.com>",

            from: "service@tik.com <service@mail.tik.com>",
            to: ['hexisen@tik.com', 'hexisen1991@gmail.com', '616082046@qq.com', 'hexisen8023@sina.com', 'newname1991@163.com'],
            subject: '欢迎登陆 ',
            html: '<p>您好Good ' + moment().format('YYYY-MM-DD HH:mm:ss') + '</p>',
        }, function (err, _) {
            if (err) {
                console.log('1111Error: ' + err)
                resolve(false)
            }
            else {
                console.log("ok")
                resolve(true)
            }
        })
    })
}

sendMail();