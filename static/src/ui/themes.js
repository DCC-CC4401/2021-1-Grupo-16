/**
 THEMES
 Application themes.
 */
"use strict";

/**
 * Selected theme
 * @global
 */
let app_theme;

/**
 * Application themes
 * @private
 */
let __theme_db = {
    "default": {
        "backgroundColor": "#ffffff", // Background color of the application (#e3e7ed)
        "backToTopScrollPxTrigger": 300, // Trigger px of the button
        "backToTopShow": true, // Show back to top button
        "backToTopSize": 65, // Size of the button (px)
        "chartjsFontColor": "#000000", // Chart js font color
        "headerBgColor": "#e372ac", // Header background color
        "leanModalBackgroundBlur": 1.0, // Background blur in px (popup)
        "leanModalBackgroundColor": "#000000", // Leanmodal background color (popup)
        "leanModalBackgroundOpacity": 0.4, // Background opacity (popup)
        "leanModalFadeTime": 200, // Leanmodal fade time (popup)
        "leanModalHeaderBlur": 0, // Header background blur in px (popup)
        "paceTheme": "blue", // Pace theme
        "ripplerEffect": 300, // Duration of the rippler effect (ms)
        "ripplerEffectSize": 16, // Size of the effect
        "selectionColor": "#004fff", // Used by editor
        "spinColor": "#ffffff", // Spinner color
        "spinLines": 11, // Spinner number of lines
        "spinScale": 0.23, // Spinner scale
        "spinShadow": "0 0 1px transparent", // Loading spinner shadow
        "spinSpeed": 1.0, // Spinner velocity
        "themeEnabled": true, // Theme is available or not
        "themeName": "Modern", // Theme name
        "tooltipTheme": "tooltipster-borderless", // Tooltip themes
    },
    "random": {
        "themeEnabled": true,
        "themeName": "Random",
    },
};

/**
 * Autocomplete themes, used by @src/app.js.
 *
 * @returns {boolean}
 */
function initThemes() {

    try {
        app_console.info('Initializing themes');
        let $themes = Object.keys(__theme_db);
        let $mainkeys = Object.keys(__theme_db.default);
        let $theme, $key;

        /**
         * Check each theme and extend
         */
        for (let $i = 0; $i < $themes.length; $i += 1) {
            if ($themes[$i] === 'default') continue;
            $theme = __theme_db[$themes[$i]];
            if (isNullUndf($theme['themeName'])) {
                $theme['themeName'] = $themes[$i];
            }
            if (isNullUndf($theme['themeEnabled'])) {
                $theme['themeEnabled'] = false;
            }
            for (let $j = 0; $j < $mainkeys.length; $j += 1) {
                $key = $mainkeys[$j];
                if (isNullUndf($theme[$key])) {
                    $theme[$key] = __theme_db.default[$key];
                }
            }
        }

        /**
         * If random
         */
        $theme = __theme_db['random'];
        for (let $j = 0; $j < $mainkeys.length; $j += 1) {
            $key = $mainkeys[$j];
            /* eslint no-use-before-define:"off" */
            if (ColorLib.isColor($theme[$key])) {
                $theme[$key] = ColorLib.getRandomColor();
            }
        }

        if (Object.keys(__theme_db).indexOf(app_session.data.theme_app) !== -1) {
            app_theme = __theme_db[app_session.data.theme_app];
            cfg_app_theme = app_session.data.theme_app;
        } else {
            app_session.data.theme_app = cfg_app_theme;
            app_theme = __theme_db[app_session.data.theme_app];
            app_session.updateSessionCookie();
            app_error.errorMessage('Theme does not exist');
        }

        return true;
    } catch ($e) {
        app_console.exception($e, false);
    } finally {
    }
    return false;

}

/**
 * Apply the selected theme, used by @src/app.js.
 */
function applyTheme() {

    /**
     * ------------------------------------------------------------------------
     * Create dynamic tags
     * ------------------------------------------------------------------------
     */
    app_dom.head.append('<meta name="apple-mobile-web-app-capable" content="yes">');
    app_dom.head.append('<meta name="apple-mobile-web-app-status-bar-style" content="{0}">'.format(app_theme.headerBgColor));
    app_dom.head.append('<meta name="msapplication-navbutton-color" content="{0}">'.format(app_theme.headerBgColor));
    app_dom.head.append('<meta name="theme-color" content="{0}">'.format(app_theme.headerBgColor));

    app_dom.body.css('background-color', app_theme.backgroundColor);

    /**
     * ------------------------------------------------------------------------
     * Load theme CSS
     * ------------------------------------------------------------------------
     */
    switch (app_theme.tooltipTheme) {
        case 'tooltipster-borderless': // noinspection HtmlUnknownTarget
            app_dom.head.append('<link rel="stylesheet" type="text/css" href="/static/lib/tooltipster/themes/sideTip-borderless.min.css" media="screen">');
            break;
        case 'tooltipster-light': // noinspection HtmlUnknownTarget
            app_dom.head.append('<link rel="stylesheet" type="text/css" href="/static/lib/tooltipster/themes/sideTip-light.min.css" media="screen">');
            break;
        case 'tooltipster-noir': // noinspection HtmlUnknownTarget
            app_dom.head.append('<link rel="stylesheet" type="text/css" href="/static/lib/tooltipster/themes/sideTip-noir.min.css" media="screen">');
            break;
        case 'tooltipster-punk': // noinspection HtmlUnknownTarget
            app_dom.head.append('<link rel="stylesheet" type="text/css" href="/static/lib/tooltipster/themes/sideTip-punk.min.css" media="screen">');
            break;
        case 'tooltipster-shadow': // noinspection HtmlUnknownTarget
            app_dom.head.append('<link rel="stylesheet" type="text/css" href="/static/lib/tooltipster/themes/sideTip-shadow.min.css" media="screen">');
            break;
        default:
            app_console.warn('Error initializing the popup theme'); // noinspection HtmlUnknownTarget
            app_dom.head.append('<link rel="stylesheet" type="text/css" href="/static/lib/tooltipster/themes/sideTip-borderless.min.css" media="screen">');
            break;
    }

}