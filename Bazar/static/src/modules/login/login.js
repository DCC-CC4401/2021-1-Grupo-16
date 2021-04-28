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

    this.centerLoginBox = function () {

        let $box = $('#login-box');
        // let $parent = $box.parent();
        let $parent = app_dom.window;
        $box.css('margin-top', Math.max(25, ($parent.height() - $box.height()) / 2 - 50));
        $box.fadeTo('slow', 1);

    };

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

        // Center the login box
        setTimeout(self.centerLoginBox, 250);
        setTimeout(function () {

        }, 300);

    };

}

app_module.registerModule('login', new LoginModule());