"use strict";

const http = require("http");
const fs = require("fs");

http.createServer((req,res) => {
    let readStream = fs.createReadStream("head.jpg");
    readStream.pipe(res);
}).listen(8090);