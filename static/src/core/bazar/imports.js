/**
 CORE IMPORTS
 Library imports.
 */
"use strict";

/**
 * Library admin.
 *
 * @class
 * @private
 */
function __CORE_LibraryManager() {

    /**
     * Object pointer
     * @type {__CORE_LibraryManager}
     * @private
     */
    let self = this;

    /**
     * Name of class
     * @type {string}
     * @private
     */
    let $classname = 'app_library_manager';

    /**
     * Manager libraries
     * @public
     */
    this.lib = {
        __LANG__: 'app_lang',
        AMARANJS: 'amaranJS',
        ANIMATE: 'animateCSS',
        ASRANGE: 'asRange',
        BACKTOTOP: 'jquery-backToTop',
        BOOTSTRAP: 'bootstrap',
        BOOTSTRAPAUTOCOMPLETE: 'bootstrap-autocomplete',
        BOOTSTRAPJS: 'bootstrap-js',
        BOOTSTRAPTABLE: 'bootstrap-table',
        BOOTSTRAPTABLESTICKYHEADER: 'bootstrap-table-sticky-header',
        BOWSER: 'bowser',
        BPASSWDTOGGLER: 'bootstrap-password-toggler',
        CHARTJS: 'Chartjs',
        CONTEXTMENU: 'contextMenu',
        D3: 'd3',
        DATATABLES: 'dataTables',
        DATATABLESBT4: 'dataTables.bootstrap4',
        DATEPICKER: 'datepicker',
        DATGUI: 'dat.gui',
        FILESAVERJS: 'filesaver.js',
        FONTAWESOME: 'fontAwesome',
        FORMVALIDATOR: 'formvalidator',
        GLTFEXPORTER: 'threejs-GLTFExporter',
        GOJS: 'gojs',
        GOJS_BUTTONS: 'gojs.buttons',
        GOJS_COMMANDHANDLER: 'gojs.commandhandler',
        GOJS_DEBUGINSPECTOR: 'gojs.debuginspector',
        GOJS_DIMENSIONINGLINK: 'gojs.dimensioninglink',
        GOJS_DRAGGINGTOOL: 'gojs.draggingtool',
        GOJS_OVERVIEWRESIZING: 'gojs.overviewresizingtool',
        HAMMER: 'hammer', // used by mmenu
        HOVERCSS: 'hover.css',
        HULL: 'hull.js',
        IONRANGESLIDER: 'ion.rangeSlider',
        JQUERYACTUAL: 'jquery.actual',
        JQUERYCONFIRM: 'jquery-confirm',
        JQUERYNICESCROLL: 'jquery.nicescroll',
        JQUERYRESIZABLE: 'jquery-resizable',
        JQUERYSCROLLTO: 'jquery.scrollTo',
        JQUERYTIMEAGO: 'jquery-timeago',
        JQUERYTOAST: 'jquery.toast',
        JQUERYTRANSIT: 'jquery.transit',
        JSTREE: 'jstree',
        MBURGER: 'mburger',
        MD5: 'md5',
        MENTIONSINPUT: 'jquery-mentions-input',
        MMENU: 'mmenu8',
        MOUSEWHEEL: 'jquery.mousewheel',
        MTABS: 'mtabs',
        MULTISELECT: 'multiselect',
        NORMALIZE: 'normalize.css',
        NOTIFICATIONJS: 'notification.js',
        OBJEXPORTER: 'threejs-OBJExporter',
        ORBITCONTROLS: 'Orbitcontrols',
        PICKACOLOR: 'pick-a-color',
        PLOTLY: 'plotly',
        POPPER: 'popper',
        RIPPLER: 'rippler',
        SCROLLLOCK: 'jquery-scrollLock',
        SELECT2: 'select2',
        SHA1: 'sha1',
        SIMPLEPAGINATION: 'simplePagination',
        SPECTRUM: 'spectrum',
        SPIN: 'spin',
        STATS: 'stats',
        THREEJS: 'threejs',
        TINYCOLOR: 'tinycolor',
        TINYMCE: 'tinyMCE',
        TJSPROJECTOR: 'threejs-projector',
        TOASTR: 'toastr',
        TOOLTIPSTER: 'tooltipster',
        TWBSPAGINATION: 'twbs-pagination',
        UIPOSITION: 'jquery.ui.position',
        UNDERSCORE: 'underscore',
        VALIDATORJS: 'validator.js',
    };

    /**
     * Enables ajax cache
     */
    $.ajaxSetup({
        cache: true,
    });

    /**
     * Store imported libraries
     * @type {{}}
     * @private
     */
    this._imported_libraries = {};

    /**
     * Store imported libraries
     * @example
     *     'libraryName1': false,       // Not loaded library
     *     'libraryName2': true,        // Loaded library
     *     'libraryName3': true         // Loaded library
     * @private
     */
    this._import_lib_queue = [];

    /**
     * Default bootstrap js library
     * @type {string}
     * @private
     */
    this._jsbootstrap = '/static/lib/__init__.js';

    /**
     * Enabls holdReady status
     * @type {boolean}
     * @private
     */
    this._hold_ready = false;

    /**
     * Init load time
     * @private
     */
    this._start_time = null;

    /**
     * Library time execution
     * @private
     */
    this._import_time = {};

    /**
     * Libraries that failed to load
     * @private
     */
    this._error_load_libs = {};

    /**
     * Query load time
     * @type {number}
     * @private
     */
    this._query_time = 0.0;

    /**
     * Application is initialized
     * @type {boolean}
     * @private
     */
    this._initapp = false;

    /**
     * Path of the files
     * @type {string}
     * @private
     */
    this._path = '';

    /**
     * Map that contain the data of each thread that waits the load of the library
     * @private
     */
    this._waiting_thread_data = {};

    // noinspection JSUnusedGlobalSymbols
    /**
     * Set the path of imports.
     *
     * @param {string} $path
     */
    this.setPath = function ($path) {

        self._path = $path;

    };

    /**
     * Set application as initialized.
     */
    this.setAppInitialized = function () {

        self._initapp = true;

    };

    /**
     * Disable application holdready.
     */
    this.disableHoldReady = function () {

        if (self._hold_ready) {
            // noinspection JSDeprecatedSymbols
            $.holdReady(false);
        }
        self._hold_ready = false;

    };

    /**
     * Returns a string with loaded libraries.
     *
     * @param {boolean} $log - Console logging
     * @returns {string} - Loaded libraries
     */
    this.getImportedLibraries = function ($log) {

        // Get imported libraries
        let $k = Object.keys(self._imported_libraries);
        let $imp = '';
        for (let $i = 0; $i < $k.length; $i += 1) {
            if (self._imported_libraries[$k[$i]]) {
                $imp += $k[$i];
                if ($i < $k.length - 1) {
                    $imp += ', ';
                }
            }
        }

        // Message on console
        if ($imp !== '' && $log) {
            try {
                app_console.info('The following libraries: {0} have been imported in {1} seconds'.format($imp, Math.roundNumber(self._query_time, 3)));
            } catch ($e) {
            } finally {
            }
        }

        // Returns string
        return $imp;

    };

    /**
     * Returns true/false if the library has been loaded or not.
     *
     * @param {string} $lib - Library name
     * @returns {boolean} - Status
     */
    this.isLoadedLibrary = function ($lib) {

        if (Object.keys(self._imported_libraries).indexOf($lib) === -1) {
            return false;
        }
        return self._imported_libraries[$lib];

    };

    /**
     * Returns true/false when all libraries have been loaded.
     *
     * @returns {boolean} - Status
     */
    this.isAllLoadedLibraries = function () {

        if (Object.keys(self._import_lib_queue).length === 0) {
            if (self._hold_ready) {
                // noinspection JSDeprecatedSymbols
                $.holdReady(false);
            }
            self._query_time = Date.getSecondsFrom(self._start_time);
        }
        let $k = Object.keys(self._imported_libraries);
        for (let $i = 0; $i < $k.length; $i += 1) {
            if (!self._imported_libraries[$k[$i]]) return false;
        }
        return true;

    };

    /**
     * Throws fatal error.
     *
     * @param {string} $msg - Library error.
     * @param {string} $path - Library path
     * @private
     */
    this._throwFatalError = function ($msg, $path) {

        app_dialog.error(
            'Fatal library error',
            'The library {0} could not been imported from path {1}'.format('<b>{0}</b>'.format($msg), '<i>{0}</i>'.format($path)),
            {
                closeIcon: false,
                closeText: null,
            },
        );
        NotificationJS.error('Fatal library error');
        app_loading_layer.stop();

    };

    /**
     * Import a library.
     *
     * @param {string} $name - Library name
     * @param {string} $path - Library path
     * @param {function} $callback - Trigger function after load
     * @param {object=} $params - Function parameters
     * @returns {boolean} - Status
     * @private
     */
    this._getScriptAsyncCallback = function ($name, $path, $callback, $params) {
        /* eslint callback-return:"off" */

        try {

            /**
             * Trigger function after load
             */
            let $f_funct = function () {

                // Print message
                if (notNullUndf(self._import_time[$name])) {
                    app_console.info('Library {0} was loaded in {1} seconds'.format($name, Date.getSecondsFrom(self._import_time[$name])));
                    delete self._import_time[$name];
                }

                // Execute function
                if ($params !== undefined) {
                    $callback($params);
                } else {
                    $callback();
                }
                self._imported_libraries[$name] = true;
                self._removeLibFromQueue($name);

                // Returns ok status
                return true;

            };

            // If library already downloaded
            if (self._imported_libraries[$name]) {
                $f_funct();
                return true;
            }

            let $filepath = self._path;
            if ($path.includes('http:') || $path.includes('https:')) {
                $filepath = '';
            }
            // noinspection JSIgnoredPromiseFromCall
            $.getScript($filepath + $path, $f_funct).fail(function () { // Get script
                self._throwFatalError($name, $path);
                self._error_load_libs['js/' + $name] = $filepath + $path;
            });

        } catch ($e) {
        } finally {
        }
        return false;

    };

    /**
     * Import a library asynchronously once the application has been initialized.
     *
     * @param {string|Array} $library - Libraries
     * @param {function=} $callback - Function triggered after download
     * @param {boolean=} $force - Force download
     * @param {object=} $params - Function parameters
     * @returns {boolean} - Status
     */
    this.importAsyncLibrary = function ($library, $callback, $force, $params) {

        // If application is not initialized then throw error
        if (!self._initapp) {
            throw app_error.throwException(
                'LibraryManager',
                'importAsyncLibrary',
                'Application is not initialized yet, the library has not been downloaded' + $library);
        }

        // If the library is null
        if (isNullUndf($library)) {
            app_console.coreError($classname, 'importAsyncLibrary', 'Cannot pass undefined or null as a library name');
            return false;
        }

        // If function is not defined
        if (isNullUndf($callback)) {
            $callback = function () {
            };
        }

        // If library is an array then each library is loaded
        if ($library instanceof Array) {
            if ($library.length === 1) {
                $library = $library[0];
            } else {
                let $lib = $library.splice(0, 1);
                let $newlib = $library;
                $library = $lib[0];
                let $newcallback = function ($$lib, $$callback, $$params) { // Updates function
                    return function () {
                        if ($newlib.length === 1) {
                            $newlib = $newlib[0];
                        }
                        self.importAsyncLibrary($newlib, $$callback, $force, $$params);
                    };
                };
                $callback = $newcallback($newlib, $callback, $params);
            }
        }

        // If loaded check anyway
        if (self.isLoadedLibrary($library) || $force) {
            self._loadLibrary($library, $callback, $params);
            if (self._initapp) app_console.info('The library {0} has already been downloaded'.format($library));
        }

        // If not downloaded adds to the queue
        else {

            // If not in queue it's added
            let $k = Object.keys(self._import_lib_queue);
            if ($k.indexOf($library) === -1) {
                self.addLibToQueue($library);
                self._import_time[$library] = new Date();
                try {
                    self._loadLibrary($library, $callback, $params);
                    return true;
                } catch ($e) {
                    app_console.exception($e);
                    NotificationJS.error($e.message);
                } finally {
                }
                return false;
            }

            // If in queue creates a function that constanstly checks if downloaded
            self._createWaitingThread($library, $callback, $params);

        }

        return true;

    };

    /**
     * Creates a thread that waits the library is loaded.
     *
     * @param {string} $library - Library name
     * @param {function} $callback - Function
     * @param {object} $params - Function parameters
     * @private
     */
    this._createWaitingThread = function ($library, $callback, $params) {

        // If empty function returns
        if ($callback === undefined) return;

        // Create thread id and the data
        let $dataid = generateID();
        self._waiting_thread_data[$dataid] = {
            callback: $callback,
            id: $dataid,
            params: $params,
            threadid: 0,
        };

        // Function that checks the library was loaded
        let $f = function () {
            if (self.isLoadedLibrary($library)) {
                let $data = self._waiting_thread_data[$dataid];
                clearInterval($data.threadid);
                if ($data.params !== undefined) {
                    $data.callback($data.params);
                } else {
                    $data.callback();
                }
                delete self._waiting_thread_data[$dataid];
            }
        };

        // Creates the thread
        self._waiting_thread_data[$dataid].threadid = setInterval($f, cfg_module_async_wait);

    };

    // noinspection JSUnusedGlobalSymbols
    /**
     * Check libraries that failed to load.
     *
     * @param {boolean} $log - Print status on console
     * @returns {boolean} - True if some libraries failed to load
     */
    this.checkFailLoadedLibraries = function ($log) {

        let $k = Object.keys(self._error_load_libs);
        if ($k.length === 0) return false;

        let $imp = '';
        for (let $i = 0; $i < $k.length; $i += 1) {
            $imp += $k[$i];
            if ($i < $k.length - 1) {
                $imp += ', ';
            }
        }
        if ($log) app_console.error('The following libraries could not been imported: {0}'.format($imp));
        app_loading_layer.stop();
        return true;

    };

    /**
     * Imports a library asynchronously.
     *
     * @param {string} $name - Library name
     * @param {string} $path - Library path
     * @returns {boolean} - Status
     * @private
     */
    this._getScriptAsync = function ($name, $path) {

        return self._getScriptAsyncCallback(
            $name,
            $path,
            function () {
            },
        );

    };

    /**
     * Load a css file.
     *
     * @param {string} $lib - Library name
     * @param {string} $path - File path
     * @param {boolean=} $enable_dynamic - Disable dinamic loading
     */
    this.loadCssLib = function ($lib, $path, $enable_dynamic) {

        if (self._imported_libraries[$lib + '.css']) return;
        self._imported_libraries[$lib + '.css'] = true;
        let $filepath = self._path;
        if ($path.includes('http:') || $path.includes('https:')) {
            $filepath = '';
        }
        if ($enable_dynamic) {
            // noinspection JSUnresolvedFunction
            $.getStylesheet([$filepath + $path], null, function () {
                self._error_load_libs['css/' + $lib] = $filepath + $path;
            });
        } else {
            $('head').append('<link rel="stylesheet" type="text/css" href="' + $filepath + $path + '" media="screen">');
        }

    };

    /**
     * Import all queue libraries.
     */
    this.importAllLibraries = function () {

        // If application is loaded throw an exception
        if (self._initapp) {
            throw app_error.throwException(
                'LibraryManager',
                'importAllLibraries',
                'The application has been initialized, the libraries could not been downloaded');
        }
        self._start_time = new Date(); // Set init tiem

        // Check all queuqed libraries
        let $klibs = Object.keys(self._import_lib_queue);
        if ($klibs.length === 0) {
            return;
        }
        if (self._hold_ready) { // Stop readyState
            // noinspection JSDeprecatedSymbols
            $.holdReady(true);
        }

        let $lib;
        for (let $i = 0; $i < $klibs.length; $i += 1) {
            $lib = $klibs[$i];
            self._loadLibrary($lib);
        }

    };

    /**
     * Adds a library to the queue.
     *
     * @param {string} $library - Library name
     */
    this.addLibToQueue = function ($library) {

        let $k = Object.keys(self._import_lib_queue);
        if ($k.indexOf($library) !== -1) return;
        self._import_lib_queue[$library] = false; // Set library as not loaded

    };

    /**
     * Deletes a library from queue.
     *
     * @param {string} $library - Library name
     * @private
     */
    this._removeLibFromQueue = function ($library) {

        let $k = Object.keys(self._import_lib_queue);
        if ($k.indexOf($library) === -1) {
            return;
        }
        delete self._import_lib_queue[$library];
        self.isAllLoadedLibraries(); // Check all libraries are loaded

    };

    /**
     * Loads platform libraries.
     *
     * @param {string} $library - Library
     * @param {function=} $callback - Triggers function
     * @param {object=} $params - Function parameters
     * @private
     */
    this._loadLibrary = function ($library, $callback, $params) {

        if (isNullUndf($callback)) {
            $callback = function () {
            };
        }
        let $newCallback;
        let $path;

        switch ($library) {

            /* /!**
              * Application language
              *!/
             case self.lib.__LANG__:
                 // eslint-disable-next-line no-case-declarations
                 let $lang = app_session.data.lang; // Lang to load
                 if ($lang === 'en') {
                     $callback($params);
                     return;
                 }
                 if (!lang_available.includes($lang)) app_session.data.lang = 'en';
                 self._getScriptAsyncCallback($library + $lang, 'dist/i18n/{0}.min.js'.format($lang), $callback, $params);
                 break;*/

            /**
             * Select2
             */
            case self.lib.SELECT2:
                self.loadCssLib($library, '/static/lib/select2/select2.min.css');
                self._getScriptAsyncCallback($library, '/static/lib/select2/select2.full.min.js', $callback, $params);
                break;

            /**
             * GoJS
             */
            case self.lib.GOJS:
                self._getScriptAsyncCallback($library, '/static/lib/goJS/1.6.21/go.js', $callback, $params);
                break;

            /**
             * GoJS dimension link extension
             * https://gojs.net/latest/extensions/Dimensioning.html
             */
            case self.lib.GOJS_DIMENSIONINGLINK:
                self._getScriptAsyncCallback($library, '/static/lib/goJS/DimensioningLink.js', $callback, $params);
                break;

            /**
             * GoJS debug inspector extension
             * https://gojs.net/latest/extensions/DebugInspector.html
             */
            case self.lib.GOJS_DEBUGINSPECTOR:
                self.loadCssLib($library, '/static/lib/goJS/DebugInspector.css');
                self._getScriptAsyncCallback($library, '/static/lib/goJS/DebugInspector.js', $callback, $params);
                break;

            /**
             * GoJS dragging guided tool extension
             * https://gojs.net/latest/extensions/GuidedDragging.html
             */
            case self.lib.GOJS_DRAGGINGTOOL:
                self._getScriptAsyncCallback($library, '/static/lib/goJS/GuidedDraggingTool.js', $callback, $params);
                break;

            /**
             * Overview resizing tool
             * https://gojs.net/latest/extensions/OverviewResizing.html
             */
            case self.lib.GOJS_OVERVIEWRESIZING:
                self._getScriptAsyncCallback($library, '/static/lib/goJS/OverviewResizingTool.js', $callback, $params);
                break;

            /**
             * GoJS command handler extension
             * https://gojs.net/latest/extensions/DrawCommandHandler.html
             */
            case self.lib.GOJS_COMMANDHANDLER:
                self._getScriptAsyncCallback($library, '/static/lib/goJS/DrawCommandHandler.js', $callback, $params);
                break;

            /**
             * GoJS buttons extension
             * https://raw.githubusercontent.com/NorthwoodsSoftware/GoJS/5de231f82f867f1390c64b05f410e350dae487fd/extensions/Buttons.js
             */
            case self.lib.GOJS_BUTTONS:
                self._getScriptAsyncCallback($library, '/static/lib/goJS/Buttons.js', $callback, $params);
                break;

            /**
             * Three.js
             */
            case self.lib.THREEJS:
                self._getScriptAsyncCallback(
                    $library,
                    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r124/three.min.js', // /static/lib/three.js/three.min.js
                    function ($e) {
                        // self.add_lib_to_queue(self.lib.TJSPROJECTOR);
                        self.addLibToQueue(self.lib.ORBITCONTROLS);
                        // self._getScript_async(self.lib.TJSPROJECTOR, '/static/lib/three.js/Projector.min.js');
                        self._getScriptAsyncCallback(self.lib.ORBITCONTROLS, '/static/lib/three.js/OrbitControls.min.js', $e.c, $e.p);
                    },
                    {
                        c: $callback,
                        p: $params,
                    },
                );
                break;

            /**
             * GUI graphic interface
             */
            case self.lib.DATGUI:
                self.loadCssLib($library, '/static/lib/dat.gui/dat.gui.min.css');
                self._getScriptAsyncCallback($library, '/static/lib/dat.gui/dat.gui.min.js', $callback, $params);
                break;

            /**
             * GLTF exporter, used by Three.js
             */
            case self.lib.GLTFEXPORTER:
                self._getScriptAsyncCallback($library, '/static/lib/three.js/GLTFExporter.min.js', $callback, $params);
                break;

            /**
             * Obj exporter, used by Three.js
             */
            case self.lib.OBJEXPORTER:
                self._getScriptAsyncCallback($library, '/static/lib/three.js/OBJExporter.min.js', $callback, $params);
                break;

            /**
             * Jquery-formvalidator
             */
            case self.lib.FORMVALIDATOR:
                self.loadCssLib($library, '/static/lib/formvalidator/theme-default.min.css');
                self._getScriptAsyncCallback(
                    $library,
                    '/static/lib/formvalidator/jquery.form-validator.min.js',
                    function ($e) {
                        // Load lang
                        self.addLibToQueue(self.lib.FORMVALIDATOR + '.lang');
                        switch (cfg_lang) {
                            case 'es':
                                self._getScriptAsyncCallback(self.lib.FORMVALIDATOR + '.lang', '/static/lib/formvalidator/lang/es.min.js', $e.c, $e.p);
                                break;
                            case 'en':
                                self._getScriptAsyncCallback(self.lib.SPECTRUM + '.lang', self._jsbootstrap, $e.c, $e.p);
                                break;
                            default:
                                break;
                        }
                    },
                    {
                        c: $callback,
                        p: $params,
                    },
                );
                break;

            /**
             * Boostrap-tables
             */
            case self.lib.BOOTSTRAPTABLE:
                $path = 'https://unpkg.com/bootstrap-table@1.18.0/dist';
                self.loadCssLib($library, $path + '/bootstrap-table.min.css');

                self._getScriptAsyncCallback(
                    $library,
                    $path + '/bootstrap-table.min.js',
                    function ($e) {

                        /*
                        // Use natural sorting
                        self.addLibToQueue('bootstraptable.naturalsort');
                        self._getScriptAsync('bootstraptable.naturalsort', '/static/lib/bootstrap-table/extensions/natural-sorting/bootstrap-table-natural-sorting.min.js');
                         */

                        // Load lang
                        self.addLibToQueue(self.lib.FORMVALIDATOR + '.lang');
                        switch (cfg_lang) {
                            case 'es':
                                self._getScriptAsyncCallback(self.lib.FORMVALIDATOR + '.lang', $path + '/locale/bootstrap-table-es-ES.min.js', $e.c, $e.p);
                                break;
                            case 'en':
                                self._getScriptAsyncCallback(self.lib.SPECTRUM + '.lang', $path + '/locale/bootstrap-table-en-US.min.js', $e.c, $e.p);
                                break;
                            default:
                                break;
                        }

                    },
                    {
                        c: $callback,
                        p: $params,
                    },
                );
                break;

            /**
             * Bootstrap table sticky header
             */
            case self.lib.BOOTSTRAPTABLESTICKYHEADER:
                self.loadCssLib($library, '/static/lib/bootstrap-table/extensions/sticky-header/bootstrap-table-sticky-header.min.css');
                self._getScriptAsyncCallback($library, '/static/lib/bootstrap-table/extensions/sticky-header/bootstrap-table-sticky-header.min.js', $callback, $params);
                break;

            /**
             * stats.js
             */
            case self.lib.STATS:
                self._getScriptAsyncCallback($library, '/static/lib/stats.js/stats.min.js', $callback, $params);
                break;

            /**
             * Datatables
             */
            case self.lib.DATATABLES:
                self.loadCssLib($library, '/static/lib/dataTables/dataTables.bootstrap4.min.css');
                self._getScriptAsyncCallback(
                    $library,
                    '/static/lib/dataTables/jquery.dataTables.min.js',
                    function ($e) {
                        self.addLibToQueue(self.lib.DATATABLESBT4);
                        self._getScriptAsyncCallback(self.lib.DATATABLESBT4, '/static/lib/dataTables/dataTables.bootstrap4.min.js', $e.c, $e.p);
                    },
                    {
                        c: $callback,
                        p: $params,
                    },
                );
                break;

            /**
             * ContextMenu
             */
            case self.lib.CONTEXTMENU:
                self.loadCssLib($library, '/static/lib/jquery.contextMenu/jquery.contextMenu.min.css');
                self._getScriptAsyncCallback($library, '/static/lib/jquery.contextMenu/jquery.contextMenu.min.js', $callback, $params);
                break;

            /**
             * Datepicker date selector
             */
            case self.lib.DATEPICKER:
                self.loadCssLib($library, '/static/lib/datepicker/datepicker.min.css');
                self._getScriptAsyncCallback($library, '/static/lib/datepicker/datepicker.min.js', $callback, $params);
                break;

            /**
             * asRange
             */
            case self.lib.ASRANGE:
                self.loadCssLib($library, '/static/lib/jquery-asRange/asRange.min.css');
                self._getScriptAsyncCallback($library, '/static/lib/jquery-asRange/jquery-asRange.min.js', $callback, $params);
                break;

            /**
             * Multiselect
             */
            case self.lib.MULTISELECT:
                self._getScriptAsyncCallback($library, '/static/lib/multiselect/multiselect.min.js', $callback, $params);
                break;

            /**
             * Notification - toastr
             */
            case self.lib.TOASTR:
                self.loadCssLib($library, '/static/lib/toastr/toastr.min.css');
                self._getScriptAsyncCallback($library, '/static/lib/toastr/toastr.min.js', $callback, $params);
                break;

            /**
             * Chart.js
             */
            case self.lib.CHARTJS:
                $newCallback = function () {
                    $callback($params);
                    app_libutils.initChartJSPlugins();
                };
                self._getScriptAsyncCallback($library, 'https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.bundle.min.js', $newCallback);
                break;

            /**
             * Bootstrap password toggler
             */
            case self.lib.BPASSWDTOGGLER:
                self._getScriptAsyncCallback($library, '/static/lib/bootstrap-password-toggler/toggler.min.js', $callback, $params);
                break;

            /**
             * AmaranJS
             */
            case self.lib.AMARANJS:
                self.loadCssLib($library, '/static/lib/AmaranJS/css/amaran.min.css');
                self._getScriptAsyncCallback($library, '/static/lib/AmaranJS/js/jquery.amaran.min.js', $callback, $params);
                break;

            /**
             * jquery.toast
             */
            case self.lib.JQUERYTOAST:
                self.loadCssLib($library, '/static/lib/jquery.toast/jquery.toast.min.css');
                self._getScriptAsyncCallback($library, '/static/lib/jquery.toast/jquery.toast.min.js', $callback, $params);
                break;

            /**
             * jquery-resizable
             */
            case self.lib.JQUERYRESIZABLE:
                self._getScriptAsyncCallback($library, '/static/lib/jquery-resizable/jquery-resizable.min.js', $callback, $params);
                break;

            /**
             * jQuery.scrollTo
             */
            case self.lib.JQUERYSCROLLTO:
                self._getScriptAsyncCallback($library, '/static/lib/jquery.scrollTo/jquery.scrollTo.min.js', $callback, $params);
                break;

            /**
             * Fontawesome
             */
            case self.lib.FONTAWESOME:
                self.loadCssLib($library, '/static/lib/font-awesome/css/all.min.css');
                self._getScriptAsyncCallback($library, self._jsbootstrap, $callback, $params);
                break;

            /**
             * Jquery.actual
             */
            case self.lib.JQUERYACTUAL:
                self._getScriptAsyncCallback($library, '/static/lib/jquery.actual/jquery.actual.min.js', $callback, $params);
                break;

            /**
             * Jquery.transit
             */
            case self.lib.JQUERYTRANSIT:
                self._getScriptAsyncCallback($library, '/static/lib/jquery.transit/jquery.transit.min.js', $callback, $params);
                break;

            /**
             * Jquery-confirm
             */
            case self.lib.JQUERYCONFIRM:
                self.loadCssLib($library, 'https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.4/jquery-confirm.min.css');
                self._getScriptAsyncCallback($library, 'https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.4/jquery-confirm.min.js', $callback, $params);
                break;

            /**
             * AES-MD5
             */
            case self.lib.MD5:
                self._getScriptAsyncCallback($library, '/static/lib/md5/md5.min.js', $callback, $params);
                break;

            /**
             * Hover.css
             */
            case self.lib.HOVERCSS:
                self.loadCssLib($library, '/static/lib/hover/hover.min.css');
                self._getScriptAsyncCallback($library, self._jsbootstrap, $callback, $params);
                break;

            /**
             * Tooltipster
             */
            case self.lib.TOOLTIPSTER:
                self.loadCssLib($library, '/static/lib/tooltipster/tooltipster.bundle.min.css');
                self._getScriptAsyncCallback($library, '/static/lib/tooltipster/tooltipster.bundle.min.js', $callback, $params);
                break;

            /**
             * Bootstrap css
             */
            case self.lib.BOOTSTRAP:
                self.loadCssLib($library, 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css');
                self._getScriptAsyncCallback($library, self._jsbootstrap, $callback, $params);
                break;

            /**
             * Bootstrap.js
             */
            case self.lib.BOOTSTRAPJS:
                self._getScriptAsyncCallback($library, 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js', $callback, $params);
                break;

            /**
             * Mmenu
             */
            case self.lib.MMENU:
                self.loadCssLib($library, 'https://cdnjs.cloudflare.com/ajax/libs/jQuery.mmenu/8.5.22/mmenu.min.css');
                self._getScriptAsyncCallback(
                    $library,
                    'https://cdnjs.cloudflare.com/ajax/libs/jQuery.mmenu/8.5.22/mmenu.js',
                    function ($e) {
                        self.addLibToQueue(self.lib.HAMMER);
                        self._getScriptAsyncCallback(self.lib.HAMMER, '/static/lib/hammer/hammer.min.js', $e.c, $e.p);
                    },
                    {
                        c: $callback,
                        p: $params,
                    },
                );
                break;

            /**
             * Rippler
             */
            case self.lib.RIPPLER:
                self.loadCssLib($library, '/static/lib/rippler/rippler.min.css');
                self._getScriptAsyncCallback($library, '/static/lib/rippler/rippler.min.js', $callback, $params);
                break;

            /**
             * Spin
             */
            case self.lib.SPIN:
                self.loadCssLib($library, '/static/lib/spin/spin.css');
                self._getScriptAsyncCallback($library, '/static/lib/spin/spin.min.js', $callback, $params);
                break;

            /**
             * Bowser
             */
            case self.lib.BOWSER:
                self._getScriptAsyncCallback($library, '/static/lib/bowser/bowser.min.js', $callback, $params);
                break;

            /**
             * Jquery-scrollLock
             */
            case self.lib.SCROLLLOCK:
                self._getScriptAsyncCallback($library, '/static/lib/jquery-scrollLock/jquery-scrollLock.min.js', $callback, $params);
                break;

            /**
             * Jquery.mousewheel
             */
            case self.lib.MOUSEWHEEL:
                self._getScriptAsyncCallback($library, '/static/lib/jquery.mousewheel/jquery.mousewheel.min.js', $callback, $params);
                break;

            /**
             * Jquery.ui.position
             */
            case self.lib.UIPOSITION:
                self._getScriptAsyncCallback($library, '/static/lib/jquery.ui/jquery.ui.position.min.js', $callback, $params);
                break;

            /**
             * Jquery-mentions-input
             */
            case self.lib.MENTIONSINPUT:
                self.loadCssLib($library, '/static/lib/jquery-mentions-input/jquery.mentionsInput.min.css');
                self.addLibToQueue(self.lib.UNDERSCORE);
                self._getScriptAsyncCallback(
                    self.lib.UNDERSCORE,
                    '/static/lib/underscore/underscore-min.js',
                    function ($e) {
                        self.addLibToQueue('jquery.events.input');
                        self.addLibToQueue('jquery.elastic');
                        self._getScriptAsync('jquery.events.input', '/static/lib/jquery-mentions-input/jquery.events.input.min.js');
                        self._getScriptAsync('jquery.elastic', '/static/lib/jquery-mentions-input/jquery.elastic.min.js');
                        self._getScriptAsyncCallback($library, '/static/lib/jquery-mentions-input/jquery.mentionsInput.min.js', $e.c, $e.p);
                    },
                    {
                        c: $callback,
                        p: $params,
                    },
                );
                break;

            /**
             * Underscore.js
             */
            case self.lib.UNDERSCORE:
                self._getScriptAsyncCallback($library, '/static/lib/underscore/underscore-min.js', $callback, $params);
                break;

            /**
             * TinyMCE
             */
            case self.lib.TINYMCE:
                self.loadCssLib($library + '-plugin-mention-autocomplete',
                    '/static/lib/tinymce/plugins/mention/autocomplete.css');
                self.loadCssLib($library + '-plugin-mention-rte',
                    '/static/lib/tinymce/plugins/mention/rte-content.css');
                self.addLibToQueue('jquery.tinymce');
                self._getScriptAsync('jquery.tinymce', '/static/lib/tinymce/jquery.tinymce.min.js');
                self._getScriptAsyncCallback(
                    $library,
                    '/static/lib/tinymce/tinymce.min.js',
                    function ($e) {
                        self.addLibToQueue('tinymce-lang');
                        switch (cfg_lang) {
                            case 'es':
                                self._getScriptAsyncCallback('tinymce-lang', '/static/lib/tinymce/langs/es.js', $e.c, $e.p);
                                break;
                            case 'en':
                                self._getScriptAsyncCallback('tinymce-lang', '/static/lib/tinymce/langs/en_GB.js', $e.c, $e.p);
                                break;
                            default:
                                break;
                        }
                    },
                    {
                        c: $callback,
                        p: $params,
                    },
                );
                break;

            /**
             * Animate CSS
             */
            case self.lib.ANIMATE:
                self.loadCssLib($library, 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.compat.css');
                self._getScriptAsyncCallback($library, self._jsbootstrap, $callback, $params);
                break;

            /**
             * SHA-1
             */
            case self.lib.SHA1:
                self._getScriptAsyncCallback($library, '/static/lib/sha1/sha1.min.js', $callback, $params);
                break;

            /**
             * Normalize.css
             */
            case self.lib.NORMALIZE:
                self.loadCssLib($library, '/static/lib/normalize/normalize.css');
                self._getScriptAsyncCallback($library, self._jsbootstrap, $callback, $params);
                break;

            /**
             * Ion-rangeslider
             */
            case self.lib.IONRANGESLIDER:
                self.loadCssLib($library, '/static/lib/ion.rangeSlider/ion.rangeSlider.min.css');
                self._getScriptAsyncCallback($library, '/static/lib/ion.rangeSlider/ion.rangeSlider.min.js', $callback, $params);
                break;

            /**
             * Jquery-backtotop
             */
            case self.lib.BACKTOTOP:
                $newCallback = function () {
                    app_libutils.initBackToTop();
                    $callback($params);
                };
                self.loadCssLib($library, '/static/lib/jquery-backToTop/jquery-backToTop.min.css');
                self._getScriptAsyncCallback($library, '/static/lib/jquery-backToTop/jquery-backToTop.min.js', $newCallback);
                break;

            /**
             * Jquery-timeago
             */
            case self.lib.JQUERYTIMEAGO:
                self._getScriptAsyncCallback(
                    $library,
                    '/static/lib/jquery-timeago/jquery.timeago.js',
                    function ($e) {
                        self.addLibToQueue('jquery-timeago-locale');
                        switch (cfg_lang) {
                            case 'es':
                                self._getScriptAsyncCallback('jquery-timeago-locale', '/static/lib/jquery-timeago/locales/jquery.timeago.es.js', $e.c, $e.p);
                                break;
                            case 'en':
                                self._getScriptAsyncCallback('jquery-timeago-locale', '/static/lib/jquery-timeago/locales/jquery.timeago.en.js', $e.c, $e.p);
                                break;
                            default:
                                break;
                        }
                    },
                    {
                        c: $callback,
                        p: $params,
                    },
                );
                break;

            /**
             * Twbs-pagination
             */
            case self.lib.TWBSPAGINATION:
                self._getScriptAsyncCallback($library, '/static/lib/twbs-pagination/jquery.twbsPagination.min.js', $callback, $params);
                break;

            /**
             * Simple pagination
             */
            case self.lib.SIMPLEPAGINATION:
                self.loadCssLib($library, '/static/lib/simplePagination/simplePagination.min.css');
                self._getScriptAsyncCallback($library, '/static/lib/simplePagination/jquery.simplePagination.min.js', $callback, $params);
                break;

            /**
             * jquery.NiceScroll
             */
            case self.lib.JQUERYNICESCROLL:
                self._getScriptAsyncCallback(
                    $library,
                    '/static/lib/jquery.nicescroll/jquery.nicescroll.min.js',
                    function ($e) {
                        self.addLibToQueue('jquery.nicescroll.iframehelper');
                        self._getScriptAsyncCallback('jquery.nicescroll.iframehelper', '/static/lib/jquery.nicescroll/jquery.nicescroll.iframehelper.min.js', $e.c, $e.p);
                    },
                    {
                        c: $callback,
                        p: $params,
                    },
                );
                break;

            /**
             * Filesaver.js
             */
            case self.lib.FILESAVERJS:
                self._getScriptAsyncCallback(
                    $library,
                    '/static/lib/filesaver/FileSaver.js',
                    function ($e) {
                        self._getScriptAsync('canvas-toBlob', '/static/lib/filesaver/canvas-toBlob.js');
                        self.addLibToQueue('Blob.js');
                        self._getScriptAsyncCallback('Blob.js', '/static/lib/filesaver/Blob.js', $e.c, $e.p);
                    },
                    {
                        c: $callback,
                        p: $params,
                    },
                );
                break;

            /**
             * D3
             */
            case self.lib.D3:
                $newCallback = function () {
                    $callback($params);
                };
                self._getScriptAsyncCallback($library, '/static/lib/d3/d3.min.js', $newCallback);
                break;

            /**
             * Popper.js
             */
            case self.lib.POPPER:
                self._getScriptAsyncCallback($library, '/static/lib/popper/popper.min.js', $callback, $params);
                break;

            /**
             * Plot.ly
             */
            case self.lib.PLOTLY:
                self._getScriptAsyncCallback($library, 'https://cdn.plot.ly/plotly-latest.min.js', $callback, $params); // /static/lib/plotly/plotly-latest.min.js
                break;

            /**
             * Validator.js
             */
            case self.lib.VALIDATORJS:
                self._getScriptAsyncCallback($library, '/static/lib/validator.js/validator.min.js', $callback, $params);
                break;

            /**
             * Notification.js
             */
            case self.lib.NOTIFICATIONJS:
                self.loadCssLib($library, '/static/lib/notification.js/notification.min.css');
                self._getScriptAsyncCallback($library, '/static/lib/notification.js/notification.js', $callback, $params);
                break;

            /**
             * MMenu Mburger
             */
            case self.lib.MBURGER:
                self.loadCssLib($library, '/static/lib/mburger/mburger.css');
                self._getScriptAsyncCallback($library, '/static/lib/mburger/mburger.js', $callback, $params);
                break;

            /**
             * Autocomplete dynamic
             */
            case self.lib.BOOTSTRAPAUTOCOMPLETE:
                self._getScriptAsyncCallback($library, '/static/lib/bootstrap-autocomplete/bootstrap-autocomplete.min.js', $callback, $params);
                break;

            /**
             * JSTREE
             */
            case self.lib.JSTREE:
                // self.loadCssLib($library, 'https://cdnjs.cloudflare.com/ajax/libs/jstree/3.3.1/themes/default/style.min.css');
                self.loadCssLib($library, '/static/lib/jstree/themes/default/style.min.css');
                // self._getScriptAsyncCallback($library, 'https://cdnjs.cloudflare.com/ajax/libs/jstree/3.3.1/jstree.min.js', $callback, $params);
                self._getScriptAsyncCallback($library, '/static/lib/jstree/jstree.min.js', $callback, $params);
                break;

            /**
             * Pick-a-color input
             */
            case self.lib.PICKACOLOR:
                self.loadCssLib($library, '/static/lib/pick-a-color/pick-a-color-1.2.3.min.css');
                self._getScriptAsyncCallback($library, '/static/lib/pick-a-color/pick-a-color-1.2.3.min.js', $callback, $params);
                break;

            /**
             * Simple tabulation
             */
            case self.lib.MTABS:
                self.loadCssLib($library, '/static/lib/mtabs/styles.css');
                self._getScriptAsyncCallback($library, '/static/lib/mtabs/mtabs.2.2.1.min.js', $callback, $params);
                break;

            /**
             * Tinycolor color manipulation
             */
            case self.lib.TINYCOLOR:
                self._getScriptAsyncCallback($library, '/static/lib/tinycolor/tinycolor.min.js', $callback, $params);
                break;

            /**
             * Convexhull
             */
            case self.lib.HULL:
                self._getScriptAsyncCallback($library, '/static/lib/hull/hull.min.js', $callback, $params);
                break;

            /**
             * Spectrum
             */
            case self.lib.SPECTRUM:
                self.loadCssLib($library, 'https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.1/spectrum.min.css');
                self._getScriptAsyncCallback(
                    $library,
                    'https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.1/spectrum.min.js',
                    function ($e) {
                        // Load lang
                        self.addLibToQueue(self.lib.SPECTRUM + '.lang');
                        switch (cfg_lang) {
                            case 'es':
                                self._getScriptAsyncCallback(self.lib.SPECTRUM + '.lang', 'https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.1/i18n/jquery.spectrum-es.min.js', $e.c, $e.p);
                                break;
                            case 'en':
                                self._getScriptAsyncCallback(self.lib.SPECTRUM + '.lang', self._jsbootstrap, $e.c, $e.p);
                                break;
                            default:
                                break;
                        }
                    },
                    {
                        c: $callback,
                        p: $params,
                    },
                );
                break;

            /**
             * Unknown library
             */
            default:
                self._removeLibFromQueue($library);
                if (isNullUndf($library)) $library = '__undefined__';
                throw app_error.throwException(
                    'LibraryManager',
                    'load_library',
                    'Library <{0}> unknown'.format($library));
        }

    };

    /**
     * Enable holdready
     */
    self._hold_ready = true;

}


/**
 * ----------------------------------------------------------------------------
 * Creates new library
 * ----------------------------------------------------------------------------
 */

/**
 * Library administrator
 * @type {__CORE_LibraryManager}
 * @global
 * @const
 */
const app_library_manager = new __CORE_LibraryManager();


/**
 * ----------------------------------------------------------------------------
 * Imports before app init
 * ----------------------------------------------------------------------------
 */
app_library_manager.addLibToQueue(app_library_manager.lib.AMARANJS);
app_library_manager.addLibToQueue(app_library_manager.lib.BOOTSTRAP);
app_library_manager.addLibToQueue(app_library_manager.lib.JQUERYACTUAL);
app_library_manager.addLibToQueue(app_library_manager.lib.JQUERYCONFIRM);
app_library_manager.addLibToQueue(app_library_manager.lib.JQUERYTRANSIT);
app_library_manager.addLibToQueue(app_library_manager.lib.MD5);
app_library_manager.addLibToQueue(app_library_manager.lib.NOTIFICATIONJS);
app_library_manager.addLibToQueue(app_library_manager.lib.SCROLLLOCK);
app_library_manager.addLibToQueue(app_library_manager.lib.SPIN);
app_library_manager.addLibToQueue(app_library_manager.lib.TOOLTIPSTER);


/**
 * ----------------------------------------------------------------------------
 * Imports after app init, used by @src/app.js
 * ----------------------------------------------------------------------------
 */
function afterLoadImports() {

    app_library_manager.importAsyncLibrary(app_library_manager.lib.ANIMATE);
    app_library_manager.importAsyncLibrary(app_library_manager.lib.BACKTOTOP);
    app_library_manager.importAsyncLibrary(app_library_manager.lib.FONTAWESOME);
    app_library_manager.importAsyncLibrary(app_library_manager.lib.HOVERCSS);
    app_library_manager.importAsyncLibrary(app_library_manager.lib.NORMALIZE);

}


/**
 * ----------------------------------------------------------------------------
 * Imports polyfills
 * ----------------------------------------------------------------------------
 */

/**
 * bowser - Navigator validator.
 */
let bowser;