/**
 FOOTER
 Footer component.
 */
"use strict";

/**
 * Footer component.
 *
 * @class
 * @extends {Component}
 */
function FooterComponent() {

    Component.call(this);

    /**
     * Inits the footer.
     */
    this.init = function () {
        app_console.info('Initializing footer component');
        $('#footer .footer-version').html('Version {0} ({1})'.format(app_about.v.version, app_about.v.hash));
    };

}