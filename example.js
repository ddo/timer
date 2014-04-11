var timer = Timer({
    hour: 11,
    minute: 45,
    second: 45
}, function(){
    console.log(new Date());
    console.log(timer.isDone());
});

console.log(timer.isDone());