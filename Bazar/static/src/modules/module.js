/**
 * MODULE
 * Basic module class.
 */
"use strict";

function Module() {

    /**
     * Object pointer
     * @type {Module}
     */
    let self = this;

    /**
     * This function inits the module.
     * @abstract
     */
    this.init = function () {
    };

}