/**
 URL
 Auxiliary URL functions.
 */
"use strict";

/**
 * Class that lets change the url of the application.
 *
 * @class
 * @private
 */
function __CORE_UrlModifier() {

    /**
     * Object pointer
     * @type {__CORE_UrlModifier}
     * @private
     */
    let self = this;

    /**
     * Deletes all URL params.
     */
    this.deleteParams = function () {

        window.history.replaceState(null, null, window.location.pathname);

    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * Remove a certain URL parameter.
     *
     * @param {string[]|string} $key - Parameter name
     */
    this.removeParam = function ($key) {

        if (!Array.isArray($key)) $key = [$key];
        for (let $i = 0; $i < $key.length; $i += 1) {
            self.setParam($key[$i], '');
        }

    };

    /**
     * Get a parameter from the URL.
     *
     * @param {string} $name - Parameter name
     * @returns {string} - Value
     */
    this.getParam = function ($name) {

        // noinspection JSConsecutiveCommasInArrayLiteral
        return encodeURIComponent((new RegExp('[?|&]' + $name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ''])[1].replace(/\+/g, '%20')) || null;

    };

    /**
     * Change an URL parameter.
     *
     * @param {string} $key - Parameter name
     * @param {string|boolean|number} $value - Parameter value
     */
    this.setParam = function ($key, $value) {

        /**
         * Get url
         */
        let $baseUrl = [
            location.protocol,
            '//',
            location.host,
            location.pathname,
        ].join('');
        let $urlQueryString = document.location.search;
        let $params = '';
        $value = encodeURIComponent($value.toString());
        if ($urlQueryString === '') {
            if ($value === '' || isNullUndf($value)) {
                window.history.replaceState({}, '', $baseUrl);
            } else {
                $params = '?' + $key + '=' + $value;
                window.history.replaceState({}, '', $baseUrl + $params);
            }
            return;
        }

        /**
         * Separate keys
         */
        if ($urlQueryString.charAt(0) === '?') $urlQueryString = $urlQueryString.slice(1);

        /**
         * @type {Object}
         */
        let $urlkeys = $urlQueryString.split('&');
        for (let $i = 0; $i < $urlkeys.length; $i += 1) {
            $urlkeys[$i] = $urlkeys[$i].split('=');
        }

        /**
         * If value is empty delete content
         */
        if ($value === '' || isNullUndf($value)) {
            for (let $i = 0; $i < $urlkeys.length; $i += 1) {
                if ($urlkeys[$i][0] === $key) {
                    if ($value === '') {
                        $urlkeys.splice($i, 1);
                        break;
                    }
                }
            }
        }

        /**
         * Replace
         */
        else {
            let $found = false;
            for (let $i = 0; $i < $urlkeys.length; $i += 1) {
                if ($urlkeys[$i][0] === $key) {
                    $urlkeys[$i][1] = $value;
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                $urlkeys.push([$key, $value]);
            }
        }

        /**
         * Assemble string
         */
        for (let $i = 0; $i < $urlkeys.length; $i += 1) {
            $urlkeys[$i] = $urlkeys[$i].join('=');
        }
        $urlkeys = $urlkeys.join('&');
        if ($urlkeys !== '') $urlkeys = '?' + $urlkeys;

        /**
         * Update URL
         */
        window.history.replaceState({}, '', $baseUrl + $urlkeys);

    };

    /*
     * Get all url parameters as a string.
     *
     * @param {string} $url - URL
     * @returns {string} - String with params
    this.getAllParam = function ($url) {

        let $parser = document.createElement('a');
        $parser.href = $url;
        return $parser.search.substring(1);

    };
     */

    /**
     * Reload the application URL.
     */
    this.reload = function () {

        location.reload();

    };

    /**
     * Redirect to URL.
     *
     * @param {string} $url - URL to redirect
     */
    this.redirect = function ($url) {

        window.onbeforeunload = null; // Prevent dialog
        window.location.replace($url);

    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * Pick certain keys and delete the rest.
     *
     * @param {string[]} $keep_keys - Keys to keep
     */
    this.pickDelete = function ($keep_keys) {

        let $keys = {};
        for (let $i = 0; $i < $keep_keys.length; $i += 1) {
            let $data = self.getParam($keep_keys[$i]);
            if (notNullUndf($data)) {
                $keys[$keep_keys[$i]] = $data;
            }
        }
        self.deleteParams();
        for (let $param in $keys) {
            if ($keys.hasOwnProperty($param)) {
                self.setParam($param, $keys[$param]);
            }
        }

    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * Alert on user reload.
     */
    this.reloadAlertForm = function () {

        window.onbeforeunload = function () {
            return 'Data will be lost if you leave the page, are you sure?';
        };

    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * Disable alert on user reload.
     */
    this.disableReloadAlert = function () {

        window.onbeforeunload = null;

    };

}

// noinspection JSUnusedGlobalSymbols
/**
 * Change the URL of the application
 * @type {__CORE_UrlModifier}
 * @global
 * @const
 */
const app_url = new __CORE_UrlModifier();