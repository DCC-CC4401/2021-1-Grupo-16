/**
 HEADER
 Header component.
 */
"use strict";

/**
 * Header component.
 *
 * @class
 * @extends {Component}
 */
function HeaderComponent() {

    Component.call(this);

    /**
     * Gets the header component
     * @type {jQuery}
     */
    let header = $('#header-component');

    /**
     * Object pointer
     * @type {HeaderComponent}
     */
    let self = this;

    /**
     * Stores the header pointer
     * @type {string}
     * @private
     */
    this._title = '';

    /**
     * Middle header contains search and other objects
     * @type {boolean}
     * @private
     */
    this._show_middle = false;

    /**
     * Tools object DOM which includes the container
     * @type {*|Window.django.jQuery|HTMLElement}
     * @private
     */
    this._tools_dom = null;

    /**
     * Number of pixels where tools collapse
     * @type {number}
     */
    this.tools_popup_pixels_threshold = 640;

    // noinspection JSUnusedGlobalSymbols
    /**
     * Show middle.
     */
    this.showMiddle = function () {
        self._show_middle = true;
    };

    /**
     * Popup close status
     * @type {boolean}
     * @private
     */
    this._popup_closed = true;

    /**
     * Callbacks after popup
     * @type {{}}
     * @private
     */
    this._popup_close_callbacks = {};

    /**
     * Set app title.
     *
     * @param {string} $title
     */
    this.setTitle = function ($title) {
        self._title = $title;
    };

    /**
     * Return the header height.
     *
     * @returns {number}
     */
    this.getHeight = function () {
        return header.actual('outerHeight');
    };

    /**
     * This method looks for the tools div. If collapses into a multiline-object
     * it creates a popup.
     *
     * @private
     */
    this._runToolsWithListener = function () {
        app_dom.window.on('resize.PopUpThreadListener', self._toolsPopupThread);
        self._toolsPopupThread();
        setTimeout(self._toolsPopupThread, 200);
    };

    /**
     * Creates the tool into a floating popup.
     * TODO: Mejorar esto, tiene algunos casos de borde.
     *
     * @private
     */
    this._toolsPopupThread = function () {

        // if (app_dom.window.width() > self.tools_popup_pixels_threshold) return;
        let $tool_container = $('#header-tool-container');
        let $tool_button = $('#header-tool-container-button');

        // $tool_container.show();
        $tool_container.appendTo(self._tools_dom);
        let $force = false;

        if (self._tools_dom.actual('height') > convertRemToPixels(3)
            || $force
            || app_dom.window.width() < self.tools_popup_pixels_threshold) {
            // Collapsed into an icon
            $tool_container.appendTo(app_dom.body);
            $tool_container.addClass('header-tools-popup');
            $tool_button.show();
            if (self._popup_closed) {
                $tool_container.hide();
            }
        } else {
            $tool_container.removeClass('header-tools-popup');
            $tool_button.hide();
            $tool_container.show();
        }

    };

    /**
     * Toggles popup status.
     *
     * @private
     */
    this._toggleToolsPopup = function () {
        let $tool_container = $('#header-tool-container');
        if (!$tool_container.hasClass('header-tools-popup')) return;
        if (self._popup_closed) {
            $tool_container.show();
        } else {
            $tool_container.hide();
        }
        self._popup_closed = !self._popup_closed;
    };

    /**
     * The element parameter triggers toggle popup close if clicked.
     *
     * @param {jQuery} $element - Element to click
     */
    this.registerToolPopupCloseElement = function ($element) {
        $element.on('click.HeaderToolPopupClose', () => {
            if (!(self._popup_closed)) self._toggleToolsPopup();
        });
    };

    /**
     * Inits the header.
     */
    this.init = function () {
        app_console.info('Initializing header component');

        header.find('#header-title').html(self._title);
        self._tools_dom = $('#header-tools');
        if (!self._show_middle) {
            header.find('#header-middle').hide();
            header.find('#header-title').removeClass('col-5').addClass('col-7');
        }

        // Raises listener for the tools, if multiline creates a popup
        self._runToolsWithListener();
        let $toggle_popup_button = $('#header-tool-container-button');
        app_ui_utils.initTooltipster($toggle_popup_button, 'Open Menu', {delay: 1000});
        $toggle_popup_button.on('click', self._toggleToolsPopup);
    };

}