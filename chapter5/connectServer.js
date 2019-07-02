var connect = require('connect');

function logger(req, res, next) {
    console.log('%s  %s', req.method, req.url);
    next();
}

function hello(req, res) {
    res.setHeader('Contene-type', 'text/plain');
    res.end('hello world');
}

connect().use('/', logger).use(setup(':method :url')).use('/', hello).listen(3000);


function setup(format) {
    var regexp = /:(\w+)/g;

    return function logger(req, res, next) {
        var str = format.replace(regexp, function (match, property) {
            return req[property];
        });
        console.log(str);
        next();
    }
}