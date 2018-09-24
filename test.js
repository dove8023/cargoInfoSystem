const http = require("http");


http.createServer((req, res) => {
    console.log("yes");
    res.end("ok");
}).listen(3000, () => {
    console.log("http running");
})