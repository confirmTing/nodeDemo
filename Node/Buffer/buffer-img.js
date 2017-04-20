"use strict";

const fs = require("fs");
fs.readFile('./head.jpg',function (err,buffer) {
    if(err){
        console.log(err)
        return
    }
    console.log(Buffer.isBuffer(buffer))
    var base64Img = buffer.toString("base64");
    console.log(base64Img);
    var decodedImg = new Buffer(base64Img,"base64");
    console.log(Buffer.compare(buffer, decodedImg));

    var html = '<!DOCTYPE html>\
        <html lang="en">\
        <head>\
        <meta charset="UTF-8">\
        <title>Title</title>\
        </head>\
        <body>\
        <img src="data:image/jpg;base64,'+ base64Img +'">\
        </body>\
        </html>';

    fs.writeFile('test.html',html,function (err) {
        if(err) console.log(err);
    })

    fs.writeFile('head-base64.jpg', decodedImg, function (err) {
        if(err) console.log(err);
    })
})