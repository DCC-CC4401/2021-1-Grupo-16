/**
 CONSOLE
 Console manager.
 */
"use strict";

/**
 * Application console.
 *
 * @class
 * @private
 */
function __CORE_Console() {
    /* eslint no-console:"off" */

    /**
     * Object pointer
     * @type {__CORE_Console}
     * @private
     */
    let self = this;

    /**
     * Stores total messages before wipe
     * @type {int}
     * @private
     */
    this._console_messages = 0;

    /**
     * Total console messages
     * @type {int}
     * @private
     */
    this._total_console_messages = 0;

    /**
     * Format string
     * @type {string}
     * @private
     */
    this._msg_date_format = cfg_date_format_public_d + ' ' + cfg_date_format_public_h;

    /**
     * Apply format message.
     *
     * @param {string} $msg - Message
     * @private
     */
    this._format = function ($msg) {

        if (isNullUndf($msg)) return '';
        $msg = $msg.replace(/&lt;/g, '<');
        $msg = $msg.replace(/&gt;/g, '>');
        $msg = $msg.replace(/&nbsp;/g, ' ');
        $msg = $msg.replace(/&quot;/g, '"');
        $msg = $msg.replace(/&apos;/g, "'");
        return $msg;

    };

    /**
     * Check console reset.
     *
     * @private
     */
    this._resetMessages = function () {

        self._console_messages += 1;
        self._total_console_messages += 1;
        if (self._console_messages > cfg_total_console_messages_until_wipe) {
            console.clear();
            app_about.aboutInfo();
            self._console_messages = 0;
        }

    };

    /**
     * Information message.
     *
     * @param {string} $msg - Message
     */
    this.info = function ($msg) {

        if (!cfg_verbose) return;
        $msg = self._format($msg.toString());
        self._resetMessages();
        if (show_console_total_messages) {
            console.log('[{2}@{0}] {1}'.format(Date.dateFormat(new Date(), self._msg_date_format), $msg, self._total_console_messages));
        } else {
            console.log('[{0}] {1}'.format(Date.dateFormat(new Date(), self._msg_date_format), $msg));
        }

    };

    /**
     * Log object in the console.
     *
     * @param {Object} $obj
     */
    this.object = function ($obj) {

        if (!cfg_verbose) return;
        self._resetMessages();
        console.log($obj);

    };

    /**
     * Trace message.
     *
     * @param {string} $msg - Message
     */
    this.trace = function ($msg) {

        if (!cfg_verbose) return;
        $msg = self._format($msg);
        self._resetMessages();
        if (show_console_total_messages) {
            console.trace('[{2}@{0}] {1}'.format(Date.dateFormat(new Date(), self._msg_date_format), $msg, self._total_console_messages));
        } else {
            console.trace('[{0}] {1}'.format(Date.dateFormat(new Date(), self._msg_date_format), $msg));
        }

    };

    /**
     * Writes an error message.
     *
     * @param {string} $msg - Message
     * @param {boolean=} $w - Writes header
     * @param {boolean=} $force - Force message
     */
    this.error = function ($msg, $w, $force) {

        if (!(cfg_verbose || $force)) return;
        $msg = self._format($msg);
        let $m;
        if ($w) {
            $m = 'Error';
        } else {
            $m = '';
        }
        self._resetMessages();
        if (show_console_total_messages) {
            console.error('[{3}@{0}] {2}{1}'.format(Date.dateFormat(new Date(), self._msg_date_format), $msg, $m, self._total_console_messages));
        } else {
            console.error('[{0}] {2}{1}'.format(Date.dateFormat(new Date(), self._msg_date_format), $msg, $m));
        }

    };

    /**
     * Writes an error on console.
     *
     * @param {Error} $exceptionmsg - Exception message
     * @param {boolean=} $w - Writes header
     */
    this.exception = function ($exceptionmsg, $w) {

        if (!cfg_verbose) return;
        let $m;
        if ($w) {
            $m = 'Exception';
        } else {
            $m = '';
        }
        self._total_console_messages -= 1; // Exception is not treated as message
        self._console_messages -= 1;
        self._resetMessages();
        if (isString($exceptionmsg)) {
            console.error('{1}{0}'.format($exceptionmsg, $m));
        } else {
            console.error('{2}{0} {1}'.format($exceptionmsg.message, $exceptionmsg.stack, $m));
        }

    };

    /**
     * Writes a generic warning message.
     *
     * @param {string} $msg - Message
     * @param {boolean=} $w - Writes header
     */
    this.warn = function ($msg, $w) {

        if (!cfg_verbose) return;
        $msg = self._format($msg);
        let $m;
        if ($w) {
            $m = 'Error';
        } else {
            $m = '';
        }
        self._resetMessages();
        if (show_console_total_messages) {
            console.warn('[{3}@{0}] {2}{1}'.format(Date.dateFormat(new Date(), self._msg_date_format), $msg, $m, self._total_console_messages));
        } else {
            console.warn('[{0}] {2}{1}'.format(Date.dateFormat(new Date(), self._msg_date_format), $msg, $m));
        }

    };

    /**
     * Warn to console from a core library.
     *
     * @param {string} $classname - Calling class
     * @param {string|null} $method - Method of call
     * @param {string=} $message - Message of error
     */
    this.coreWarn = function ($classname, $method, $message) {

        if (!cfg_verbose) return;
        if ($method[0] === '_') $method = '@' + $method.substring(1, $method.length);
        let $msg; // Assembled message
        if (notNullUndf($message) && $message !== '') {
            if (notNullUndf($method) && $method !== '') {
                $msg = '{0}::{1}::{2} {3}'.format('mlstruct', $classname, $method, $message);
            } else {
                $msg = '{0}::{1} {2}'.format('mlstruct', $classname, $message);
            }
        } else {
            if (notNullUndf($method) && $method !== '') {
                $msg = '{0}::{1}::{2}'.format('mlstruct', $classname, $method);
            } else {
                $msg = '{0}::{1}'.format('mlstruct', $classname);
            }
        }
        self.warn($msg, false);

    };

    /**
     * Error to console from a core library.
     *
     * @param {string} $classname - Calling class
     * @param {string|null} $method - Method of call
     * @param {string=} $message - Message of error
     */
    this.coreError = function ($classname, $method, $message) {

        if (!cfg_verbose) return;
        if ($method[0] === '_') $method = '@' + $method.substring(1, $method.length);
        let $msg; // Assembled message
        if (notNullUndf($message) && $message !== '') {
            if (notNullUndf($method) && $method !== '') {
                $msg = '{0}::{1}::{2} {3}'.format('mlstruct', $classname, $method, $message);
            } else {
                $msg = '{0}::{1} {2}'.format('mlstruct', $classname, $message);
            }
        } else {
            if (notNullUndf($method) && $method !== '') {
                $msg = '{0}::{1}::{2}'.format('mlstruct', $classname, $method);
            } else {
                $msg = '{0}::{1}'.format('mlstruct', $classname);
            }
        }
        self.error($msg, false);

    };

    /**
     * Information to console from a core library.
     *
     * @param {string} $class - Calling class
     * @param {string|null} $method - Method of call
     * @param {string=} $message - Message of error
     */
    this.coreInfo = function ($class, $method, $message) {

        if (!cfg_verbose) return;
        if ($method[0] === '_') $method = '@' + $method.substring(1, $method.length);
        let $msg; // Assembled message
        if (notNullUndf($message) && $message !== '') {
            if (notNullUndf($method) && $method !== '') {
                $msg = '{0}::{1}::{2} {3}'.format('mlstruct', $class, $method, $message);
            } else {
                $msg = '{0}::{1} {2}'.format('mlstruct', $class, $message);
            }
        } else {
            if (notNullUndf($method) && $method !== '') {
                $msg = '{0}::{1}::{2}'.format('mlstruct', $class, $method);
            } else {
                $msg = '{0}::{1}'.format('mlstruct', $class);
            }
        }
        self.info($msg);

    };

}

/**
 * Stores console object
 * @type {__CORE_Console}
 * @const
 */
const app_console = new __CORE_Console();