var timer = require('./');

var t = timer({
    hour:   17,
    minute: 59,
    second: 59,
    ms:     500
}, function(){
    console.log('done');
    // console.log(t.isDone());
});

// console.log(t.isDone());