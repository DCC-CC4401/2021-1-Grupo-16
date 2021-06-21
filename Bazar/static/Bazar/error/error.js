/**
 ERROR
 Error module.
 */
"use strict";

/**
 * Error module.
 *
 * @class
 * @extends {Module}
 */
function ErrorModule() {

    Module.call(this);

    /**
     * Object pointer
     * @type {ErrorModule}
     */
    let self = this;

    /**
     * Inits the module.
     */
    this.init = function () {
        app_console.info('Initializing error module');

        // Load DOM objects
        let $contents = $('#contents');

        // Init header
        self.initBasicHeader('Error');
        self._header.registerToolPopupCloseElement($contents);

        // Init footer
        self.initBasicFooter();

        // Set the contents max height
        self.extendDivToMaxHeight($contents);

    };

}

app_module.registerModule('error', new ErrorModule());