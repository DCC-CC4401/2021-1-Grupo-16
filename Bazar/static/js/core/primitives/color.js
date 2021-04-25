/**
 COLOR
 Color auxiliary functions.
 */
"use strict";

/**
 * Global color method.
 * @global
 * @const
 */
const ColorLib = {};

/**
 * Returns a random color.
 *
 * @this {ColorLib}
 * @returns {string}
 */
ColorLib.getRandomColor = function () {

    let $letters = '0123456789ABCDEF';
    let $color = '#';
    for (let $i = 0; $i < 6; $i += 1) {
        $color += $letters[Math.floor(Math.random() * 16)];
    }
    return $color;

};

/**
 * Returns true/false if string is a color.
 *
 * @this {ColorLib}
 * @param {object} $color - Color
 * @returns boolean
 */
ColorLib.isColor = function ($color) {

    return typeof $color === 'string' && $color.length === 7 && $color[0] === '#';

};

/**
 * Parse string to a color.
 *
 * @this {ColorLib}
 * @param {string} $string
 * @returns {string}
 */
ColorLib.parseToColor = function ($string) {

    $string = $string.toString();
    if ($string[0] !== '#') $string = '#' + $string;
    $string += '000000'; // 6
    return $string.substring(
        0,
        7,
    );

};

/**
 * Color shading.
 *
 * @this {ColorLib}
 * @param {number} $percentage - Percentage float (-1.0,1.0)
 * @param {string} $from_color - From color (string) as #ffffff
 * @param {string=} $to_color - To color
 * @param {boolean=} $use_linear - Use linear
 * @returns {string|null}
 */
ColorLib.pSBC = ($percentage, $from_color, $to_color, $use_linear) => {
    /* eslint-disable */

    $from_color = ColorLib.parseToColor($from_color);
    $to_color = ColorLib.parseToColor($to_color);
    let $r,
        $g,
        $b,
        $P,
        $f,
        $t,
        $h,
        $i = parseInt,
        $m = Math.round,
        $a = typeof ($to_color) == 'string';

    if (typeof ($percentage) != 'number' || $percentage < -1 || $percentage > 1 || typeof ($from_color) != 'string' || ($from_color[0] !== 'r' && $from_color[0] !== '#') || ($to_color && !$a)) return null;

    // noinspection JSUnresolvedVariable
    if (!this.pSBCr) this.pSBCr = ($d) => {
        let $n = $d.length, $x = {};

        if ($n > 9) {

            [$r, $g, $b, $a] = $d = $d.split(',');
            $n = $d.length;
            if ($n < 3 || $n > 4) return null;
            $x.r = $i($r[3] === 'a' ? $r.slice(5) : $r.slice(4));
            $x.g = $i($g);
            $x.b = $i($b);
            $x.a = $a ? parseFloat($a.toString()) : -1;

        } else {

            if ($n === 8 || $n === 6 || $n < 4) return null;
            if ($n < 6) $d = '#' + $d[1] + $d[1] + $d[2] + $d[2] + $d[3] + $d[3] + ($n > 4 ? $d[4] + $d[4] : '');
            $d = $i($d.slice(1), 16);
            if ($n === 9 || $n === 5) {
                $x.r = $d >> 24 & 255;
                $x.g = $d >> 16 & 255;
                $x.b = $d >> 8 & 255;
                $x.a = $m(($d & 255) / 0.255) / 1000;
            } else {
                $x.r = $d >> 16;
                $x.g = $d >> 8 & 255;
                $x.b = $d & 255;
                $x.a = -1;
            }

        }
        return $x
    };

    $h = $from_color.length > 9;
    $h = $a ? $to_color.length > 9 ? true : $to_color === 'c' ? !$h : false : $h;
    $f = pSBCr($from_color);
    $P = $percentage < 0;
    $t = $to_color && $to_color !== 'c' ? pSBCr($to_color) : $P ? {
        r: 0,
        g: 0,
        b: 0,
        a: -1
    } : {r: 255, g: 255, b: 255, a: -1};
    $percentage = $P ? $percentage * -1 : $percentage;
    $P = 1 - $percentage;

    if (!$f || !$t) return null;
    if ($use_linear) {

        $r = $m($P * $f.r + $percentage * $t.r);
        $g = $m($P * $f.g + $percentage * $t.g);
        $b = $m($P * $f.b + $percentage * $t.b);

    } else {

        $r = $m(($P * $f.r ** 2 + $percentage * $t.r ** 2) ** 0.5);
        $g = $m(($P * $f.g ** 2 + $percentage * $t.g ** 2) ** 0.5);
        $b = $m(($P * $f.b ** 2 + $percentage * $t.b ** 2) ** 0.5);

    }

    $a = $f.a;
    $t = $t.a;
    $f = $a >= 0 || $t >= 0;
    $a = $f ? $a < 0 ? $t : $t < 0 ? $a : $a * $P + $t * $percentage : 0;
    if ($h) return 'rgb' + ($f ? 'a(' : '(') + $r + ',' + $g + ',' + $b + ($f ? ',' + $m($a * 1000) / 1000 : '') + ')';
    else return '#' + (4294967296 + $r * 16777216 + $g * 65536 + $b * 256 + ($f ? $m($a * 255) : 0)).toString(16).slice(1, $f ? undefined : -2);

};

/**
 * Converts a color from hex to RGBA.
 *
 * @this {ColorLib}
 * @param {string} $hex - Color in hex
 * @param {number=} $opacity - Opacity
 * @returns {string}
 */
ColorLib.convertHexColorRGBA = function ($hex, $opacity) {

    $hex = $hex.replace('#', '');
    let $r = parseInt($hex.substring(0, 2), 16);
    let $g = parseInt($hex.substring(2, 4), 16);
    let $b = parseInt($hex.substring(4, 6), 16);
    if (notNullUndf($opacity) && !isNaN($opacity)) {
        return 'rgba(' + $r + ',' + $g + ',' + $b + ',' + $opacity + ')';
    }
    return 'rgb(' + $r + ',' + $g + ',' + $b + ')';

};