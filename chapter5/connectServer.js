var connect = require('connect');

function logger(req, res, next) {
    console.log('%s  %s', req.method, req.url);
    next();
}

function hello(req, res) {
    res.setHeader('Contene-type', 'text/plain');
    res.end('hello world');
}

connect().use('/', logger).use('/', hello).listen(3000);