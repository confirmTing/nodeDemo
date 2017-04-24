"use strict";
const stream = require("stream");
const Readable = stream.Readable;
const Writable = stream.Writable;

let readStream = new Readable();
let writeStream= new Writable();

readStream.push("I ");
readStream.push("Love ");
readStream.push("You!");
readStream.push(null);

writeStream._write = function (chunk, encode, cb) {
    console.log(chunk.toString());
    cb();
}

readStream.pipe(writeStream);
