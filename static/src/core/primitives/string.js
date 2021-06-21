/**
 STRING
 Extend string methods.
 */
"use strict";
/* eslint-disable no-extend-native */

// noinspection JSUnusedGlobalSymbols
/**
 * Get size of string in bytes.
 *
 * @this {String}
 * @returns {number}
 */
String.prototype.byteSize = function () {

    return new Blob([this]).size;

};

/**
 * Get ending char.
 *
 * @this {String}
 * @param {number=} $index
 * @returns {string}
 */
String.prototype.end = function ($index) {

    if (isNullUndf($index)) $index = 0;
    return this[this.length - 1 + $index];

};

/**
 * Format.
 */
if (!String.prototype.format) {

    /**
     * Format string as {n}.
     *
     * @this {String}
     * @returns {string}
     */
    String.prototype.format = function () {

        // eslint-disable-next-line
        let $args = arguments;
        return this.replace(/{(\d+)}/g, function ($match, $number) {
            return typeof $args[$number] !== 'undefined' ? $args[$number] : $match;
        });

    };

}

// noinspection JSUnusedGlobalSymbols
/**
 * Natural sort string with another.
 *
 * @this {String}
 * @param {string} $str
 * @returns {number}
 */
String.prototype.naturalSort = function ($str) {

    let _naturalSorter = function ($as, $bs) {
        let $a, $b, $a1, $b1, $n, $L;
        let $i = 0,
            $rx = /(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;
        if ($as === $bs) return 0;
        $a = $as.toLowerCase().match($rx);
        $b = $bs.toLowerCase().match($rx);
        $L = $a.length;
        while ($i < $L) {
            if (!$b[$i]) return 1;
            $a1 = $a[$i];
            $b1 = $b[$i += 1];
            if ($a1 !== $b1) {
                $n = $a1 - $b1;
                if (!isNaN($n)) return $n;
                return $a1 > $b1 ? 1 : -1;
            }
        }
        return $b[$i] ? -1 : 0;
    };
    return _naturalSorter(this, $str);

};

/**
 * Replace all.
 *
 * @this {String}
 * @param {string} $search
 * @param {string} $replacement
 * @returns {string}
 */
String.prototype.replaceMultiple = function ($search, $replacement) {

    let $target = this;
    return $target.replace(new RegExp($search, 'g'), $replacement);

};

/**
 * Get an attribute from key
 * @param $key
 * @returns {string|null}
 */
String.prototype.splitAttrGetKey = function ($key) {
    let $v = this;
    let $s = $v.split($key);
    if ($s.length < 2) {
        return null;
    }
    let $w = $s[1].split('"');
    if ($w.length < 2) {
        return null;
    }
    return $w[1];
}