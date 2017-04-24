"use strict";
const stream = require("stream");

class ReadStream extends stream.Readable{
    constructor(){
        super();
    }
    _read(){
        this.push("I ");
        this.push("Love ");
        this.push("You!\n");
        this.push(null);
    }
}

class WriteStream extends stream.Writable{
    constructor(){
        super();
        // this._cached = Buffer.from("");
    }

    _write(chunk, encode, cb){
        console.log(chunk.toString());
        cb();
    }
}

class TransformStream extends stream.Transform{
    constructor(){
        super();
    }

    _transform(chunk, encode, cb){
        this.push(chunk);
        cb();
    }

    _flush(cb){
        this.push("I Love You To!");
        cb();
    }
}

let readStream = new ReadStream();
let writeStream = new WriteStream();
let transformStream = new TransformStream();

readStream.pipe(transformStream).pipe(writeStream);