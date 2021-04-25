/**
 HOME
 Home module
 */
"use strict";

/**
 * Home module.
 *
 * @class
 * @extends {Module}
 */
function HomeModule() {

    Module.call(this);

    /**
     * Object pointer
     * @type {HomeModule}
     */
    let self = this;

    /**
     * Creates header component
     * @type {HeaderComponent}
     * @private
     */
    this._header = null;

    /**
     * Inits the module.
     */
    this.init = function () {
        app_console.info('Initializing home module');

        // Init header
        self._header = new HeaderComponent();
        self._header.setTitle('Bazar');
        self._header.init();
    }

}

app_module.registerModule('name', new HomeModule());