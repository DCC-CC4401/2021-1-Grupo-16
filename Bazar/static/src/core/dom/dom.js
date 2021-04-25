/**
 DOM
 Dom auxiliary functions.
 */
"use strict";

/**
 * Get DOM objects
 * @type {{document:jQuery, leancontent:jQuery, body:jQuery, leancontainer:jQuery, head:jQuery, leanoverlay:jQuery, html:jQuery, window:jQuery, leanmodal:*}}
 * @const
 * @global
 */
const app_dom = {
    body: $(),
    document: $(document),
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