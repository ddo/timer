var t = timer({
    hour: 11,
    minute: 45,
    second: 45
}, function(){
    console.log(new Date());
    console.log(t.isDone());
});

console.log(t.isDone());