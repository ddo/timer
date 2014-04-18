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

    this.date     = options.date     || now.getUTCDate();
    this.month    = options.month    || now.getUTCMonth();
    this.year     = options.year     || now.getUTCFullYear();
    this.hour     = options.hour     || now.getUTCHours();
    this.minute   = options.minute   || now.getMinutes();
    this.second   = options.second   || now.getUTCSeconds();
    this.interval = options.interval || 5000;

    this.done = false;

    //past time -> call callback immediately
    if(!this.isPast()) {
        this.done = true;
        return callback();
    }

    var self = this;

    var interval = setInterval(function() {
        console.log('timer checking every %s second...', Math.floor(self.interval / 1000));

        //on time
        if(!self.isPast()) {
            console.log('On Time !!!');
            self.done = true;
            callback();
            return clearInterval(interval);
        }

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
 * isPast options
 * @return {Boolean}
 */
timer.prototype.isPast = function() {
    var now = new Date();

    var current_date   = now.getUTCDate();
    var current_month  = now.getUTCMonth();
    var current_year   = now.getUTCFullYear();
    var current_hour   = now.getUTCHours();
    var current_minute = now.getUTCMinutes();
    var current_second = now.getUTCSeconds();

    //year expired
    if(current_year > this.year) {
        return false;
    }

    //month expired
    if(current_month > this.month && current_year === this.year) {
        return false;
    }

    //date expired
    if(current_date > this.date && current_year === this.year && current_month === this.month) {
        return false;
    }

    //hour expired
    if(current_hour > this.hour && current_year === this.year && current_month === this.month && current_date === this.date) {
        return false;
    }

    //min expired
    if(current_minute > this.minute && current_year === this.year && current_month === this.month && current_date === this.date && current_hour === this.hour) {
        return false;
    }

    //second expired
    if(current_second > this.second && current_year === this.year && current_month === this.month && current_date === this.date && current_hour === this.hour && current_minute === this.minute) {
        return false;
    }

    return true;
};