var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function (id, client) {
    this.clients[id] = client;
    this.subscriptions[id] = function (senderId, message) {
        if (id != senderId) {
            this.clients[id].write(message);
        }
    }
    this.on('broadcast', this.subscriptions[id]);
});

channel.on('leave', function (id) {
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, id + " has left the chat.\n");
});

channel.on('shutdown', function () {
    channel.emit('broadcast', '', "Chat has shut down.\n");
    channel.removeAllListeners('broadcast');
});

var tempBody = {};

var server = net.createServer(function (client) {
    var id = client.remoteAddress + ':' + client.remotePort;
    console.log('客户端已连接:' + id);
    client.write('hello\r\n');
    channel.emit('join', id, client);
    client.setEncoding('UTF-8');
    tempBody[id] = '';
    client.on('data', function (data) {
        data = data.toString();
        tempBody[id] = tempBody[id] + data;
        if (data.indexOf('\r\n') >= 0) {
            if (tempBody[id] == "shutdown\r\n") {
                channel.emit('shutdown');
            }
            channel.emit('broadcast', id, tempBody[id]);
            tempBody[id] = '';
        }
    });
    client.on('end', function () {
        channel.emit('leave', id);
    });
});
server.on('error', function (err) {
    throw err;
});
server.listen(3200, function () {
    console.log('服务器已启动');
});