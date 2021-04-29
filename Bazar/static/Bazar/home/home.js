/**
 HOME
 Home module.
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
     * Search object
     * @type {HomeModuleSearchComponent}
     * @private
     */
    this._search = null;

    /**
     * Inits the module.
     */
    this.init = function () {
        app_console.info('Initializing home module');

        // Load DOM objects
        let $contents = $('#contents');

        // Init header
        self.initBasicHeader(self._bazar_main_title);
        self._header.registerToolPopupCloseElement($contents);

        self.initBasicFooter();

        // Update contents height to fit window height
        let $contents_height = self.extendDivToMaxHeight($contents);

        // Setup search object
        self._search = new HomeModuleSearchComponent();
        self._search.init($contents_height);

    };

}

app_module.registerModule('home', new HomeModule());