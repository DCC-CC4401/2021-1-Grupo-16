/**
 * COMPONENT
 * Basic component class.
 */
"use strict";

/**
 * Component class, components are common objects through several modules.
 *
 * @constructor
 * @abstract
 */
function Component() {

    // noinspection JSUnusedLocalSymbols
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