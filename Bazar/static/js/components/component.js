/**
 * COMPONENT
 * Basic component class.
 */
"use strict";

function Component() {

    /**
     * Object pointer
     * @type {Component}
     */
    let self = this;

    /**
     * This function inits the component.
     * @abstract
     */
    this.init = function () {
    };

}