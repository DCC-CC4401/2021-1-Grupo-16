/**
 HOME
 Home module.
 */
"use strict";

/**
 * User profile module.
 *
 * @class
 * @extends {Module}
 */
function UserProfileModule() {

    Module.call(this);

    /**
     * Object pointer
     * @type {UserProfileModule}
     */
    let self = this;

    /**
     * Stores the menu container object
     * @type {jQuery}
     * @private
     */
    this._menu_container = null;

    /**
     * Stores the profile container
     * @type {jQuery}
     * @private
     */
    this._profile_container = null;

    /**
     * Top menu fix position.
     * @type {number}
     * @private
     */
    this._menu_fix_offset_top = 0;

    /**
     * Inits the menu object.
     *
     * @private
     */
    this._initMenu = function () {

        let $menu_left_col = $('#menu-left-container');

        // Toggles menu abbreviated
        let $toggle_name_abbv = () => {
            if (app_dom.window.width() < 1050) {
                self._menu_container.find('.menu-header-title.name-full').hide();
                self._menu_container.find('.menu-header-title.name-abbv').show();
            } else {
                self._menu_container.find('.menu-header-title.name-full').show();
                self._menu_container.find('.menu-header-title.name-abbv').hide();
            }
        };
        $toggle_name_abbv();
        app_dom.window.on('resize.toggleUserNameAbbv', $toggle_name_abbv);

        // Toggle icon/span
        let $toggle_icons = () => {
            if (app_dom.window.width() < 550) {
                self._menu_container.find('.menu-item i').each(function () {
                    $(this).show();
                });
                self._menu_container.find('.menu-item span').each(function () {
                    $(this).hide();
                });
            } else {
                self._menu_container.find('.menu-item i').each(function () {
                    $(this).hide();
                });
                self._menu_container.find('.menu-item span').each(function () {
                    $(this).show();
                });
            }
        }
        $toggle_icons();
        app_dom.window.on('resize.toggleMenuIcons', $toggle_icons);

        // Fix the menu
        let $fix_menu = self._menu_container;
        self._menu_fix_offset_top = $fix_menu.offset().top;
        // let $fix_menu_top = $fix_menu.offset().top; // get initial position of the element

        app_dom.window.on('resize.adjustProfileMenu', function () {
            self._menu_container.css('width', $menu_left_col.width());
        });

        app_dom.window.on('scroll.centerProfileMenu', function () { // assign scroll event listener
            if (self._menu_fix_offset_top === 0) self._menu_fix_offset_top = $fix_menu.offset().top;
            let $current_scroll = $(window).scrollTop(); // get current position

            if ($current_scroll >= self._menu_fix_offset_top) { // apply position: fixed if you
                let $margin = $menu_left_col.outerHeight() - $fix_menu.outerHeight() -
                    $current_scroll + $('#menu-left-container').offset().top;
                if ($margin > 0) $margin = 0;
                $fix_menu.css({ // scroll to that element or below it
                    position: 'fixed',
                    top: $margin,
                    left: '0',
                    width: $menu_left_col.width()
                });
            } else { // apply position: static
                $fix_menu.css({ // if you scroll above it
                    position: 'static'
                });
            }
        });

    };

    /**
     * Inits the module.
     */
    this.init = function () {
        app_console.info('Initializing user profile module');

        // Load DOM objects
        let $contents = $('#contents');
        self._menu_container = $('#profile-menu');
        self._profile_container = $('#profile-contents');

        // Scrolls to the top
        $(window).scrollTop(0);

        // Init header
        self.initBasicHeader('Bazar - Perfil de Usuario');
        self._header.registerToolPopupCloseElement($contents);

        self.initBasicFooter();

        // Update contents height to fit window height
        self.extendDivToMaxHeight($contents);
        self.extendDivToMaxHeight(self._profile_container);
        self.extendDivToMaxHeight(self._menu_container.parent().parent());

        // Init the menu
        self._initMenu();

    };

}

app_module.registerModule('user.profile', new UserProfileModule());