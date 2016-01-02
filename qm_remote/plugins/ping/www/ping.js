var exec = require('cordova/exec');

module.exports = {

    /**
     * Vibrates the device for a given amount of time or for a given pattern or immediately cancels any ongoing vibrations (depending on the parameter).
     *
     * @param {Integer} param       The number of milliseconds to vibrate (if 0, cancels vibration)
     *
     */
    ping: function(url, timeout, success, error) {

        /* Aligning with w3c spec */

		exec(success, error, "Ping", "ping", [url, timeout]);
    }
};
