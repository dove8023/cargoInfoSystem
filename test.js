let request = require("request-promise");

let success = 0, fail = 0, lost = 0;

async function sendMail(i) {

    let options = {
        uri: 'http://172.20.132.41:3000/v1/email',
        // uri: 'http://localhost:3000/v1/email',
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: {
            email: "hexisen@tik.com",
            title: "TEST",
            appId: "1101",
            content: "SSSFFFFFFFFFF"
        },
        json: true
    };

    try {
        let result = await request(options);
        if (result.code == 0) {
            success++;
        } else {
            fail++;
        }

        console.log(i, result)
    } catch (e) {
        console.log(e);
        lost++;
    }

}


for (let i = 0; i < 4400; i++) {
    sendMail(i);
}

setTimeout(() => {
    console.log("success : ", success, " fail : ", fail, " lost: ", lost)
}, 20000);