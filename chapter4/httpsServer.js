var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./key-cert.pem')
};

https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end('hello world \r\n');
}).listen(3000,function () {
    console.log('https server is ready')
});