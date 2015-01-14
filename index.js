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

    this.year     = options.year     || now.getUTCFullYear();
    this.month    = options.month    || now.getUTCMonth();
    this.date     = options.date     || now.getUTCDate();
    this.hour     = options.hour     || now.getUTCHours();
    this.minute   = options.minute   || now.getMinutes();
    this.second   = options.second   || now.getUTCSeconds();
    this.interval = options.interval || 500;

    this.deadline = new Date(Date.UTC(this.year, this.month, this.date, this.hour, this.minute, this.second, 0));

    debug('deadline', this.deadline);

    this.done = false;

    //past time -> call callback immediately
    if(this._isPast()) {
        debug('on time');
        this.done = true;
        return callback();
    }

    var self = this;

    var interval = setInterval(function() {
        //on time
        if(self._isPast()) {
            debug('on time');
            self.done = true;
            callback();
            return clearInterval(interval);
        }

        debug('timer checking every %s ms...', self.interval);

        //ontime
    }, self.interval);
}

/**
 * did it trigger ?
 * @return {Boolean}
 */
timer.prototype.isDone = function() {
    return this.done;
};

/**
 * isPast
 * @return {Boolean}
 *
 * api private
 */
timer.prototype._isPast = function() {
    return (new Date()) - this.deadline >= 0;//now - deadline
};