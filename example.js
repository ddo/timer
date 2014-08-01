var timer = require('./');

var t = timer({
    hour: 19,
    minute: 22,
    second: 11
}, function(){
    var now = new Date();
    console.log(now);
    // console.log(t.isDone());
});

// console.log(t.isDone());