timer
=====

simple timer in javascript

## Caution

* ``timer`` uses UTC time
* If you set the timer in the past, then callback function will be called immediately

## Usage

```js
timer(options, callback);
```

## Example

*set timer today at* ``11:10:45``

```js
timer({
    hour: 11,
    minute: 10,
    second: 45
}, function(){
    console.log(new Date());
});
```

## Options

**Default options is current time.**

``timer`` uses UTC time

* ``date``      :   1 - 31.
* ``month``     :   1 - 12.
* ``year``      :   full year (2014, 2020, ...).
* ``hour``      :   0 - 23.
* ``minute``    :   0 - 59.
* ``second``    :   0 - 59.
* ``interval``  :   interval time in milisecond (Default: 5000).

## API

### .isDone()

```js
var timer = timer({
    hour: 11,
    minute: 10,
    second: 45
}, function(){
    console.log(new Date());
    console.log(timer.isDone());
});

console.log(timer.isDone());
```