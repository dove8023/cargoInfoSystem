/*
 * @Author: he@whaleblue.design 
 * @Date: 2018-08-09 22:24:15 
 * @Last Modified by: Mr.He
 * @Last Modified time: 2018-08-13 10:50:39
 * @content what is the content of this file. */


const nodemailer = require('nodemailer')

let mailConfig = {
    host: 'smtp.exmail.qq.com',
    secureConnection: true,
    use_authentication: true,
    port: 465,
    auth: {
        // user: 'vivianmaple',
        // pass: 'Tik123456'

        // user: 'service@goodsinfo.cn',
        // pass: 'Tap4fun99'

        // user: 'tik@zuimd.com',
        // pass: 'wang.chao.507'

        user: 'service@tik-support.com',
        pass: 'Tap4fun99123'
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
            from: "service@tik.com <service@tik-support.com>",
            to: 'hexisen@tik.com',
            subject: '欢迎登陆 ',
            html: '<p>您好</p>',
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