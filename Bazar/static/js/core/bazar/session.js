/**
 SESSION
 User session.
 */

"use strict";

/**
 * Application session data.
 *
 * @class
 * @private
 */
function __CORE_Session() {
    /* eslint-disable sort-keys */

    /**
     * Object pointer
     * @type {__CORE_Session}
     * @private
     */
    let self = this;

    /**
     * Class name
     * @type {string}
     * @private
     */
    let $classname = 'app_session';

    /**
     * Storage key identifier
     * @type {string}
     * @private
     */
    let $storageID = '_storage';

    /**
     * Data, overridden by cookie load
     */
    this.data = {

        /**
         * Advanced settings
         */
        gojs_dark: false,               // Dark mode gojs
        gojs_grid: true,                // GOJS grid
        gojs_inspector: false,          // GOJS inspector
        gojs_overview: true,            // GOJS overview (minimap)
        log_objects: false,             // Log item objects
        stats_meter: false,             // Display stats meter

        /**
         * General settings
         */
        theme_popup: cfg_popup_theme,   // Popups theme

        /**
         * User data
         */
        login: false,                   // User login status
        profilepic: '',                 // Profile picture
        userid: -1,                     // User ID
        username: '',                   // User name

    };
    let $defaults = $.extend(true, {}, self.data); // Defaults values

    /**
     * Application storage
     * @private
     */
    this._storage = {};

    /**
     * Storage vaults object
     * @private
     */
    this._storage_vaults = {};

    /**
     * Restricted storage keywords
     * @type {string[]}
     * @private
     */
    this._storage_keywords = ['settings', 'vaults'];

    /**
     * Cookies loaded
     * @type {boolean}
     * @private
     */
    this._loaded = false;

    /**
     * Save session status.
     *
     * @returns {boolean}
     */
    this.updateSessionCookie = function () {

        try {
            if (!cfg_cookie_local) {
                Cookies.set(cfg_cookie_session_id, self.data, {
                    expires: cfg_cookie_expire_days,
                });
            } else {
                localStorage.setItem(cfg_cookie_session_id, JSON.stringify(self.data));
            }
            return true;
        } catch ($e) {
        } finally {
        }
        return false;

    };

    /**
     * Extend default cookies values.
     */
    this.extendSessionValues = function () {

        $.extend(self.data, $defaults);

    };

    /**
     * Load session cookies.
     */
    this.loadSessionCookie = function () {

        // Load cookies
        if (self._loaded) return;

        /**
         * Load basic
         */
        let $c = Cookies.get(cfg_cookie_session_id);
        if (!notNullUndf($c) || $c.toString() === '[object Object]') {
            self.extendSessionValues();

            // Check errors
            Cookies.set(cfg_cookie_session_id, self.data, {
                expires: cfg_cookie_expire_days,
            });
            $c = Cookies.get(cfg_cookie_session_id);

            // If cookies are local then uses localStorage
            if (cfg_cookie_local || isNullUndf($c) || $c.toString() === '[object Object]') {
                app_console.warn('Cookies are disabled, using localStorage"');
                try {
                    $c = localStorage.getItem(cfg_cookie_session_id);
                } catch ($e) {
                    return;
                } finally {
                }
                if (isNullUndf($c)) {
                    localStorage.setItem(cfg_cookie_session_id, JSON.stringify($defaults));
                    $c = localStorage.getItem(cfg_cookie_session_id);
                }
                self.data = JSON.parse($c);
            }

            // If cookies cannot be save on browser
            if (!notNullUndf($c)) return;

            // Return cookies
            self.data = JSON.parse($c);
        }
        self.data = JSON.parse($c);

        /**
         * Load storage
         */
        self._storage = self._load_storage_vault();
        if (!self._storage.hasOwnProperty('vaults')) self._storage['vaults'] = [];
        let $vault;
        for (let $i = 0; $i < self._storage['vaults'].length; $i += 1) {
            $vault = self._storage['vaults'][$i];
            self._storage_vaults[$vault] = self._load_storage_vault($vault);
        }

        self._loaded = true;

    };

    /**
     * Load storage data using vaults.
     *
     * @param {string=} $vault
     * @returns {{}|any}
     * @private
     */
    this._load_storage_vault = function ($vault) {

        let $c;
        if (isNullUndf($vault) || $vault === '') {
            $vault = '';
        } else {
            $vault = '_' + $vault;
        }

        try { // Use localStorage

            // app_console.info(app_error.error.cookiesDisabled.usingLocalStorage);
            $c = localStorage.getItem(cfg_cookie_session_id + $storageID + $vault);

        } catch ($e) { // If any error occurs use cookies

            Cookies.set(cfg_cookie_session_id + $storageID + $vault, self._storage, {
                expires: cfg_cookie_expire_days,
            });
            $c = Cookies.get(cfg_cookie_session_id + $storageID);

        }

        // If cookies cannot be save on browser
        if (isNullUndf($c)) return {};
        return JSON.parse($c);

    };

    /**
     * Save storage vault.
     *
     * @param {string=} $vault
     * @private
     */
    this._save_storage_vault = function ($vault) {

        let $target;
        if (isNullUndf($vault) || $vault === '') {
            $target = self._storage;
            $vault = '';
        } else {
            $target = self._storage_vaults[$vault];
            $vault = '_' + $vault;
        }
        try {
            localStorage.setItem(cfg_cookie_session_id + $storageID + $vault, JSON.stringify($target));
        } catch ($e) {
            Cookies.set(cfg_cookie_session_id + $storageID + $vault, $target, {
                expires: cfg_cookie_expire_days,
            });
        } finally {
        }

    };

    /**
     * Returns true if the data is valid.
     *
     * @returns {boolean}
     */
    this.isValidData = function () {

        return notNullUndf(self.data);

    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * Log out cookies.
     *
     * @returns {boolean} - Query status
     */
    this.cookieLogout = function () {

        self.extendSessionValues();
        self.updateSessionCookie();

    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * Delete cookies.
     *
     * @returns {boolean} - Query status
     */
    this.clearSessionCookie = function () {

        try {
            if (!cfg_cookie_local) {
                Cookies.remove(cfg_cookie_session_id);
            } else {
                localStorage.removeItem(cfg_cookie_session_id);
            }
            return true;
        } catch ($e) {
        } finally {
        }
        return false;

    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * Get session value.
     *
     * @param {string} $key
     * @param {*=} $fallback
     */
    this.getValue = function ($key, $fallback) {

        if (!self.data.hasOwnProperty($key)) return $fallback;
        return self.data[$key];

    };

    /**
     * Set session value.
     *
     * @param {string} $key - Keyword identifier of the param
     * @param {*} $value - Value of the param to be saved
     */
    this.setValue = function ($key, $value) {

        self.data[$key] = $value;

    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * Get session data from storage.
     *
     * @param {string} $key
     * @param {number|number[]|string|string[]|boolean=} $fallback
     * @param {string=} $vault
     * @returns {number|number[]|string|string[]|boolean|boolean[]}
     */
    this.getData = function ($key, $fallback, $vault) {

        if (self._storage_keywords.hasItem($vault)) {
            app_console.coreError($classname, 'setValue', 'Vault used <{0}> cannot be readed'.format($vault));
            return null;
        }

        // Use vaults
        if (notNullUndf($vault) && $vault !== '') {
            if (!self._storage['vaults'].hasItem($vault) ||
                !self._storage_vaults.hasOwnProperty($vault)) return $fallback; // Vault does not exist
            if (!self._storage_vaults[$vault].hasOwnProperty($key)) return $fallback; // Vault does not have item
            return self._storage_vaults[$vault][$key];
        }

        // Don't use vaults
        if (!self._storage.hasOwnProperty($key)) return $fallback;
        return self._storage[$key];

    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * Store session data to storage.
     *
     * @param {string} $key
     * @param {number|number[]|string|string[]|boolean|boolean[]} $data
     * @param {string=} $vault
     */
    this.setData = function ($key, $data, $vault) {

        if (self._storage_keywords.hasItem($vault)) {
            app_console.coreError($classname, 'setValue', 'Vault used <{0}> cannot be saved'.format($vault));
            return;
        }
        if (notNullUndf($vault) && $vault !== '') { // Use vaults

            // Create the vault
            if (!self._storage['vaults'].hasItem($vault)) {
                self._storage['vaults'].push($vault);
                self._storage_vaults[$vault] = {};
                setTimeout(function () {
                    self._save_storage_vault();
                }, 250);
            }

            // Save
            self._storage_vaults[$vault][$key.toString()] = $data;
            self._save_storage_vault($vault);

        } else { // Dont use vaults

            self._storage[$key.toString()] = $data;
            self._save_storage_vault();

        }

    };

}

/**
 * Application session
 * @type {__CORE_Session}
 * @global
 * @const
 */
const app_session = new __CORE_Session();