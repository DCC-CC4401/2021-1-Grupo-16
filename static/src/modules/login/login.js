/**
 LOGIN
 Login module.
 */
"use strict";

/**
 * Login module.
 *
 * @class
 * @extends {Module}
 */
function LoginModule() {

    Module.call(this);

    /**
     * Object pointer
     * @type {LoginModule}
     */
    let self = this;

    /**
     * Inits the module.
     */
    this.init = function () {
        app_console.info('Initializing login module');

        // Load DOM objects
        let $contents = $('#contents');

        // Init header
        self.initBasicHeader('Login');
        self._header.registerToolPopupCloseElement($contents);

        // Init footer
        self.initBasicFooter();

        // Set the contents max height
        self.extendDivToMaxHeight($contents);

    };

}

app_module.registerModule('login', new LoginModule());