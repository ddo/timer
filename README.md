timer
=====

simple timer in javascript

## Caution

``timer`` uses UTC time

## Usage

```js
Timer(options, callback);
```

## Example

*set timer today at* ``11:10:45``

```js
Timer({
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
var timer = Timer({
    hour: 11,
    minute: 10,
    second: 45
}, function(){
    console.log(new Date());
    console.log(timer.isDone());
});

console.log(timer.isDone());
```