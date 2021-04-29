/**
 SIGN UP
 signup module.
 */
"use strict";

/**
 * signup module.
 *
 * @class
 * @extends {Module}
 */
function SignUpModule() {

    Module.call(this);

    /**
     * Object pointer
     * @type {SignUpModule}
     */
    let self = this;

    /**
     * Inits the module.
     */
    this.init = function () {
        app_console.info('Initializing signup module');

        // Load DOM objects
        let $contents = $('#contents');

        // Init header
        self.initBasicHeader('Sign Up');
        self._header.registerToolPopupCloseElement($contents);

        // Init footer
        self.initBasicFooter();

        // Set the contents max height
        self.extendDivToMaxHeight($contents);

        // Inits the dates
        initDatesFormBirthDate();

    };

}

app_module.registerModule('signup', new SignUpModule());