/**
 * set a callback run on a specific time in the future
 * @param {Object}   options  date, interval...
 * @param {Function} callback function run on time
 */
function Timer(options, callback) {
    if(!(this instanceof Timer)) {
        return new Timer(options, callback);
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

    if(!this.validate()) {
        throw new Error('You can not timmer in the past ! Weird...');
    }

    var self = this;

    var interval = setInterval(function() {
        console.log('Timer checking every %s second...', Math.floor(self.interval / 1000));

        var now = new Date();

        console.log(now);

        var current_date   = now.getUTCDate();
        var current_month  = now.getUTCMonth();
        var current_year   = now.getUTCFullYear();
        var current_hour   = now.getUTCHours();
        var current_minute = now.getUTCMinutes();
        var current_second = now.getUTCSeconds();

        //on time
        if(current_date === self.date && current_month === self.month && current_year === self.year && current_hour === self.hour && current_minute === self.minute && current_second > self.second) {
            
            console.log('On Time !!!');

            this.done = true;

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
Timer.prototype.isDone = function() {
    return this.done;
};

/**
 * validate options
 * @return {Boolean}
 */
Timer.prototype.validate = function() {
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