/**
 ERRORS
 Manages application errors.
 */
"use strict";

/**
 * Manages application errors.
 *
 * @class
 * @private
 */
function __CORE_Error() {
    /* eslint no-use-before-define:"off" */

    // noinspection JSUnusedLocalSymbols
    /**
     * Object pointer
     * @type {__CORE_Error}
     * @private
     */
    let self = this;

    /**
     * Throws an error notification.
     *
     * @param {object} $error_message - Error message
     */
    this.errorMessage = function ($error_message) {

        NotificationJS.error($error_message.msg);
        if (cfg_verbose) {
            /* eslint no-console:"off" */
            console.error('Error: {0}'.format($error_message));
        }

    };

    /**
     * Throw an exception.
     *
     * @param {string} $class - Calling class
     * @param {string|null} $method - Method of call
     * @param {string} $message - Message of error
     * @throws Error
     */
    this.throwException = function ($class, $method, $message) {

        let $msg; // Assembled message
        if (notNullUndf($method) && $method !== '') {
            $msg = '{0}::{1}::{2} {3}'.format('mlstruct', $class, $method, $message);
        } else {
            $msg = '{0}::{1} {2}'.format('mlstruct', $class, $message);
        }
        throw $msg;

    };

}

/**
 * Admin application errors
 * @type {__CORE_Error}
 * @const
 */
const app_error = new __CORE_Error();