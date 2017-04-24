var fs = require("fs");

var source = fs.readFileSync("./avatar.jpg");

fs.writeFileSync("head.jpg",source);