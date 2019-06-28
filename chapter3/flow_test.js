var flow = require('nimble');

flow.series([
    function (callback) {
        setTimeout(function () {
            console.log('I execute first.');
            // 第一个参数是err
            callback(null, 'xxx');
        }, 1000);
    },
    function (callback) {
        setTimeout(function () {
            console.log('I execute next.');
            callback();
        }, 500);
    },
    function (callback) {
        setTimeout(function () {
            console.log('I execute last.');
            callback();
        }, 100);
    }
], function (err, result) {
    if (err) {
        console.error(err)
    } else {
        console.log(result);
        console.log('all task is finish');
    }
});