/**
 LOGIC
 Logic operators.
 */
"use strict";

/**
 * Returns true if object is neither null or undefined.
 *
 * @param {object} $obj - Object
 * @returns {boolean}
 */
function notNullUndf($obj) {

    return $obj !== null && $obj !== undefined;

}

/**
 * Returns true if object is null or undefined.
 *
 * @param {object} $obj - Object
 * @returns {boolean}
 */
function isNullUndf($obj) {

    return $obj === null || $obj === undefined;

}

/**
 * Returns true if the object is a string.
 *
 * @param {object} $string - Object
 * @returns {boolean}
 */
function isString($string) {

    return typeof $string === 'string' || $string instanceof String;

}

// noinspection JSUnusedGlobalSymbols
/**
 * Returns true if the object is a boolean.
 *
 * @param bool
 * @returns {boolean}
 */
function isBoolean(bool) {

    return typeof bool === 'boolean' ||
        (
            typeof bool === 'object' &&
            bool !== null &&
            typeof bool.valueOf() === 'boolean'
        );

}