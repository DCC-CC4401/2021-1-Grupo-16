/**
 HEADER
 Header component
 */
"use strict";

/**
 * Header component.
 *
 * @class
 * @extends{Component}
 */
function Header() {
    Component.call(this);

    /**
     * Gets the header component.
     * @type {jQuery}
     */
    let header = $('.header-component');

    /**
     * Inits the header.
     */
    this.init = function () {
        app_console.info('Initializing header component');
    }

}