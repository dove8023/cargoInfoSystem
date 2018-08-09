/*
 * @Author: he@whaleblue.design 
 * @Date: 2018-08-09 22:24:15 
 * @Last Modified by: he@whaleblue.design
 * @Last Modified time: 2018-08-09 23:12:53
 * @content what is the content of this file. */


const nodemailer = require('nodemailer')

let mailConfig = {
    // host: 'mx.hox.com',
    // host: 'smtp.qq.com',
    // service: 'qq',
    // host: 'smtp.exmail.qq.com',
    host: 'smtp.mxhichina.com',
    secureConnection: false,
    use_authentication: false,
    port: 465,
    auth: {
        // user: 'vivianmaple',
        // pass: 'Tik123456'

        user: 'test@goodsinfo.cn',
        pass: 'Hexisen123'

        // user: 'tik@zuimd.com',
        // pass: 'wang.chao.507'
    }
}

const transporter = nodemailer.createTransport(mailConfig)




const sendMail = () => {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            // from: 'service@tik.com',
            from: 'test@goodsinfo.cn',
            // from: 'tik@goodsinfo.cn',
            // from: `<foo@example.com>`,
            // from: "tik@goodsinfo.cn",
            to: 'hexisen1991@gmail.com',
            subject: 'subject',
            html: 'hello html 22222',
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