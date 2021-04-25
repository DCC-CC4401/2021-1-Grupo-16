/**
 LOADING
 Loading panel.
 */
"use strict";

/**
 * Manages full loading spinner.
 *
 * @class
 * @private
 */
function __UI_FullPageLoadingSpinner() {

    /**
     * Object pointer
     * @type {__UI_FullPageLoadingSpinner}
     * @private
     */
    let self = this;

    /**
     * Loading spinner
     * @type {Spinner|null}
     * @private
     */
    this._loading_spiner = null;

    /**
     * Spinner status
     * @type {boolean}
     * @private
     */
    this._enabled = false;

    /**
     * Maximum duration of the event
     * @type {number}
     * @private
     */
    this._max_duration_spinner = cfg_max_time_loading_layer;

    /**
     * Thread ID
     * @type {number}
     * @private
     */
    this._max_duration_thread = 0;

    /**
     * Change function, is enabled after {@link cfg_init_loading_layer_after} milliseconds
     * @type {number}
     * @private
     */
    this._thread_change = -1;

    /**
     * Disable scroll lock
     * @type {boolean}
     * @private
     */
    this._scroll_lock = false;

    /**
     * Size of the loading box
     * @type {{width:number, height:number, mean:number}}
     * @private
     */
    this._size = {
        height: 75,
        mean: 0,
        width: 75,
    };
    this._size.mean = (self._size.width + self._size.height) / 2;

    // noinspection JSUnusedGlobalSymbols
    /**
     * Set spinner max duration time.
     *
     * @param {number} $seconds - Time in seconds, if 0 disable the cancel loading after max duration time
     */
    this.setMaxDuration = function ($seconds) {

        self._max_duration_spinner = $seconds * 1000;

    };

    /**
     * Show spinner.
     *
     * @param {string=} $message
     */
    this.start = function ($message) {

        if (isNullUndf($message)) $message = '';
        if (self._thread_change !== -1) return; // If waiting returns
        if (self._enabled) return; // If init returns
        self._thread_change = setTimeout(function () { // Create new thread
            if (!self._enabled) self._loadFullpageSpinner(true);
            self._thread_change = -1;
        }, cfg_init_loading_layer_after);
        self.setMessage($message);

    };

    /**
     * Stop spinner.
     */
    this.stop = function () {

        if (self._thread_change !== -1) {
            clearTimeout(self._thread_change);
            self._thread_change = -1;
        }
        self._loadFullpageSpinner(false);
        self.clearMessage();

    };

    /**
     * Clear current message.
     */
    this.clearMessage = function () {

        self.setMessage('');

    };

    /**
     * Set loading message.
     *
     * @param {string=} $message
     */
    this.setMessage = function ($message) {

        /** @type {jQuery} */ let $div = app_dom.body.find('#loading-div-layer-message');
        $div.hide();

        if (isNullUndf($message) || $message === '') {
            $div.empty();
        } else {
            $div.html($message);
            $div.show();
            let $width = $div.innerWidth();
            if ($width === 0) {
                setTimeout(function () {
                    self.setMessage($message);
                }, 150);
            }
            $div.css('margin-left', 'calc((-{0}px + var(--loading-box-width)) / 2)'.format($div.innerWidth()));
        }

    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * Set body cursor.
     *
     * @param {boolean=} $status - If true, show cursor
     */
    this.bodyCursor = function ($status) {
        if (isNullUndf($status)) $status = false;
        if ($status) {
            app_dom.body.css('cursor', 'wait');
        } else {
            app_dom.body.css('cursor', 'initial');
        }
    };

    /**
     * Show loading panel.
     *
     * @param {boolean} $checker - Set status
     * @param {Function=} $callback - Callback function
     * @private
     */
    this._loadFullpageSpinner = function ($checker, $callback) {
        /* eslint callback-return:"off" */

        let $h, $hh, $w, $posX, $posY;

        /**
         * Get page dimension
         */
        $h = app_dom.window.outerHeight();
        $hh = app_dom.body.outerHeight();
        $hh = Math.max($h, $hh) - 0.1;
        $w = app_dom.window.outerWidth();
        $posX = ($w - self._size.width) / 2;
        $posY = ($h - self._size.height) / 2;

        /**
         * --------------------------------------------------------------------
         * Show spinner
         * --------------------------------------------------------------------
         */
        if ($checker) {

            // Object has not been created
            if (isNullUndf(document.getElementById('loading-div-layer'))) {
                // App message
                app_console.info('Init loading layer');

                // Add object
                app_dom.body.prepend('<div id="loading-div-layer" class="loading-div-layer-class noselect"><div class="loading-foreground"><div class="loading-box"><div id="loading-div-layer-message"></div><div id="spinner-spin"></div></div></div><div class="loading-background"></div></div>');
                let $opts = {// Init spinner
                    animation: 'spinner-line-fade-more',
                    className: 'spinner',
                    color: app_theme.spinColor,
                    corners: 0.95,
                    direction: 1,
                    fadeColor: 'transparent',
                    left: '50%',
                    length: self._size.mean / 2,
                    lines: app_theme.spinLines,
                    position: 'absolute',
                    radius: 45,
                    rotate: 0,
                    scale: app_theme.spinScale,
                    shadow: app_theme.spinShadow,
                    speed: 1.0,
                    top: '50%',
                    width: 16,
                    zIndex: 2e9,
                };
                /** @private */ this._spinner_container = document.getElementById('spinner-spin');
                // noinspection JSValidateTypes
                self._loading_spiner = new Spinner($opts);
            }

            // Change loadingLayer geometry
            let $loadinglayer = $('#loading-div-layer');
            // $loadinglayer.css('height', String(hh) + 'px');
            $loadinglayer.find('.loading-foreground').css('height', String($hh) + 'px');
            $loadinglayer.find('.loading-foreground .loading-box').css({
                'left': $posX.toString() + 'px',
                'top': $posY.toString() + 'px',
            });
            $loadinglayer.find('.loading-background').css('height', String($hh) + 'px');
            // noinspection JSValidateTypes
            $loadinglayer.fadeIn(350, function () {
                if (notNullUndf($callback)) $callback();
            });

            // Init spinner
            // noinspection JSUnresolvedFunction
            self._loading_spiner.spin(self._spinner_container);

            // Disable scroll
            if (app_dom.body.height() > app_dom.window.height()) {
                // noinspection JSUnresolvedVariable
                $.extScrollLock.enable('loading');
                self._scroll_lock = true;
            }

            // Init hide thread
            if (self._max_duration_spinner > 0) {
                self._max_duration_thread = setTimeout(function () {
                    self.stop();
                    self._max_duration_thread = 0;
                    clearTimeout(self._thread_change);
                    self._thread_change = -1;
                }, self._max_duration_spinner * 1000);
            } else {
                if (self._thread_change !== -1) {
                    clearTimeout(self._thread_change);
                    self._thread_change = -1;
                }
            }

            // Set as initialized
            self._enabled = true;

        }

        /**
         * --------------------------------------------------------------------
         * Hide spinner
         * --------------------------------------------------------------------
         */
        else {

            // Cancel timeout
            if (self._max_duration_thread !== 0) {
                clearTimeout(self._max_duration_thread);
                self._max_duration_thread = 0;
            }

            // Disable scrollock
            if (self._scroll_lock) {
                // noinspection JSUnresolvedVariable
                $.extScrollLock.disable('loading');
                self._scroll_lock = false;
            }

            // Hide object
            $('#loading-div-layer').hide();

            // Stop spinner
            if (notNullUndf(self._loading_spiner)) { // noinspection JSUnresolvedFunction
                self._loading_spiner.stop();
            }

            // Check as hidden
            self._enabled = false;

            // Trigger callback
            if (notNullUndf($callback)) $callback();
        }

    };

    /**
     * Add resize event.
     */
    app_dom.window.onReplace('resize.FullPageLoadingDivLayer', function ($e) {
        $e.preventDefault();
        if (!self._enabled) return;
        let $h, $hh, $w, $posX, $posY;
        if (document.getElementById('loading-div-layer') !== null) {
            $h = app_dom.window.outerHeight();
            $hh = app_dom.body.outerHeight();
            $hh = Math.max($h, $hh);
            $w = app_dom.window.outerWidth();
            $posX = ($w - self._size.width) / 2;
            $posY = ($h - self._size.height) / 2;
            let $loadinglayer = $('#loading-div-layer');

            /*
            $loadinglayer.css({
                height: hh.toString() + 'px',
            });
             */

            $loadinglayer.find('> .loading-foreground').css({
                height: $hh.toString() + 'px',
            });
            $loadinglayer.find('> .loading-background').css({
                height: $hh.toString() + 'px',
            });
            $loadinglayer.find('> .loading-foreground > .loading-box').css({
                left: $posX.toString() + 'px',
            });
            app_dom.body.find('.loading-box').css({
                'left': $posX + 'px',
                'top': $posY + 'px',
            });
        }

    });

}

/**
 * Init loading object
 * @type {__UI_FullPageLoadingSpinner}
 * @const
 * @global
 */
const app_loading_layer = new __UI_FullPageLoadingSpinner();