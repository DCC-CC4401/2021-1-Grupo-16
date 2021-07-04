/**
 DIALOGS
 Dialog administrator.
 */
"use strict";

/**
 * Application dialogs using Jquery-Confirm.
 *
 * @class
 * @private
 */
function __UI_Dialog() {

    /**
     * Object pointer
     * @type {__UI_Dialog}
     * @private
     */
    let self = this;

    /**
     * Class name
     * @type {string}
     * @private
     */
    let $classname = '__UI_Dialog';

    /**
     * Spinner
     * @private
     */
    this._spinner = null;

    /**
     * Spinner ID object
     * @type {string}
     * @private
     */
    this._spinner_id = '';

    /**
     * Stores all configurations
     * @type {{buttons: {OTHER:string, DANGER:string, SUCCESS:string, BLUE:string, ERROR:string, PRIMARY:string, PURPLE:string, INFO:string, NONE:string, WARNING:string, DEFAULT:string}, size: {SMALL:string, LARGE:string, NORMAL:string, FULL:string}, icons: {OTHER:string, SUCCESS:string, ERROR:string, PURPLE:string, INFO:string, NONE:string, WARNING:string, DEFAULT:string}, type: {OTHER:string, SUCCESS:string, ERROR:string, PURPLE:string, INFO:string, NONE:string, WARNING:string, DEFAULT:string}, animation: {LEFT:string, OPACITY:string, ROTATEYR:string, BOTTOM:string, ROTATEXR:string, ROTATEX:string, ROTATEY:string, TOP:string, ROTATE:string, RIGHT:string, ZOOM:string, SCALE:string, NONE:string, SCALEY:string, SCALEX:string}}}
     * @public
     */
    this.options = {
        animation: {
            BOTTOM: 'bottom',
            LEFT: 'left',
            NONE: 'none',
            OPACITY: 'opacity',
            RIGHT: 'right',
            ROTATE: 'rotate',
            ROTATEX: 'rotateX',
            ROTATEXR: 'rotateXR',
            ROTATEY: 'rotateY',
            ROTATEYR: 'rotateYR',
            SCALE: 'scale',
            SCALEX: 'scaleX',
            SCALEY: 'scaleY',
            TOP: 'top',
            ZOOM: 'zoom',
        },
        buttons: {
            BLUE: 'btn-blue',
            DANGER: 'btn-danger',
            DEFAULT: 'btn-default',
            ERROR: 'btn-default', // btn-red
            INFO: 'btn-info',
            NONE: '',
            OTHER: 'btn-default',
            PRIMARY: 'btn-primary',
            PURPLE: 'btn-purple',
            SUCCESS: 'btn-success',
            WARNING: 'btn-warning',
        },
        icons: {
            DEFAULT: '',
            ERROR: 'fas fa-times',
            INFO: 'fas fa-info-circle',
            NONE: '',
            OTHER: '',
            PURPLE: '',
            SUCCESS: 'fas fa-check-circle',
            WARNING: 'fas fa-exclamation-triangle',
        },
        size: {
            FULL: 'DIALOG-FULL',
            LARGE: 'DIALOG-LARGE',
            NORMAL: 'DIALOG-NORMAL',
            SMALL: 'DIALOG-SMALL',
        },
        type: {
            DEFAULT: '',
            ERROR: 'red',
            INFO: 'blue',
            NONE: '',
            OTHER: 'dark',
            PURPLE: 'purple',
            SUCCESS: 'green',
            WARNING: 'orange',
        },
    };

    /**
     * Type of dialogs
     * @type {{EWSIO:string, DIALOG:string, FORM:string, TEXT:string, CONFIRM:string}}
     */
    let $types = {
        CONFIRM: 'confirm',
        DIALOG: 'dialog', // generic
        EWSIO: 'ewsio', // Error, warning, success, info
        FORM: 'form',
        TEXT: 'text',
    };

    /**
     * Stores last popup content
     * @private
     */
    this._last = {
        destroyed: true,
        md5: '',
        object: null,
        options: null,
    };

    /**
     * Close last after opening a new dialog
     * @type {boolean}
     * @private
     */
    this._close_last = false;

    /**
     * Dialog is opened
     * @type {boolean}
     * @private
     */
    this._opened = false;

    /**
     * Text dialog and close button (confirmButton).
     *
     * @param {string} $title
     * @param {string} $text
     * @param {{cancel:function|null=, disableSelect:boolean=, forceCursorDefault:boolean=, icon:string=, closeAnimation:string=, confirmText:string=, escapeCancelKey:boolean=, type:string=, typeAnimated:boolean=, watchInterval:number=, draggable:boolean=, onOpen:function|null=, cancelText:string|null=, backgroundDismissAnimation:string=, useBootstrap:boolean=, confirmButtonClass:string|*=, backgroundDismiss:string=, buttonMaxLength:number=, onOpenBefore:function|null=, onDestroy:function|null=, lazyOpen:boolean=, closeIcon:boolean=, cancelButtonClass:string=, animation:string=, animationSpeed:number=, confirm:function|null=, onContentReady:function|null=, onClose:function|null=, dragWindowGap:number=, size:string|*=, animationBounce:number=, animateFromElement:boolean=, disableWebScroll:boolean=}=} $options
     */
    this.text = function ($title, $text, $options) {

        /**
         * Default values
         */
        if (isNullUndf($options)) $options = {};
        if (isNullUndf($title)) $title = '';

        /**
         * Build parameters
         */
        let $defaults = {
            _type: $types.TEXT,
            close: null,
            closeButtonClass: self.options.buttons.DEFAULT,
            closeText: 'Cerrar',
        };
        $options = $.extend($defaults, $options);

        /**
         * Check options are OK
         */
        if (notNullUndf($options['close']) && !($options['close'] instanceof Function)) {
            app_console.warn('Cant associate an invalid event to the dialog button ({0}), null function has been established'.format($options['closeText'].toUpperCase()));
            $options['close'] = null;
        }

        // noinspection BadExpressionStatementJS
        $options['cancelText'] = null;
        $options['onClose'] = $options['close'];
        $options['confirmButtonClass'] = $options['closeButtonClass'];
        $options['confirmText'] = $options['closeText'];
        delete $options['close'];
        delete $options['closeButtonClass'];
        delete $options['closeText'];

        /**
         * Crate text
         */
        self._createDialog($title, $text, $options);

    };

    /**
     * Error dialog.
     *
     * @param {string} $title
     * @param {string} $content
     * @param {{cancel:function|null=, disableSelect:boolean=, forceCursorDefault:boolean=, icon:string=, closeAnimation:string=, confirmText:string=, escapeCancelKey:boolean=, type:string=, typeAnimated:boolean=, watchInterval:number=, draggable:boolean=, onOpen:function|null=, cancelText:string|null=, backgroundDismissAnimation:string=, useBootstrap:boolean=, confirmButtonClass:string|*=, backgroundDismiss:string=, buttonMaxLength:number=, onOpenBefore:function|null=, onDestroy:function|null=, lazyOpen:boolean=, closeIcon:boolean=, cancelButtonClass:string=, animation:string=, animationSpeed:number=, confirm:function|null=, onContentReady:function|null=, close:function|null=, dragWindowGap:number=, size:string|*=, animationBounce:number=, animateFromElement:boolean=, disableWebScroll:boolean=, closeText:string|null=}=} $options
     */
    this.error = function ($title, $content, $options) {

        self._ewsioType(
            $title,
            $content,
            self.options.type.ERROR,
            self.options.icons.ERROR,
            self.options.buttons.ERROR,
            $options,
        );

    };

    /**
     * Information dialog.
     *
     * @param {string} $title
     * @param {string} $content
     * @param {{cancel:function|null=, disableSelect:boolean=, forceCursorDefault:boolean=, icon:string=, closeAnimation:string=, confirmText:string=, escapeCancelKey:boolean=, type:string=, typeAnimated:boolean=, watchInterval:number=, draggable:boolean=, onOpen:function|null=, cancelText:string|null=, backgroundDismissAnimation:string=, useBootstrap:boolean=, confirmButtonClass:string|*=, backgroundDismiss:string=, buttonMaxLength:number=, onOpenBefore:function|null=, onDestroy:function|null=, lazyOpen:boolean=, closeIcon:boolean=, cancelButtonClass:string=, animation:string=, animationSpeed:number=, confirm:function|null=, onContentReady:function|null=, close:function|null=, dragWindowGap:number=, size:string|*=, animationBounce:number=, animateFromElement:boolean=, disableWebScroll:boolean=, closeText:string|null=}=} $options
     */
    this.info = function ($title, $content, $options) {

        self._ewsioType(
            $title,
            $content,
            self.options.type.INFO,
            self.options.icons.INFO,
            self.options.buttons.INFO,
            $options,
        );

    };

    /**
     * Warning dialog.
     *
     * @param {string} $title
     * @param {string} $content
     * @param {{cancel:function|null=, disableSelect:boolean=, forceCursorDefault:boolean=, icon:string=, closeAnimation:string=, confirmText:string=, escapeCancelKey:boolean=, type:string=, typeAnimated:boolean=, watchInterval:number=, draggable:boolean=, onOpen:function|null=, cancelText:string|null=, backgroundDismissAnimation:string=, useBootstrap:boolean=, confirmButtonClass:string|*=, backgroundDismiss:string=, buttonMaxLength:number=, onOpenBefore:function|null=, onDestroy:function|null=, lazyOpen:boolean=, closeIcon:boolean=, cancelButtonClass:string=, animation:string=, animationSpeed:number=, confirm:function|null=, onContentReady:function|null=, close:function|null=, dragWindowGap:number=, size:string|*=, animationBounce:number=, animateFromElement:boolean=, disableWebScroll:boolean=, closeText:string|null=}=} $options
     */
    this.warning = function ($title, $content, $options) {

        self._ewsioType(
            $title,
            $content,
            self.options.type.WARNING,
            self.options.icons.WARNING,
            self.options.buttons.WARNING,
            $options,
        );

    };

    /**
     * Success dialog.
     *
     * @param {string} $title
     * @param {string} $content
     * @param {{cancel:function|null=, disableSelect:boolean=, forceCursorDefault:boolean=, icon:string=, closeAnimation:string=, confirmText:string=, escapeCancelKey:boolean=, type:string=, typeAnimated:boolean=, watchInterval:number=, draggable:boolean=, onOpen:function|null=, cancelText:string|null=, backgroundDismissAnimation:string=, useBootstrap:boolean=, confirmButtonClass:string|*=, backgroundDismiss:string=, buttonMaxLength:number=, onOpenBefore:function|null=, onDestroy:function|null=, lazyOpen:boolean=, closeIcon:boolean=, cancelButtonClass:string=, animation:string=, animationSpeed:number=, confirm:function|null=, onContentReady:function|null=, close:function|null=, dragWindowGap:number=, size:string|*=, animationBounce:number=, animateFromElement:boolean=, disableWebScroll:boolean=, closeText:string|null=}=} $options
     */
    this.success = function ($title, $content, $options) {

        self._ewsioType(
            $title,
            $content,
            self.options.type.SUCCESS,
            self.options.icons.SUCCESS,
            self.options.buttons.SUCCESS,
            $options,
        );

    };

    /**
     * Other dialog.
     *
     * @param {string} $title
     * @param {string} $content
     * @param {{cancel:function|null=, disableSelect:boolean=, forceCursorDefault:boolean=, icon:string=, closeAnimation:string=, confirmText:string=, escapeCancelKey:boolean=, type:string=, typeAnimated:boolean=, watchInterval:number=, draggable:boolean=, onOpen:function|null=, cancelText:string|null=, backgroundDismissAnimation:string=, useBootstrap:boolean=, confirmButtonClass:string|*=, backgroundDismiss:string=, buttonMaxLength:number=, onOpenBefore:function|null=, onDestroy:function|null=, lazyOpen:boolean=, closeIcon:boolean=, cancelButtonClass:string=, animation:string=, animationSpeed:number=, confirm:function|null=, onContentReady:function|null=, close:function|null=, dragWindowGap:number=, size:string|*=, animationBounce:number=, animateFromElement:boolean=, disableWebScroll:boolean=, closeText:string|null=}=} $options
     */
    this.other = function ($title, $content, $options) {

        self._ewsioType(
            $title,
            $content,
            self.options.type.OTHER,
            self.options.icons.OTHER,
            self.options.buttons.OTHER,
            $options,
        );

    };

    /**
     * Trows and (E)rror, (W)arning, (S)uccess, (I)nfo, (O)ther dialog.
     *
     * @param {string} $title
     * @param {string} $content
     * @param {string} $type
     * @param {string} $icon
     * @param {string} $button_class
     * @param {{cancel:function|null=, disableSelect:boolean=, forceCursorDefault:boolean=, icon:string=, closeAnimation:string=, confirmText:string=, escapeCancelKey:boolean=, type:string=, typeAnimated:boolean=, watchInterval:number=, draggable:boolean=, onOpen:function|null=, cancelText:string|null=, backgroundDismissAnimation:string=, useBootstrap:boolean=, confirmButtonClass:string|*=, backgroundDismiss:string=, buttonMaxLength:number=, onOpenBefore:function|null=, onDestroy:function|null=, lazyOpen:boolean=, closeIcon:boolean=, cancelButtonClass:string=, animation:string=, animationSpeed:number=, confirm:function|null=, onContentReady:function|null=, close:function|null=, dragWindowGap:number=, size:string|*=, animationBounce:number=, animateFromElement:boolean=, disableWebScroll:boolean=, closeText:string|null=}} $options
     * @private
     */
    this._ewsioType = function ($title, $content, $type, $icon, $button_class, $options) {

        /**
         * Default params
         */
        if (isNullUndf($options)) $options = {};

        /**
         * Build parameters
         */
        let $defaults = {
            _type: $types.EWSIO,
            close: null,                        // Close function
            closeButtonClass: $button_class,    // Button class
            closeText: 'Cerrar',                // Confirm text
            icon: $icon,                        // Icon
            size: self.options.size.SMALL,      // Dialog size
            type: $type,                        // Dialog type
            typeAnimated: true,                 // Animated dialog
        };
        $options = $.extend($defaults, $options);

        /**
         * Check paramaters are OK
         */
        if (notNullUndf($options['close']) && !($options['close'] instanceof Function)) {
            app_console.warn('Cant associate an invalid event to the dialog button ({0}), null function has been established'.format($options['closeText'].toUpperCase()));
            $options['close'] = null;
        }

        $options['cancelText'] = null;
        $options['onClose'] = $options['close'];
        $options['confirmButtonClass'] = $options['closeButtonClass'];
        $options['confirmText'] = $options['closeText'];
        delete $options['close'];
        delete $options['closeButtonClass'];
        delete $options['closeText'];

        /**
         * Creates dialog
         */
        self._createDialog($title, $content, $options);

    };

    /**
     * Throws an information popup.
     *
     * @param {string} $title
     * @param {string} $content
     * @param {{cancel: function|null=, confirm: function|null=, size: string=, icon: string=}} $options
     */
    this.confirm = function ($title, $content, $options) {

        /**
         * Default options
         */
        if (isNullUndf($options)) $options = {};

        /**
         * Build parameters
         */
        let $defaults = {
            _type: $types.CONFIRM,
            backgroundDismiss: false,
            closeIcon: false,
            draggable: false,
            escapeCancelKey: false,
            size: self.options.size.SMALL,
        };
        $options = $.extend($defaults, $options);

        /**
         * Confirm dialog
         */
        self._createDialog($title, $content, $options);

    };

    /**
     * Form dialog, requires two functions that are triggered one the form has been submitted
     * (submit) or cancelled (cancel).
     *
     * @param {string} $title
     * @param {string} $content
     * @param {function} $submit
     * @param {function|null} $cancel
     * @param {{cancel:function|null=, disableSelect:boolean=, forceCursorDefault:boolean=, icon:string=, closeAnimation:string=, confirmText:string=, escapeCancelKey:boolean=, type:string=, typeAnimated:boolean=, watchInterval:number=, draggable:boolean=, onOpen:function|null=, cancelText:string|null=, backgroundDismissAnimation:string=, useBootstrap:boolean=, confirmButtonClass:string|*=, backgroundDismiss:string=, buttonMaxLength:number=, onOpenBefore:function|null=, onDestroy:function|null=, lazyOpen:boolean=, closeIcon:boolean=, cancelButtonClass:string=, animation:string=, animationSpeed:number=, confirm:function|null=, onContentReady:function|null=, onClose:function|null=, dragWindowGap:number=, size:string|*=, animationBounce:number=, animateFromElement:boolean=, disableWebScroll:boolean=}=} $options
     */
    this.form = function ($title, $content, $submit, $cancel, $options) {

        /**
         * Default variables
         */
        if (isNullUndf($options)) $options = {};
        if (isNullUndf($cancel)) $cancel = function () {
        };

        /**
         * If submit function is null
         */
        if (isNullUndf($submit)) {
            app_console.warn('Submit function cannot be null');
            $submit = function () {
            };
        }

        /**
         * Build parameters
         */
        let $defaults = {
            _type: $types.FORM,
            backgroundDismiss: false,
            backgroundDismissAnimation: '',
            cancelButtonClass: self.options.buttons.DEFAULT,
            cancelText: 'Cancelar',
            closeAfterSubmit: true,
            closeIcon: false,
            escapeCancelKey: false,
            submitButtonClass: self.options.buttons.BLUE,
            submitText: 'Enviar',
        };
        $options = $.extend($defaults, $options);

        /**
         * Dialog closes after send
         */
        if ($options['closeAfterSubmit']) {
            let $prevsubmit = $submit;
            $submit = function () {
                $prevsubmit();
                let $jc = this;
                $jc.close();
            };
        }

        $options['confirm'] = $submit;
        $options['cancel'] = $cancel;
        $options['confirmButtonClass'] = $options['submitButtonClass'];
        $options['confirmText'] = $options['submitText'];
        delete $options['submitButtonClass'];
        delete $options['submitText'];

        /**
         * onContentReady function
         */
        let $contentReady = function () {
        };
        if (notNullUndf($options['onContentReady']) && $options['onContentReady'] instanceof Function) {
            $contentReady = $options['onContentReady'];
        }
        $options['onContentReady'] = function () {
            $contentReady();

            // Get content
            let $cnt = null;

            // Method 1, uses this
            let $jc = this;
            if (notNullUndf($jc) && $jc.hasOwnProperty('$content')) {
                $cnt = $jc.$content;
            }

            // Method 2, uses DOM
            if (isNullUndf($cnt)) {
                $cnt = app_dom.body.find('.jconfirm-content');
            }

            // If null returns
            if (isNullUndf($cnt)) return;
            // noinspection JSObjectNullOrUndefined,JSUnresolvedFunction
            let $form = $cnt.find('form');
            $form.onReplace(app_event.common.submit, function ($e) {
                $e.preventDefault();
                if (isNullUndf($jc)) return;
                try {
                    // noinspection JSUnresolvedVariable
                    $jc.$$confirm.trigger(app_event.common.click);
                } catch ($error) {
                    app_console.coreInfo($classname, 'form', 'Form does not have any click event');
                }
            });
        };

        /**
         * Create confirm dialog
         */
        self._createDialog($title, $content, $options);

    };

    /**
     * Creates a dialog.
     *
     * @param {string} $title
     * @param {string} $content
     * @param {{cancel:function|null=, disableSelect:boolean=, forceCursorDefault:boolean=, icon:string=, closeAnimation:string=, confirmText:string=, escapeCancelKey:boolean=, type:string=, typeAnimated:boolean=, watchInterval:number=, draggable:boolean=, onOpen:function|null=, cancelText:string|null=, backgroundDismissAnimation:string=, useBootstrap:boolean=, confirmButtonClass:string|*=, backgroundDismiss:string=, buttonMaxLength:number=, onOpenBefore:function|null=, onDestroy:function|null=, lazyOpen:boolean=, closeIcon:boolean=, cancelButtonClass:string=, animation:string=, animationSpeed:number=, confirm:function|null=, onContentReady:function|null=, onClose:function|null=, dragWindowGap:number=, size:string|*=, animationBounce:number=, animateFromElement:boolean=, disableWebScroll:boolean=}} $options
     * @private
     */
    this._createDialog = function ($title, $content, $options) {

        /**
         * If close last
         */
        if (self._close_last) self.closeLast();

        /**
         * Creation dialogs build parameters
         */
        let __$defaults = {
            _type: $types.DIALOG,                   // Inner type
            animateFromElement: false,              // Animates from element
            animation: self.options.animation.ZOOM, // Open animation
            animationBounce: 1,                     // 1,0 enables bounce
            animationSpeed: 400,                    // Animation speed
            backgroundDismiss: 'cancel',            // Click outside popup
            backgroundDismissAnimation: 'shake',    // Background dismiss animation
            buttonMaxLength: 30,                    // Max button length
            cancel: null,                           // Function if cancel
            cancelButtonClass: self.options.buttons.DEFAULT, // Cancel button class
            cancelText: 'No',                       // Cancel text
            closeAnimation: self.options.animation.ZOOM, // Close animation
            closeIcon: true,                        // Close icon
            confirm: null,                          // Confirm function
            confirmButtonClass: self.options.buttons.BLUE, // Confirm button style
            confirmText: 'Si',                      // Confirm text
            disableSelect: false,                   // Disables text select
            disableWebScroll: true,                 // Disables web scrolling
            draggable: false,                       // Popup can be dragged
            dragWindowGap: 0,                       // Border between window and popup
            escapeCancelKey: true,                  // Escape button event
            forceCursorDefault: false,              // Force cursor focus
            icon: self.options.icons.DEFAULT,       // Title icon
            lazyOpen: false,                        // If true opens .open_last()
            onClose: null,                          // Triggered after close popup
            onContentReady: null,                   // Triggered after content is ready
            onDestroy: null,                        // Triggered after destroy popup
            onOpen: null,                           // Triggered after open popup
            onOpenBefore: null,                     // Triggered before open popup
            size: self.options.size.NORMAL,         // Popup size
            type: self.options.type.DEFAULT,        // Popup animation
            typeAnimated: false,                    // Animates or not
            useBootstrap: false,                    // Use boostrap
            watchInterval: 100,                     // Watch events interval (ms)
        };

        /**
         * Extends default parameters
         */
        $options = $.extend(__$defaults, $options);

        /**
         * Updates params
         */
        if ($options.escapeCancelKey) {
            // noinspection JSUndefinedPropertyAssignment
            $options.escapeKey = true;
            // noinspection JSValidateTypes
            $options.escapeCancelKey = 'cancel';
        }
        if (!$options.typeAnimated) delete $options['type'];
        if (isNullUndf($options.icon)) $options.icon = self.options.icons.DEFAULT;

        /**
         * Deletes dangerous variables
         */
        if ($options.hasOwnProperty('close')) delete $options['close'];
        if ($options.hasOwnProperty('open')) delete $options['open'];

        /**
         * Apply other configurations
         */
        $options['theme'] = cfg_popup_theme;

        /**
         * Create buttons
         */
        let $button = {};

        // Confirm
        if (notNullUndf($options.confirmText) && $options.confirmText !== '') {
            $options.confirmText = $options.confirmText.toString();
            if ($options.confirmText.length > $options.buttonMaxLength) {
                $options.confirmText = $options.confirmText.substring(0, $options.buttonMaxLength - 3) + '&hellip;';
            }
            if (notNullUndf($options.confirm) && !($options.confirm instanceof Function)) {
                app_console.warn('Cant associate an invalid event to the dialog button ({0}), null function has been established'.format($options.confirmText.toUpperCase()));
                $options.confirm = null;
            }
            $button['confirm'] = {
                action: $options.confirm,
                btnClass: $options.confirmButtonClass,
                // keys: $options['_type'] !== $types.FORM ? ['y', 'enter'] : ['enter'],
                text: $options.confirmText,
            };
        }
        // Cancel
        if (notNullUndf($options.cancelText) && $options.cancelText !== '') {
            $options.cancelText = $options.cancelText.toString();
            if ($options.cancelText.length > $options.buttonMaxLength) {
                $options.cancelText = $options.cancelText.substring(0, $options.buttonMaxLength - 3) + '&hellip;';
            }
            if (notNullUndf($options.cancel) && !($options.cancel instanceof Function)) {
                app_console.warn('Cant associate an invalid event to the dialog button ({0}), null function has been established'.format($options.cancelText.toUpperCase()));
                $options.cancel = null;
            }
            $button['cancel'] = {
                action: $options.cancel,
                btnClass: $options.cancelButtonClass,
                // keys: ['n'],
                text: $options.cancelText,
            };
        }

        // Save buttons
        $options['buttons'] = $button;

        /**
         * Set title and content
         */
        self._spinner = null; // Set spinner
        self._spinner_id = generateID();
        $content += '<div id="{0}"></div>'.format(self._spinner_id);
        if (notNullUndf($title) && $title !== '') $options['title'] = $title;
        if (notNullUndf($content) && $content !== '') $options['content'] = $content;

        /**
         * Set functions
         */
        if (isNullUndf($options['onClose']) || !($options['onClose'] instanceof Function)) {
            $options['onClose'] = function () {
            };
        }
        if (isNullUndf($options['onContentReady']) || !($options['onContentReady'] instanceof Function)) {
            $options['onContentReady'] = function () {
            };
        }
        if (isNullUndf($options['onDestroy']) || !($options['onDestroy'] instanceof Function)) {
            $options['onDestroy'] = function () {
            };
        }
        if (isNullUndf($options['onOpen']) || !($options['onOpen'] instanceof Function)) {
            $options['onOpen'] = function () {
            };
        }
        if (isNullUndf($options['onOpenBefore']) || !($options['onOpenBefore'] instanceof Function)) {
            $options['onOpenBefore'] = function () {
            };
        }

        /**
         * Creates functions before opening the dialog
         */
        let $prevOpenBeforeFnc = $options['onOpenBefore'];
        $options['onOpenBefore'] = function () {

            // Trigger original function
            try {
                $prevOpenBeforeFnc();
            } catch ($e) {
                NotificationJS.error($e.message);
            }

        };

        /**
         * On open
         */
        let $prevOnOpenFnc = $options['onOpen'];
        $options['onOpen'] = function () {

            // Trigger original function
            try {
                $prevOnOpenFnc();
            } catch ($e) {
                NotificationJS.error($e.message);
            }

        };

        /**
         * Creates functions once the content is ready
         */
        let $prevContentReadyFnc = $options['onContentReady'];
        $options['onContentReady'] = function () {

            // Trigger original function
            try {
                $prevContentReadyFnc();
            } catch ($e) {
                NotificationJS.error($e.message);
            }

            // Get jconfirm
            let $jconfirm = app_dom.body.find('.jconfirm-box');

            // Apply noselect
            if ($options.disableSelect) {
                $jconfirm.addClass('noselect');
            }

            // Apply default cursor
            if ($options.forceCursorDefault) {
                $jconfirm.addClass('jconfirm-default-cursor');
            }

            // Disable web scrolling (if enabled)
            if ($options.disableWebScroll && app_dom.body.height() > app_dom.window.height()) {
                setTimeout(function () {
                    // noinspection JSUnresolvedVariable
                    $.extScrollLock.enable('appdialog');
                }, 250);
            }

            // Set status
            self._opened = true;

        };

        /**
         * On close
         */
        let $prevOnCloseFnc = $options['onClose'];
        $options['onClose'] = function () {

            // Trigger original function
            try {
                $prevOnCloseFnc();
            } catch ($e) {
                NotificationJS.error($e.message);
            }

        };

        /**
         * Add function that sets last popup as destroyed
         */
        let $destroy = $options['onDestroy'];
        $options['onDestroy'] = function () {

            if ($options.disableWebScroll) {
                // noinspection JSUnresolvedVariable
                $.extScrollLock.disable('appdialog');
            }

            try {
                $destroy();
            } catch ($e) {
                NotificationJS.error($e.message);
            }

            // Update status
            self._opened = false;

        };

        /**
         * Set popup size
         */
        self._dialogSize($options);

        /**
         * Check md5
         */
        let $md5options = $.extend({}, $options);
        delete $md5options['boxWidth'];
        delete $md5options['size'];
        let $md5 = md5(JSON.stringify($options));

        /**
         * If last popup has the same md5 tne returns
         */
        // noinspection JSValidateTypes,JSUnresolvedFunction
        if (notNullUndf(self._last.object) && self._last.md5 === $md5 && !self._last.object.isClosed()) {
            app_console.info('The last dialog has been closed because the new one is identical');
            self.closeLast();
        }

        /**
         * Creates popup
         */
        let $confirm = $.confirm($options);
        app_console.info('Opening dialog <{0}>'.format($md5));

        /**
         * Remove buttons if exists
         */
        setTimeout(function () {

            let $conf_buttons = $confirm['buttons'];
            let $conf_buttons_k = Object.keys($conf_buttons);

            if (!Object.keys($button).includes('confirm')) {
                if ($conf_buttons_k.includes('ok')) {
                    $($conf_buttons['ok']['el']).remove();
                }
            }
            if (!Object.keys($button).includes('cancel')) {
                if ($conf_buttons_k.includes('close')) {
                    $($conf_buttons['close']['el']).remove();
                }
            }

        }, 15);

        /**
         * Saves last popup
         */
        self._last.md5 = $md5;
        self._last.options = $options;
        self._last.object = $confirm;

    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * Returns true if the dialog is opened.
     *
     * @returns {boolean}
     */
    this.isOpened = function () {

        return self._opened;

    };

    /**
     * Check dialog size.
     *
     * @param {Object} $options
     * @private
     */
    this._dialogSize = function ($options) {

        /**
         * Get page width
         * @type {number}
         */
        let $width = app_dom.window.outerWidth();

        switch ($options['size']) {
            case self.options.size.SMALL:
                if ($width <= 350) {
                    $options['boxWidth'] = '95%';
                } else if ($width <= 400) {
                    $options['boxWidth'] = '65%';
                } else if ($width <= 500) {
                    $options['boxWidth'] = '60%';
                } else if ($width <= 600) {
                    $options['boxWidth'] = '55%';
                } else if ($width <= 700) {
                    $options['boxWidth'] = '50%';
                } else if ($width <= 800) {
                    $options['boxWidth'] = '48%';
                } else if ($width <= 900) {
                    $options['boxWidth'] = '45%';
                } else if ($width <= 1000) {
                    $options['boxWidth'] = '42.5%';
                } else {
                    $options['boxWidth'] = '40%';
                }
                break;
            case self.options.size.NORMAL:
                if ($width <= 350) {
                    $options['boxWidth'] = '95%';
                } else if ($width <= 400) {
                    $options['boxWidth'] = '72%';
                } else if ($width <= 500) {
                    $options['boxWidth'] = '68%';
                } else if ($width <= 600) {
                    $options['boxWidth'] = '63%';
                } else if ($width <= 700) {
                    $options['boxWidth'] = '59%';
                } else if ($width <= 800) {
                    $options['boxWidth'] = '57%';
                } else if ($width <= 900) {
                    $options['boxWidth'] = '55%';
                } else if ($width <= 1000) {
                    $options['boxWidth'] = '52.5%';
                } else {
                    $options['boxWidth'] = '50%';
                }
                break;
            case self.options.size.LARGE:
                if ($width <= 350) {
                    $options['boxWidth'] = '95%';
                } else if ($width <= 400) {
                    $options['boxWidth'] = '90%';
                } else if ($width <= 500) {
                    $options['boxWidth'] = '85%';
                } else if ($width <= 600) {
                    $options['boxWidth'] = '80%';
                } else if ($width <= 700) {
                    $options['boxWidth'] = '75%';
                } else if ($width <= 800) {
                    $options['boxWidth'] = '70%';
                } else if ($width <= 900) {
                    $options['boxWidth'] = '65%';
                } else if ($width <= 1000) {
                    $options['boxWidth'] = '62.5%';
                } else {
                    $options['boxWidth'] = '60%';
                }
                break;
            case self.options.size.FULL:
                $options['boxWidth'] = '95%';
                break;
            default:
                app_console.warn('Cannot open dialog with unknown size <{0}>'.format($options['size']));
                $options['useBootstrap'] = true;
                delete $options['size'];
                break;
        }

    };

    /**
     * Show load spinner.
     */
    this.showSpinner = function () {

        if (self._spinner_id === '') return;
        let $spinner = $('#' + self._spinner_id);
        if (isNullUndf(self._spinner)) {
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
            self._spinner = new Spinner($opts).spin(document.getElementById(self._spinner_id));
        } else {
            self._spinner.spin(document.getElementById(self._spinner_id));
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
        let $spinner = $('#' + self._spinner_id);
        if ($spinner.length !== 0) { // noinspection JSValidateTypes
            $spinner.fadeOut(200);
        }

    };

    /**
     * Close last dialog.
     */
    this.closeLast = function () {

        try {
            if (notNullUndf(self._last.object)) self._last.object.close();
        } catch ($e) {
        }

    };

    /**
     * Open last dialog.
     */
    this.openLast = function () {

        app_console.coreInfo($classname, 'openLast', 'Opening last dialog');
        if (notNullUndf(self._last.object)) self._last.object.open();

    };

    /**
     * Enable close last after opening a new dialog.
     */
    this.enableCloseLast = function () {

        self._close_last = true;

    };

}

/**
 * Dialog administrator
 * @type {__UI_Dialog}
 * @const
 */
const app_dialog = new __UI_Dialog();
app_dialog.enableCloseLast();