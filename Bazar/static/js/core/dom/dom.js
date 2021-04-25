/**
 DOM
 Dom auxiliary functions.
 */
"use strict";

/**
 * Get DOM objects
 * @type {{footer:jQuery, document:jQuery, leancontent:jQuery, body:jQuery, menu:jQuery, content:jQuery, leancontainer:jQuery, head:jQuery, menubutton:jQuery, leanoverlay:jQuery, root:jQuery, header:jQuery, html:jQuery, window:jQuery, leanmodal:*}}
 * @const
 * @global
 */
const app_dom = {
    body: $(),
    document: $(document),
    footer: $(),
    head: $(),
    html: $(),
    leancontainer: $(),
    leancontent: $(),
    leanmodal: $(),
    leanoverlay: $(),
    window: $(window),
};

/**
 * Load the data after initialization
 */
$(function () {

    app_dom.body = $('body');
    app_dom.head = $('head');
    app_dom.html = $('html');
    app_dom.leancontainer = $('#leanmodal-ct');
    app_dom.leancontent = $('#leanmodal-contents');
    app_dom.leanmodal = $('#leanmodal');
    app_dom.leanoverlay = $('#lean-overlay');

});