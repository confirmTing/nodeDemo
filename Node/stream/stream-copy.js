"use strict";

const fs = require("fs");

const readStream = fs.createReadStream("WebStorm.rar");
const writeStream = fs.createWriteStream("WebStorm-copy.rar");
// 用pipe 方法则不用自己控制了
readStream.on("data", chunk => {
    if(writeStream.write(chunk) === false){
        console.log("读取的太快了，休息一会吧");
        readStream.pause();
    }
}).on("end", () => {
    console.log("读你妹呀，文件拷贝结束了~");
    writeStream.end();
})

writeStream.on("drain",() =>{
    console.log("数据都被我写完了，快点去读呀！")
    readStream.resume();
})