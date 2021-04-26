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
     * Creates header component
     * @type {HeaderComponent}
     * @private
     */
    this._header = null;

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
        self._header = new HeaderComponent();
        self._header.setTitle('Bazar');
        self._header.init();
        self._header.registerToolPopupCloseElement($contents);

        // Init footer
        let $footer = new FooterComponent();
        $footer.init();

        // Update contents height to fit window height
        let $contents_height = app_dom.window.outerHeight() - self._header.getHeight();
        $contents.css('min-height', $contents_height);

        // Setup search object
        self._search = new HomeModuleSearchComponent();
        self._search.init($contents_height);

    }

}

app_module.registerModule('name', new HomeModule());