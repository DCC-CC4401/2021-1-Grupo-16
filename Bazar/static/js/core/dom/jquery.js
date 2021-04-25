/**
 JQUERY
 Extend jquery methods.
 */
"use strict";

/**
 * Autocomplete an entry.
 *
 * @param {string} $url - Query URL
 * @param {number} $minlength - Min search length
 */
jQuery.fn.autoCompleteServer = function ($url, $minlength) {

    let $input = this;
    // noinspection JSUnresolvedFunction,JSUnusedGlobalSymbols
    $input.autoComplete({
        autoSelect: false,
        events: {
            searchPost: function ($resultFromServer) {
                try {

                    /** @type {*[]}*/ let $res = JSON.parse($resultFromServer);
                    if (!Array.isArray($res)) { // If format {0: A, 1: B...}
                        $res = Object.values($res);
                    }

                    for (let $i = 0; $i < $res.length; $i += 1) {
                        $res[$i] = $.parseHTML($res[$i])[0].textContent; // Decode html
                    }

                    return $res;

                } catch ($e) {
                    app_console.coreWarn('core', 'autoCompleteServer', 'Autocompletion failed, check your connection with the server');
                    app_console.error($resultFromServer);
                    return [];
                }
            },
        },
        minLength: $minlength,
        noResultsText: '',
        resolverSettings: {
            url: $url,
        },
    });
    $input.keypress(
        function ($event) {
            // noinspection JSDeprecatedSymbols
            if ($event.which === 13) $event.preventDefault();
        },
    );
    return this;

};

/**
 * Confirm.
 */
jQuery.fn.confirm = function () {
};

/**
 * Disable items.
 *
 * @returns {jQuery}
 */
jQuery.fn.disable = function () {

    let $o = $(this[0]);
    if ($o.isArr([
        'button',
        'input',
        'select',
        'textarea',
    ])) $o.attr('disabled', 'disabled');
    if ($o.isArr([
        'a',
        'button',
        'div',
        'li',
    ])) $o.addClass('disabled');
    return this;

};

/**
 * Disable scroll outside from scrolling div.
 *
 * @returns {jQuery}
 */
jQuery.fn.disableScrollOutside = function () {

    let $o = $(this[0]);
    $o.onReplace('mousewheel DOMMouseScroll', function ($e) {
        let $e0 = $e.originalEvent;
        // noinspection JSUnresolvedVariable
        let $delta = $e0.wheelDelta || -$e0.detail;
        this.scrollTop += ($delta < 0 ? 1 : -1) * 30;
        $e.preventDefault();
    });
    return this;

};

/**
 * Enable items.
 *
 * @returns {jQuery}
 */
jQuery.fn.enable = function () {

    let $o = $(this[0]);
    if ($o.isArr([
        'button',
        'input',
        'select',
        'textarea',
    ])) $o.removeAttr('disabled');
    if ($o.isArr([
        'a',
        'button',
        'div',
        'li',
    ])) $o.removeClass('disabled');
    return this;

};

/**
 * Get path of element.
 *
 * @returns {string}
 */
jQuery.fn.getPath = function () {

    let $o = $(this[0]);
    if ($o.length !== 1) throw 'Requires one element.';
    let $path;
    let $node = this;
    while ($node.length) {
        let $realNode = $node[0];
        let $name = $realNode.localName;
        if (!$name) break;
        $name = $name.toLowerCase();

        let $parent = $node.parent();

        let $siblings = $parent.children($name);
        if ($siblings.length > 1) {
            $name += ':eq(' + $siblings.index($realNode) + ')';
        }
        $path = $name + ($path ? '>' + $path : '');
        $node = $parent;
    }
    return $path;

};

/**
 * Autofill zero at number inputs if first character is a comma, also parseFloat can be used.
 *
 * @param {string=} $trigger_fun - Trigger event after change
 * @param {string=} $eventID - Event identification
 * @returns {jQuery}
 */
jQuery.fn.inputBeginAutoZeroOnChange = function ($trigger_fun, $eventID) {

    if (isNullUndf($eventID)) $eventID = '';
    let $o = $(this[0]);
    if ($o.attr('type').toLowerCase() === 'number') {
        $o.onReplace('change.inputBeginAutoZero' + $eventID, function () {
            let $val = $o.val();
            if ($val[0].charAt(0) === ',' || $val[0].charAt(0) === '.') {
                $o.val('0' + $val);
            }
            if (notNullUndf($trigger_fun) && $trigger_fun !== '') $o.trigger($trigger_fun);
        });
    }
    return this;

};

/**
 * Loads a file and write contents to an input after file_input changes.
 *
 * @param {jQuery} $file_input
 * @param {string=} $trigger_fun - Trigger event after change
 * @param {string=} $eventID - Event identification
 * @returns {jQuery}
 */
jQuery.fn.inputLoadWriteFileOn = function ($file_input, $trigger_fun, $eventID) {

    if (isNullUndf($eventID)) $eventID = '';
    let $o = $(this[0]);
    $file_input.onReplace('change.inputLoadWriteFileOn' + $eventID, function () {
        let $file = $file_input.prop('files');
        if ($file.length === 0) return;
        let $fileReader = new FileReader();
        $fileReader.onload = function () {
            let $data = $fileReader.result;
            $o.val($data.toString());
            if (notNullUndf($trigger_fun) && $trigger_fun !== '') $o.trigger($trigger_fun);
        };
        // noinspection JSCheckFunctionSignatures
        $fileReader.readAsText($file[0]);
    });
    return this;

};

/**
 * Force float input on change.
 *
 * @param {string=} $trigger_fun - Trigger event after change
 * @param {string=} $eventID - Event identification
 * @returns {jQuery}
 */
jQuery.fn.inputParseFloatOnChange = function ($trigger_fun, $eventID) {

    if (isNullUndf($eventID)) $eventID = '';
    let $o = $(this[0]);
    $o.onReplace('change.inputParseFloatOnChange' + $eventID, function () {
        let $val = parseFloat($o.val().toString());
        if (Number.isNaN($val)) {
            $val = '';
        }
        $o.val($val);
        if (notNullUndf($trigger_fun) && $trigger_fun !== '') $o.trigger($trigger_fun);
    });
    return this;

};

/**
 * Force integer input on change.
 *
 * @param {string=} $trigger_fun - Trigger event after change
 * @param {string=} $eventID - Event identification
 * @returns {jQuery}
 */
jQuery.fn.inputParseIntOnChange = function ($trigger_fun, $eventID) {

    if (isNullUndf($eventID)) $eventID = '';
    let $o = $(this[0]);
    $o.onReplace('change.inputParseFloatOnChange' + $eventID, function () {
        let $val = parseInt($o.val().toString(), 10);
        if (Number.isNaN($val)) {
            $val = '';
        }
        $o.val($val);
        if (notNullUndf($trigger_fun) && $trigger_fun !== '') $o.trigger($trigger_fun);
    });
    return this;

};

/**
 * Force lowercase on input on change.
 *
 * @param {string=} $trigger_fun - Trigger event after change
 * @param {string=} $eventID - Event identification
 * @returns {jQuery}
 */
jQuery.fn.inputLowercaseOnChange = function ($trigger_fun, $eventID) {

    if (isNullUndf($eventID)) $eventID = '';
    let $o = $(this[0]);
    $o.onReplace('change.inputLowercaseOnChange' + $eventID, function () {
        /** @string */ let $val = $o.val().toLowerCase();
        $o.val($val);
        if (notNullUndf($trigger_fun) && $trigger_fun !== '') $o.trigger($trigger_fun);
    });
    $o.css('text-transform', 'lowercase');
    return this;

};

/**
 * Replace string on input change.
 *
 * @param {string|string[]} $from
 * @param {string} $to
 * @param {string=} $trigger_fun - Trigger event after change
 * @param {string=} $eventID - Event identification
 * @returns {jQuery}
 */
jQuery.fn.inputReplaceStringOnChange = function ($from, $to, $trigger_fun, $eventID) {

    if (isNullUndf($eventID)) $eventID = '';
    if (!($from instanceof Array)) $from = [$from];
    let $o = $(this[0]);
    $o.onReplace('change.inputReplaceStringOnChange' + $eventID, function () {
        /** @string */ let $val = $o.val();
        for (let $i = 0; $i < $from.length; $i += 1) {
            $val = $val.replaceMultiple($from[$i], $to);
        }
        $o.val($val);
        if (notNullUndf($trigger_fun) && $trigger_fun !== '') $o.trigger($trigger_fun);
    });
    return this;

};

/**
 * Replace string on input change.
 *
 * @param {string=} $trigger_fun - Trigger event after change
 * @param {string=} $eventID - Event identification
 * @returns {jQuery}
 */
jQuery.fn.inputReplaceStringWhitespaceOnChange = function ($trigger_fun, $eventID) {

    $(this[0]).inputReplaceStringOnChange(
        [
            '  ',
            '   ',
            '    ',
            '     ',
            '      ',
            '       ',
            '        ',
            '         ',
            '          ',
        ],
        ' ',
        $trigger_fun,
        $eventID);
    return this;

};

/**
 * Force strip input on change.
 *
 * @param {string=} $trigger_fun - Trigger event after change
 * @param {string=} $eventID - Event identification
 * @returns {jQuery}
 */
jQuery.fn.inputStripOnChange = function ($trigger_fun, $eventID) {

    if (isNullUndf($eventID)) $eventID = '';
    let $o = $(this[0]);
    $o.onReplace('change.inputStripOnChange' + $eventID, function () {
        /** @string */ let $val = $o.val();
        $o.val($.trim($val.toString()));
        if (notNullUndf($trigger_fun) && $trigger_fun !== '') $o.trigger($trigger_fun);
    });
    return this;

};

/**
 * Force uppercase on input on change.
 *
 * @param {string=} $trigger_fun - Trigger event after change
 * @param {string=} $eventID - Event identification
 * @returns {jQuery}
 */
jQuery.fn.inputUppercaseOnChange = function ($trigger_fun, $eventID) {

    if (isNullUndf($eventID)) $eventID = '';
    let $o = $(this[0]);
    $o.onReplace('change.inputUppercaseOnChange' + $eventID, function () {
        /** @string */ let $val = $o.val().toUpperCase();
        $o.val($val.toUpperCase());
        if (notNullUndf($trigger_fun) && $trigger_fun !== '') $o.trigger($trigger_fun);
    });
    $o.css('text-transform', 'uppercase');
    return this;

};

/**
 * Apply .is() with an array of items.
 *
 * @param {string[]} $arr_is
 * @returns {boolean}
 */
jQuery.fn.isArr = function ($arr_is) {

    let $o = $(this[0]);
    for (let $i = 0; $i < $arr_is.length; $i += 1) {
        if ($o.is($arr_is[$i])) return true;
    }
    return false;

};

/**
 * Returns true if the element is checked.
 *
 * @returns {boolean}
 */
jQuery.fn.isChecked = function () {

    let $o = $(this[0]);
    return $o.is(':checked');

};

/**
 * Get the n-parent of object.
 *
 * @param {number} $n
 * @returns {jQuery}
 */
jQuery.fn.nparent = function ($n) {

    let $parent = $(this[0]);
    let $newparent;
    for (let $i = 0; $i < $n; $i += 1) {
        $newparent = $parent.parent();
        if ($newparent.length !== 0) {
            $parent = $newparent;
        } else {
            break;
        }
    }
    return $parent;

};

/**
 * Add on handling replacing the previous event.
 *
 * @param {string} $ev
 * @param {function} $fun
 * @returns {jQuery}
 */
jQuery.fn.onReplace = function ($ev, $fun) {

    this.off($ev);
    this.on($ev, $fun);
    return this;

};

/**
 * Selects all the text of an element after a click.
 *
 * @returns {jQuery}
 */
jQuery.fn.selectAllTextOnClick = function () {

    let $o = $(this[0]);

    // Textarea type
    if ($o.is('textarea')) {
        // noinspection JSDeprecatedSymbols
        $o.focus(function () {
            let $this = $(this);
            // noinspection JSDeprecatedSymbols
            $this.select();

            // noinspection JSDeprecatedSymbols
            $this.mouseup(function () { // Work around Chrome's little problem
                // noinspection JSDeprecatedSymbols
                $this.unbind('mouseup'); // Prevent further mouseup intervention
                return false;
            });
        });
        return this;
    }

    $o.on(app_event.common.mouseup + '.selectAllText', function () {
        let $sel, $range;
        let $el = $(this)[0];
        if (window.getSelection && document.createRange) {
            $sel = window.getSelection();
            if ($sel.toString() === '') {
                window.setTimeout(function () {
                    $range = document.createRange();
                    $range.selectNodeContents($el);
                    $sel.removeAllRanges();
                    $sel.addRange($range);
                }, 1);
            }
        } else {
            if (document.selection) {
                $sel = document.selection.createRange();
                if ($sel.text === '') {
                    // noinspection JSUnresolvedFunction
                    $range = document.body.createTextRange();
                    // noinspection JSUnresolvedFunction
                    $range.moveToElementText($el);
                    $range.select();
                }
            }
        }
    });
    return this;

};

/**
 * Strip HTML from string.
 *
 * @param {string} $dirty_string
 * @returns {string}
 */
jQuery.fn.stripHTML = function ($dirty_string) {

    let $container = document.createElement('div');
    let $text = document.createTextNode($dirty_string);
    $container.appendChild($text);
    return $container.innerHTML; // innerHTML will be a xss safe string

};

/**
 * Tooltip.
 */
jQuery.fn.tooltipster = function () {
};

/**
 * Switch classes.
 *
 * @param {string} $from - Class selector to remove
 * @param {string} $to - New classes to add
 * @returns {jQuery}
 */
jQuery.fn.switchClass = function ($from, $to) {

    let $o = $(this[0]);
    $o.removeClass($from);
    $o.addClass($to);
    return this;

};

/**
 * Set value and focus an item.
 *
 * @param {string|number|boolean} $value
 * @returns {jQuery}
 */
jQuery.fn.valFocus = function ($value) {

    let $o = $(this[0]);
    $o.val($value.toString());
    // noinspection JSDeprecatedSymbols
    $o.focus();
    return this;

};

/**
 * Loads a stylesheet.
 *
 * @param {string[]} $href - CSS to load
 * @param {function=} $success - Success function
 * @param {function=} $fail - Fail function
 */
$.getStylesheet = function ($href, $success, $fail) {
    /* eslint prefer-spread:0 */
    /* eslint newline-per-chained-call:0 */
    // noinspection JSIgnoredPromiseFromCall
    $.when.apply($,
        $.map($href, function (url) {
            return $.get(url, function (css) {
                $('<style>' + css + '</style>').appendTo('head');
            });
        }),
    ).then(function () {
        if (typeof $success === 'function') $success();
    }).fail(function () {
        if (typeof $fail === 'function') $fail();
    });
};

/**
 * Extend scroll lock.
 */
$(function () {

    let _extendedScrollLock = function () {
        this._requested = false;
        this._lasthost = '';
        this.enable = function ($host) {
            if (this._requested) return;
            this._requested = true;
            this._lasthost = $host;
            $.scrollLock(true);
        };
        this.disable = function ($host) {
            if (!this._requested) return;
            if (this._lasthost !== $host) return;
            this._lasthost = '';
            this._requested = false;
            $.scrollLock(false);
        };
    };
    $.extScrollLock = new _extendedScrollLock();

});