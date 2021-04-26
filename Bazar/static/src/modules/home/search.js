/**
 SEARCH
 Home search.
 */
"use strict";

/**
 * Search component.
 *
 * @constructor
 */
function HomeModuleSearchComponent() {

    /**
     * Stores the pointer
     * @type {HomeModuleSearchComponent}
     */
    let self = this;

    /**
     * Stores the search input item
     * @type {jQuery}
     * @private
     */
    this._search_input = null;

    /**
     * Box that contains the search tools
     * @type {jQuery}
     * @private
     */
    this._search_box = null;

    /**
     * Contents height
     * @type {number}
     * @private
     */
    this._contents_initial_height = 0;

    /**
     * Input hover color if user has the context.
     *
     * @private
     */
    this._setInputHoverBgColor = function () {
        let $search_box = $('#search-input-box');
        self._search_input.on('focus', () => {
            $search_box.addClass('search-input-focus');
            $search_box.removeClass('search-input-blur');
        });
        self._search_input.on('blur', () => {
            $search_box.addClass('search-input-blur');
            $search_box.removeClass('search-input-focus');
        });
    };

    /**
     * Init the search box.
     *
     * @param {number} $contents_height - Height content object
     */
    this.init = function ($contents_height) {

        // Store the contents height
        self._contents_initial_height = $contents_height;

        // Store basic DOM objectss
        self._search_box = $('#search-box');
        self._search_input = $('#search-input-text');

        // Update box margin
        self._search_box.css('margin-top', $contents_height * 0.25);

        // Set hover event
        self._setInputHoverBgColor();

    };

}