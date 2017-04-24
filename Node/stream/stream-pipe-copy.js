"use strict";
const fs = require("fs");

const readStream = fs.createReadStream("WebStorm.rar");
const writeStream =fs.createWriteStream("WebStorm-pipe.rar");

readStream.pipe(writeStream);
