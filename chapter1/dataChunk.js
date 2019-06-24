'use strict';

var fs = require('fs');
fs.readFile('../resources/demo2.txt', function (err, data) {
    console.log(data.toLocaleString());
})

var stream = fs.createReadStream('../resources/demo2.txt');
stream.on('data', function (chunk) {
    console.log(chunk);
})
stream.on('end', function () {
    console.log('end');
})