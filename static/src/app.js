/**
 APP
 Init application.
 */
"use strict";

/**
 * Import all libraries
 */
app_library_manager.importAllLibraries();

/**
 * App init
 */
$(function () {

    /**
     * ------------------------------------------------------------------------
     * Show about information
     * ------------------------------------------------------------------------
     */
    app_about.aboutInfo();
    app_console.info('Application has been initialized in {0} seconds'.format(Date.getSecondsFrom(app_load_time)));

    /**
     * ------------------------------------------------------------------------
     * Load cookies
     * ------------------------------------------------------------------------
     */
    app_session.loadSessionCookie();
    if (!app_session.isValidData()) {
        app_console.error('Cookies cannot be loaded', false, true);
        return;
    }
    app_session.updateSessionCookie();

    /**
     * --------------------------------------------------------------------
     * Init libraries
     * --------------------------------------------------------------------
     */
    app_library_manager.setAppInitialized();
    app_library_manager.disableHoldReady();
    app_library_manager.getImportedLibraries(cfg_verbose);
    NotificationJS.init({
        'core': cfg_notification_core,
        'enabled': cfg_notification_enabled,
        'exceptionTitle': 'Exception',
        'maxStack': cfg_max_notification_stack,
        'timeout': cfg_notification_timeout,
    });

    /**
     * --------------------------------------------------------------------
     * Init UI
     * --------------------------------------------------------------------
     */
    try {
        initThemes();
        applyTheme();
    } catch ($e) {
        app_console.exception($e);
        app_error.errorMessage('Theme failed to initialize');
        return;
    } finally {
    }

    // Init ui
    // app_loading_layer.start();
    app_ui_utils.init();

    // Load cart items
    app_cart.load();

    /**
     * --------------------------------------------------------------------
     * Init module
     * --------------------------------------------------------------------
     */
    afterLoadImports();
    app_module.init(() => {
        setTimeout(function () {
            app_dom.body.css({
                'display': 'block',
                'overflow-y': 'auto'
            });
        }, 150);
    });

});