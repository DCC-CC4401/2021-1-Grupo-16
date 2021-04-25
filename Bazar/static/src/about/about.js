/**
 ABOUT
 About software.
 */

/**
 * Class application about info.
 *
 * @class
 */
function AppAboutInfo() {

    /**
     * Product license
     * @type {string}
     */
    this.license = 'Private';

    /**
     * Product name
     * @type {string}
     */
    this.productname = 'Bazar';

    /**
     * Product website
     * @type {string}
     */
    this.productwebsite = 'http://127.0.0.1:8000/home/';

}

/**
 * Application info
 * @global
 * @const
 */
const app_about = new AppAboutInfo();

/**
 * Display information in console.
 *
 * @this {AppAboutInfo}
 */
app_about.aboutInfo = function () {

    app_about.v.hash = md5(app_about.v.date + app_about.v.version);
    app_about.v.hash = app_about.v.hash.substring(0, 7);

    console.log('{0} v{1} ({2})'.format(app_about.productname, app_about.v.version, Date.dateFormat(new Date(app_about.v.date), cfg_date_format_public_d), app_about.v.hash));
    console.log('{0}'.format(app_about.productwebsite));
    console.log('{0} | {1}'.format(app_about.author.name, app_about.author.website));
    console.log(' ');

};