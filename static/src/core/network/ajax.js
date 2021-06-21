/**
 AJAX
 Ajax server connection management.
 */
"use strict";

// noinspection JSUnusedGlobalSymbols
/**
 * Executes ajax on data, then applies the results (JSON parsed) to function ($success). If fail
 * execute $error($response).
 *
 * @param {string} $url - Query URL
 * @param {FormData} $data - Data to upload
 * @param {function} $success - Function triggered after success, takes parsed JSON data
 * @param {function} $error - Error function, takes response as argument
 * @param {function=} $any - Function to be executed if success or error
 */
function ajaxPostFormData($url, $data, $success, $error, $any) {

    if (isNullUndf($any)) $any = () => {
    };
    let $settings = {
        contentType: false,
        crossOrigin: cfg_ajax_cors,
        data: $data,
        error: function () {
            $error();
            $any();
        },
        method: 'post',
        processData: false,
        success: function ($response) {
            try {
                let $r_data = JSON.parse($response);
                if (Object.keys($r_data).indexOf('error') === -1) { // No errors
                    $success($r_data, $response);
                } else {
                    $error($response);
                }
                $any();
            } catch ($e) {
                app_console.exception($e);
                $error($response);
            } finally {
            }
        },
        timeout: cfg_href_ajax_timeout,
        url: $url,
    };
    $.ajax($settings).then(function () {
    });

}

// noinspection JSUnusedGlobalSymbols
/**
 * Executes ajax on data, then applies the results (JSON parsed) to function ($success). If fail
 * execute $error($response).
 *
 * @param {string} $url - Query URL
 * @param {string} $method - post or get
 * @param {string} $data - Data to upload
 * @param {function} $success - Function triggered after success, takes parsed JSON data
 * @param {function} $error - Error function, takes response as argument
 * @param {function=} $any - Function to be executed if success or error
 */
function ajaxPostDataString($url, $method, $data, $success, $error, $any) {

    if (isNullUndf($any)) $any = () => {
    };
    let $settings = {
        crossOrigin: cfg_ajax_cors,
        data: $data,
        error: function () {
            $error();
            $any();
        },
        method: $method,
        success: function ($response) {
            try {
                let $r_data = JSON.parse($response);
                if (Object.keys($r_data).indexOf('error') === -1) { // No errors
                    $success($r_data, $response);
                } else {
                    $error($response);
                }
                $any();
            } catch ($e) {
                app_console.exception($e);
                $error($response);
            } finally {
            }
        },
        timeout: cfg_href_ajax_timeout,
        url: $url,
    };
    $.ajax($settings).then(function () {
    });

}