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
    let header = $('.header-component');

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
     * Inits the header.
     */
    this.init = function () {
        app_console.info('Initializing header component');
        header.find('.header-title').html(self._title);
    };

}