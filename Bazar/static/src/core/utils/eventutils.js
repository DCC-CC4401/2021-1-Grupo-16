/**
 EVENTUTILS
 Utility event handling.
 */
"use strict";

/**
 * Application events
 * @const
 * @global
 */
const app_event = {
    common: {
        appFormFocus: 'focus.appform',
        appFormValidate: 'change.appform.validate',
        blur: 'blur',
        change: 'change',
        changeSelector: 'change.selector',
        click: 'click',
        clickTouchstart: 'click touchstart',
        contextmenu: 'contextmenu',
        focus: 'focus',
        keydown: 'keydown',
        keypress: 'keypress',
        keyup: 'keyup',
        mousedown: 'mousedown',
        mouseout: 'mouseout',
        mouseover: 'mouseover',
        mouseup: 'mouseup',
        paste: 'paste',
        reset: 'reset',
        resize: 'resize',
        submit: 'submit',
    },
    target: {
        resize: {
            centerLeanmodal: 'resize.centerLeanModal',
            errorMessage: 'resize.errorMessage',
            errorPanel: 'resize.errorPanel',
            loadingLayer: 'resize.FullPageLoadingDivLayer',
            rootFit: 'resize.rootAutoFit',
        },
    },
};

/**
 * Disable scroll.
 *
 * @this {app_event}
 * @param {object} $e - Scrollwheel event
 */
app_event.stopWheelEvent = function ($e) {

    if (!$e) { // noinspection JSDeprecatedSymbols
        $e = window.event;
    } // IE7, IE8, Chrome, Safari
    if ($e.preventDefault) $e.preventDefault(); // Chrome, Safari, Firefox
    $e.returnValue = false; // IE7, IE8

};