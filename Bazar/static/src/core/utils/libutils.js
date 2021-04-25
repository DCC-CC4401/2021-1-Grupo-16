/**
 LIBUTILS
 Utility library utils.
 */
"use strict";

/**
 * Utility library functions class.
 *
 * @class
 * @private
 */
function __CORE_LibUtils() {

    /**
     * Object pointer
     * @type {__CORE_LibUtils}
     * @private
     */
    let self = this;

    /**
     * Initialized libraries
     * @private
     */
    this._initialized = {
        backtotop: false,
        chartjs: false,
    };

    /**
     * Add Chart.js plugins.
     */
    this.initChartJSPlugins = function () {

        if (self._initialized.chartjs) return;
        self._initialized.chartjs = true;
        Chart.defaults.global.defaultFontColor = app_theme.chartjsFontColor;
        Chart.pluginService.register({
            afterDraw: function ($chart, $easing) {
                // noinspection JSUnresolvedVariable
                if ($chart.config.options.showAllTooltips) {
                    // noinspection JSUnresolvedVariable
                    if (!$chart.allTooltipsOnce) {
                        // noinspection JSIncompatibleTypesComparison
                        if ($easing !== 1) {
                            return;
                        }
                        $chart.allTooltipsOnce = true;
                    }
                    $chart.options.tooltips.enabled = true;
                    // noinspection JSUnresolvedVariable,TypeScriptUMDGlobal
                    Chart.helpers.each($chart.pluginTooltips, function ($tooltip) {
                        $tooltip.initialize();
                        $tooltip.update();
                        $tooltip.pivot();
                        $tooltip.transition($easing).draw();
                    });
                    $chart.options.tooltips.enabled = false;
                }
            },
            beforeRender: function ($chart) {
                // noinspection JSUnresolvedVariable
                if ($chart.config.options.showAllTooltips) {
                    $chart.pluginTooltips = [];
                    $chart.config.data.datasets.forEach(function ($dataset, $i) {
                        $chart.getDatasetMeta($i).data.forEach(function ($sector) {
                            // noinspection JSUnresolvedVariable,JSValidateTypes
                            $chart.pluginTooltips.push(new Chart.Tooltip({
                                _active: [$sector],
                                _chart: $chart.chart,
                                _chartInstance: $chart,
                                _data: $chart.data,
                                _options: $chart.options.tooltips,
                            }, $chart));
                        });
                    });
                    $chart.options.tooltips.enabled = false;
                }
            },
        });

    };

    /**
     * Init backtotop button, @src/init.js
     */
    this.initBackToTop = function () {

        if (isNullUndf(app_theme)) return; // UI themes not loaded
        if (app_theme.backToTopShow) {
            if (self._initialized.backtotop) return;
            self._initialized.backtotop = true;
            app_library_manager.importAsyncLibrary(app_library_manager.lib.BACKTOTOP, function () {
                // noinspection JSSuspiciousNameCombination
                $.backToTopBtn = $.backToTop({
                    backgroundColor: app_theme.headerBgColor,
                    height: app_theme.backToTopSize,
                    pxToTrigger: app_theme.backToTopScrollPxTrigger,
                    width: app_theme.backToTopSize,
                    zIndex: 2,
                });
            });
        }

    };

}

/**
 * Library utility functions
 * @type {__CORE_LibUtils}
 * @var
 * @const
 */
const app_libutils = new __CORE_LibUtils();