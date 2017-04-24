"use strict";

const fs = require("fs");

let readStream = fs.createReadStream("WebStorm.rar");
let n = 0;
readStream.on("data", (chunk) => {
    n++;
    console.log("data emits");
    console.log(Buffer.isBuffer(chunk));
    readStream.pause();
    console.log("data pause");
    setTimeout(() => {
        readStream.resume();
        console.log("data pause end");
    },10)
    // console.log(chunk.toString("utf8"));
}).on("readable", () => {
    console.log("readable");
}).on("end", () => {
    console.log("end",n);
}).on("close", () => {
    console.log("file colsed");
}).on("error", (e) => {
    console.log("file error:" + e.message);
})
