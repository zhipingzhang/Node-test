function A() {
    var count = 0;
    function B() {
        count++;
        console.log(count);
    }
    return B;
}

var C = A();
C();// 1
C();// 2
C();// 3
var D = A();
D();
D();
D();