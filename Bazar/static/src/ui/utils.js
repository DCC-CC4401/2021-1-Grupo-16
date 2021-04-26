/**
 UTILS
 Utility UI functions.
 */
"use strict";

/**
 * UI utils class.
 *
 * @class
 * @private
 */
function __UI_Utils() {

    /**
     * Object pointer
     * @type {__UI_Utils}
     * @private
     */
    let self = this;

    /**
     * Adjust body min height to window height.
     */
    this.bodyAutoFitToHeight = function () {

        let $f = function () {
            app_dom.body.css('min-height', app_dom.window.height() * 0.95);
            // app_dom.body.css('background-color', theme.headerBgColor);
        };
        $f();
        app_dom.window.onReplace(app_event.target.resize.rootFit, $f);

    };

    /**
     * Init tooltipster into an object.
     *
     * @param {jQuery} $object - Object to edit
     * @param {string} $title - Tooltip title
     * @param {{animationDuration:number=, contentCloning:boolean=, side:string=, debug:boolean=, delay:number=, distance:number=, arrow:boolean=, contentAsHTML:boolean=, theme:string=, content:string=, animation:string=, maxWidth:null|number=, minWidth:number=, functionAfter:function=, functionBefore:function=, functionFormat:function=, functionInit:function=, functionPosition:function=, functionReady:function=, minIntersection:number=}=} $options
     */
    this.initTooltipster = function ($object, $title, $options) {

        let $defaults = {
            animation: 'fade', // fade, grow, swing, slide, fall
            animationDuration: 350,
            arrow: true, // Add a "speech bubble" arrow to the tooltip. Default: true
            content: '',
            contentAsHTML: true,
            contentCloning: false,
            debug: true,
            delay: 450,
            distance: 0,
            functionAfter: null, // A custom function to be fired once the tooltip has been closed and removed from the DOM
            functionBefore: null, // A custom function to be fired before the tooltip is opened
            functionFormat: null,
            functionInit: null, // A custom function to be fired only once at instantiation
            functionPosition: null,
            functionReady: null, // A custom function to be fired when the tooltip and its contents have been added to the DOM
            maxWidth: null,
            minIntersection: 16, // Corresponds to the minimum distance to enforce between the center of the arrow and the edges of the tooltip
            minWidth: 0,
            side: 'bottom', // top, bottom, left, right
            theme: app_theme.tooltipTheme,
        };
        let $opt = $.extend($defaults, $options);
        $opt.content = $title;
        $object.tooltipster($opt);

    };

    /**
     * Init application.
     */
    this.init = function () {

        // Defaults calls
        self.bodyAutoFitToHeight();

        // noinspection JSUnusedLocalSymbols
        app_dom.body.on(app_event.common.contextmenu, function ($e) { // Disable basic events
            // $e.preventDefault();
        });

    };

}

/**
 * Converts rem to pixels.
 *
 * @param {number} rem - Number of rems
 * @returns {number} - Pixels
 */
function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

/**
 * Application ui utils
 * @type {__UI_Utils}
 * @const
 * @global
 */
const app_ui_utils = new __UI_Utils();