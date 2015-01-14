var debug = require('debug')('timer');

module.exports = timer;

/**
 * set a callback run on a specific time in the future
 * @param {Object}   options  date, interval...
 * @param {Function} callback function run on time
 */
function timer(options, callback) {
    if(!(this instanceof timer)) {
        return new timer(options, callback);
    }

    if(arguments.length === 1 || !callback) {
        callback = options;
        options = {};
    }

    var now = new Date();

    if(options.year === 0) {
        options.year = 1970;
    }

    if(options.month === 0) {
        options.month = 1;
    }

    if(options.date === 0) {
        options.date = 1;
    }

    if(options.hour === 0) {
        options.hour = '0';
    }

    if(options.minute === 0) {
        options.minute = '0';
    }

    if(options.second === 0) {
        options.second = '0';
    }

    if(options.ms === 0) {
        options.ms = '0';
    }

    this.year   = options.year      || now.getUTCFullYear();
    this.month  = options.month     || now.getUTCMonth();
    this.date   = options.date      || now.getUTCDate();
    this.hour   = options.hour      || now.getUTCHours();
    this.minute = options.minute    || now.getMinutes();
    this.second = options.second    || now.getUTCSeconds();
    this.ms     = options.ms        || now.getUTCMilliseconds();

    this.done = false;

    this.deadline = new Date(Date.UTC(this.year, this.month, this.date, this.hour, this.minute, this.second, this.ms));

    debug('deadline', this.deadline.toISOString());

    this._tick(callback);
}

/**
 * tick
 * @param  {Function} callback
 */
timer.prototype._tick = function(callback) {
    var self = this;

    var now = (new Date()).getTime();
    var diff = self.deadline - now;

    if(diff <= 0) {
        debug('on time', (new Date()).toISOString());
        self.done = true;
        return callback();
    }

    var next_tick = diff / 2;

    debug('next tick', next_tick, new Date(now + next_tick).toISOString());

    setTimeout(function() {
        self._tick(callback);
    }, next_tick);
};

/**
 * did it trigger ?
 * @return {Boolean}
 */
timer.prototype.isDone = function() {
    return this.done;
};