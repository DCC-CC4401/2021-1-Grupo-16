/**
 * MODULE
 * Basic module class.
 */
"use strict";

/**
 * Module abstract class.
 * Modules are the basic views of the app.
 *
 * @constructor
 * @abstract
 */
function Module() {

    // noinspection JSUnusedLocalSymbols
    /**
     * Object pointer
     * @type {Module}
     */
    let self = this;

    /**
     * This function inits the module.
     * @abstract
     */
    this.init = function () {
    };

}

/**
 * Module manager. Many modules can be registered within module manager. Manager
 * then loads the registered modules.
 * @private
 */
function __ModuleManager() {

    /**
     * Module pointer
     * @type {__ModuleManager}
     */
    let self = this;

    /**
     * Stores the modules to be opened
     * @example
     *  'module1'   MyModule
     *  'module2'   MyModule2
     * @private
     * @type {Object.<string, Module>}
     */
    this._modules = {};

    /**
     * Register a module
     * @param {string} $name - Name of the module
     * @param {Module} $module - Module object
     */
    this.registerModule = function ($name, $module) {
        // if (!($module instanceof Module)) {
        //     app_console.error('Invalid module class');
        //     return;
        // }
        if ($name in Object.keys(self._modules)) {
            app_console.error('Key {0} already in modules'.format($name));
            return;
        }
        app_console.info('Registering {0} module'.format($name));
        self._modules[$name] = $module;
    };

    /**
     * Initializes all registered modules.
     *
     * @param {function|null} $after - Function applied after modules are executed
     */
    this.init = function ($after) {
        app_console.info('Initializing registered modules');
        for (const $key in self._modules) {
            if (!(self._modules.hasOwnProperty($key))) continue;
            self._modules[$key].init();
        }
        if (notNullUndf($after)) $after();
    };

}

/**
 * Registers the module manager
 * @type {__ModuleManager}
 */
let app_module = new __ModuleManager();