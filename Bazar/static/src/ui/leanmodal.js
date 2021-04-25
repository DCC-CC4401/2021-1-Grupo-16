/**
 LEANMODAL
 Popup management.
 */
"use strict";

/**
 * Leanmodal, lets access to $.leanModal.
 *
 * @class
 * @private
 */
function __UI_LeanModal() {
    /* eslint no-mixed-operators:"off" */

    /**
     * Object pointer
     * @type {__UI_LeanModal}
     * @private
     */
    let self = this;

    /**
     * Class name
     * @type {string}
     * @private
     */
    let $classname = 'app_leanmodal';

    /**
     * Available leanmodal classes
     * @type {{LARGE:string, NORMAL:string, WIDE:string}}
     * @public
     */
    this.lean_classes = {
        LARGE: 'large-leanmodal',
        NORMAL: 'normal-leanmodal',
        WIDE: 'wide-leanmodal',
    };

    /**
     * Spinner
     * @private
     */
    this._spinner = null;

    /**
     * Leanmodal opener or closed
     * @type {boolean}
     * @private
     */
    this._is_opened = false;

    /**
     * Options
     * @private
     */
    this._options = {};

    /**
     * Animation of the leanmodal factor
     * @type {number}
     * @private
     */
    this._animation_factor = 1;

    /**
     * Modal is in show/hide transition
     * @type {boolean}
     * @private
     */
    this._in_transition = false;

    /**
     * Function triggered when the user closes the modal (clicking button or outside the modal).
     * @private
     */
    this._fun_user_close = function () {
    };

    /**
     * Escape button event.
     *
     * @param {Object} $event
     * @private
     */
    this._escKey = function ($event) {

        if ($event.keyCode === 27) self.close();

    };

    /**
     * Overrides current user close modal.
     *
     * @param {function} $fun
     */
    this.onUserClose = function ($fun) {

        self._fun_user_close = $fun;

    };

    /**
     * Open.
     *
     * @param {Event} $event - Event
     * @param {{onShow:function=, overlay:number=, escButtonCloses:boolean=, loading:boolean=, beforeOpen:function=, applyHeaderBlur:boolean=, clickOutsideCloses:boolean=, onUserClose:function=, beforeClose:function=, closeButton:string=, afterOpen:function=, defaultClass:string=, onHide:function=, afterClose:function=}=} $options - Creation options
     */
    this.open = function ($event, $options) {

        if (self._is_opened) self.close();
        app_console.coreInfo($classname, 'open', 'Opening modal');

        // Extend options
        let $defaults = {
            afterClose: function () {
            },
            afterOpen: function () {
            },
            applyHeaderBlur: app_theme.leanModalHeaderBlur > 0,
            beforeClose: function () {
            },
            beforeOpen: function () {
            },
            clickOutsideCloses: true,
            closeButton: '.modal-close',
            defaultClass: self.lean_classes.NORMAL,
            escButtonCloses: true,
            loading: false,
            onHide: function () {
            },
            onShow: function () {
            },
            onUserClose: function () { // User clicks on close button or outside the modal
            },
            overlay: app_theme.leanModalBackgroundOpacity,
        };
        self._options = $.extend($defaults, $options);
        self._options.beforeOpen();
        let $lean_close = $(self._options.closeButton);
        self._animation_factor = 1;
        self._fun_user_close = self._options.onUserClose;

        /**
         * Initialize events
         */
        if (notNullUndf(self._options.loading) && self._options.loading) app_loading_layer.start();
        if (notNullUndf($event)) $event.preventDefault(); // Disable events

        if (self._options.escButtonCloses) {
            document.addEventListener('keyup', self._escKey, false);
        }

        // Outside click (overlay)
        if (self._options.clickOutsideCloses) {
            app_dom.leanoverlay.onReplace(app_event.common.click, function ($e) {
                $e.preventDefault();
                self._fun_user_close();
                self.close();
            });
        } else {
            app_dom.leanoverlay.off(app_event.common.click);
        }

        // Disable contextual menu (overlay)
        app_dom.leanoverlay.onReplace(app_event.common.contextmenu, function ($e) {
            $e.preventDefault();
        });

        // Close button
        $lean_close.onReplace(app_event.common.click, function ($e) {
            $e.preventDefault();
            self._fun_user_close();
            self.close();
        });
        self.showClose();

        /**
         * Visuals
         */
        self.show();
        $lean_close.attr('title', 'Close');
        self.scrollToTop();

        // Center data
        app_dom.window.onReplace(app_event.target.resize.centerLeanmodal, self.centerLean);
        self.centerLean();

        /**
         * Set as opened
         */
        self._is_opened = true;
        self._options.afterOpen();

    };

    /**
     * Close.
     */
    this.close = function () {

        if (!self._is_opened) return;
        self._options.beforeClose();
        self.hide();
        document.removeEventListener('keyup', self._escKey);
        app_dom.window.off(app_event.target.resize.centerLeanmodal); // Delete window resize
        self.clearContent();
        self._is_opened = false;
        self._options.afterClose();
        self._options = {};
        app_console.coreInfo($classname, 'close', 'Modal closed');

    };

    /**
     * Show lean.
     */
    this.show = function () {

        if (self._in_transition) {
            setTimeout(self.show, 100);
            return;
        }
        app_console.coreInfo($classname, 'show', 'Showing modal');
        self._in_transition = true;
        self._options.onShow();
        self.addClass(self._options.defaultClass);
        app_dom.leanoverlay.css({
            'background-color': app_theme.leanModalBackgroundColor,
            'filter': 'alpha(opacity=0)',
            'opacity': 0,
            'zoom': 1,
        });
        app_dom.leanoverlay.fadeTo(200 * self._animation_factor, self._options.overlay);
        app_dom.leanmodal.css({
            'filter': 'alpha(opacity=0)',
            'opacity': 0,
            'position': 'fixed',
            'z-index': 11000,
            'zoom': 1,
        });
        // app_dom.root.css({
        //     '-webkit-filter': 'blur(' + app_theme.leanModalBackgroundBlur + 'px)',
        //     'filter': 'blur(' + app_theme.leanModalBackgroundBlur + 'px)',
        // });
        if (self._options.applyHeaderBlur) {
            // app_dom.header.css({
            //     '-webkit-filter': 'blur(' + app_theme.leanModalHeaderBlur + 'px)',
            //     'filter': 'blur(' + app_theme.leanModalHeaderBlur + 'px)',
            // });
        }
        // noinspection JSUnresolvedVariable
        $.backToTopBtn.hide();
        // if (app_dom.root.height() > app_dom.window.height()) {
        //     // noinspection JSUnresolvedVariable
        //     $.extScrollLock.enable('leanmodal');
        // }
        app_dom.leanmodal.fadeTo(app_theme.leanModalFadeTime * self._animation_factor, 1);
        setTimeout(function () {
            self._in_transition = false;
        }, app_theme.leanModalFadeTime * 1.1 * self._animation_factor); // Set max of transitions + delta

    };

    /**
     * Hide lean without closing (deleting the contents and applying callbacks).
     */
    this.hide = function () {

        if (self._in_transition) {
            setTimeout(self.hide, 100);
            return;
        }
        app_console.coreInfo($classname, 'hide', 'Hiding modal');
        self._in_transition = true;
        self._options.onHide();
        // noinspection JSValidateTypes
        app_dom.leanoverlay.fadeOut(app_theme.leanModalFadeTime * self._animation_factor);
        app_dom.html.css('overflow-y', 'visible');
        // app_dom.root.css({
        //     '-webkit-filter': 'blur(0px)',
        //     'filter': 'blur(0px)',
        // });
        // app_dom.header.css({
        //     '-webkit-filter': 'blur(0px)',
        //     'filter': 'blur(0px)',
        // });
        app_dom.leanmodal.css({
            'display': 'none',
        });
        app_dom.body.find('.tooltipster-base').hide(); // Hide tooltips
        try {
            // noinspection JSUnresolvedVariable
            $.backToTopBtn.show();
            // noinspection JSUnresolvedVariable
            $.extScrollLock.disable('leanmodal');
        } catch ($e) {
        } finally {
        }
        setTimeout(function () {
            self._in_transition = false;
        }, app_theme.leanModalFadeTime * 1.1 * self._animation_factor); // Set max of transitions + delta

    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * Disable animations of the modal.
     */
    this.disableAnimation = function () {

        self._animation_factor = 0;

    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * Enable animations of the modal.
     */
    this.enableAnimation = function () {

        self._animation_factor = 1;

    };

    /**
     * Reposition.
     */
    this.centerLean = function () {

        app_dom.leanmodal.css({
            'margin-left': (app_dom.window.width() - app_dom.leanmodal.width()) / 2 + 'px',
            'top': Math.max((app_dom.window.outerHeight() - app_dom.leanmodal.outerHeight()) / 2, 0) + 'px',
        });

    };

    /**
     * Set leanmodal title.
     */
    this.setTitle = function ($title) {

        $('#leanmodal-title').html($title);

    };

    /**
     * Add a class to leanmodal.
     *
     * @param {string} $class - Class name
     * @param {boolean=} $remove_all - Remove all classes
     */
    this.addClass = function ($class, $remove_all) {

        if ($remove_all) app_dom.leanmodal.removeAttr('class');
        app_dom.leanmodal.addClass($class);
        self.centerLean();

    };

    /**
     * Clear content of leanmodal.
     */
    this.clearContent = function () {

        self.hideSpinner();
        self.setTitle('');
        app_dom.leancontent.removeAttr('class');
        app_dom.leancontent.removeAttr('style');
        app_dom.leancontent.empty();
        app_dom.leanmodal.removeAttr('class'); // Better than removeClass
        // self.scroll_to_bottom();

    };

    /**
     * Show load spinner.
     */
    this.showSpinner = function () {

        let $spinner = $('#leanmodal-spinner');
        if (isNullUndf(self._spinner)) {
            app_dom.leancontainer.append('<div id="leanmodal-spinner"></div>');
            let $opts = {
                animation: 'spinner-line-fade-more',
                className: 'spinner',
                color: '#000',
                corners: 0.95,
                direction: 1,
                fadeColor: 'transparent',
                left: '50%',
                length: 30,
                lines: 11,
                position: 'absolute',
                radius: 45,
                rotate: 0,
                scale: 0.20,
                shadow: app_theme.spinShadow,
                speed: app_theme.spinSpeed,
                top: '50%',
                width: 12,
                zIndex: 2e9,
            };
            self._spinner = new Spinner($opts).spin(document.getElementById('leanmodal-spinner'));
        } else {
            self._spinner.spin(document.getElementById('leanmodal-spinner'));
            // noinspection JSValidateTypes
            $spinner.fadeIn(200);
        }

    };

    /**
     * Hide content spinner.
     */
    this.hideSpinner = function () {

        if (notNullUndf(self._spinner)) {
            self._spinner.stop();
        } else {
            return;
        }
        let $spinner = $('#leanmodal-spinner');
        if ($spinner.length !== 0) { // noinspection JSValidateTypes
            $spinner.fadeOut(200);
        }

    };

    /*
     * Returns content height.
     *
     * @returns {number}
    this.getHeight = function () {

        if (!self._is_opened) return 0;
        return app_dom.leancontent.prop('scrollHeight');

    };
     */

    /*
     * Scroll to bottom.
    this.scrollToBottom = function () {

        if (!self._is_opened) return;
        app_dom.leancontent.stop();
        app_dom.leancontent.animate({
            scrollTop: self.getHeight(),
        }, 800);

    };
     */

    /**
     * Scroll to top.
     */
    this.scrollToTop = function () {

        if (!self._is_opened) return;
        app_dom.leancontent.stop();
        app_dom.leancontent.animate({
            scrollTop: 0,
        }, 800);

    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * Padding to content.
     */
    this.addContentPadding = function () {

        app_dom.leancontent.css('padding', '13px 10px');

    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * Hide the close button.
     */
    this.hideClose = function () {

        $(self._options.closeButton).hide();

    };

    /**
     * Show the close button.
     */
    this.showClose = function () {

        $(self._options.closeButton).show();

    };

}

/**
 * Manages leanmodal
 * @type {__UI_LeanModal}
 * @const
 * @global
 */
const app_leanmodal = new __UI_LeanModal();