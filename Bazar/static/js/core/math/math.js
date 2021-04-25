/**
 MATH
 Auxiliary math functions.
 */
"use strict";

/**
 * Returns the distance between two points in 2D (x1,y1)-(x2,y2).
 *
 * @this {Math}
 * @param {number} $x1
 * @param {number} $y1
 * @param {number=} $x2
 * @param {number=} $y2
 * @returns {number}
 */
Math.dist2 = function ($x1, $y1, $x2, $y2) {

    if (isNullUndf($x2)) $x2 = 0;
    if (isNullUndf($y2)) $y2 = 0;
    return Math.sqrt(Math.pow($x1 - $x2, 2) + Math.pow($y1 - $y2, 2));

};

/**
 * Distance between two points in 3D (x1,y1,z1)-(x2,y2,z2).
 *
 * @this {Math}
 * @param $x1 {number}
 * @param $y1 {number}
 * @param $z1 {number}
 * @param $x2 {number=}
 * @param $y2 {number=}
 * @param $z2 {number=}
 * @returns {number}
 */
Math.dist3 = function ($x1, $y1, $z1, $x2, $y2, $z2) {

    if (isNullUndf($x2)) $x2 = 0;
    if (isNullUndf($y2)) $y2 = 0;
    if (isNullUndf($z2)) $z2 = 0;
    return Math.sqrt(Math.pow($x1 - $x2, 2) + Math.pow($y1 - $y2, 2) + Math.pow($z1 - $z2, 2));

};

/**
 * Returns a random number between two numbers.
 *
 * @this {Math}
 * @param {number} $min - Min value
 * @param {number} $max - Max value
 * @returns {int}
 */
Math.getRandomInt = function ($min, $max) {

    if ($min > $max) return $min;
    return Math.floor(Math.random() * ($max - $min + 1)) + $min;

};

/**
 * Returns true if number is float.
 *
 * @this {Math}
 * @param {string|number} $n
 * @returns {boolean}
 */
Math.isFloat = function ($n) {

    let $float = parseFloat($n);
    return !isNaN($float) &&
        Number($n) === $float &&
        $float % 1 !== 0 &&
        !isNaN(Math.roundNumber($n, 0));

};

/**
 * Returns true if number is integer.
 *
 * @this {Math}
 * @param {string|number} $n
 * @returns {boolean}
 */
Math.isInt = function ($n) {

    $n = parseInt($n, 10);
    return !isNaN($n) && Number($n) === $n && $n % 1 === 0;

};

/**
 * Rounds an angle with a base of PI (fraction from 0+ to 1) and a tolerance.
 *
 * @this {Math}
 * @param {number} $angle - Any angle from -inf, inf
 * @param {number} $base - Base, must be greater than zero and lower than 1, this factor will me multiplied by Math.PI
 * @param {number} $tol - Tolerance
 * @returns {number} Angle from -2PI to 2PI
 */
Math.roundAngle = function ($angle, $base, $tol) {

    if ($base <= 0 || $base > 1) return Number.NaN;
    let $sgn_angle = Math.sign($angle);
    let $base_angle = Math.PI * $base;
    $angle = Math.abs($angle);
    let $steps = Math.ceil(2 * Math.PI / $base_angle);
    for (let $i = 0; $i <= $steps; $i += 1) {
        if (Math.abs(($base_angle * $i) - Math.abs($angle)) < $tol) {
            $angle = $base_angle * $i * $sgn_angle;
            break;
        }
    }
    return $angle;

};

/**
 * Rounds a number.
 *
 * @this {Math}
 * @param {number|number[]|string|string[]} $num - Number
 * @param {number=} $scale - Scale
 * @param {number=} $tram - Round by size of tram
 * @returns {number|number[]}
 */
Math.roundNumber = function ($num, $scale, $tram) {
    /* eslint no-implicit-coercion:"off" */

    if (Array.isArray($num)) {
        let $results = [];
        for (let $i = 0; $i < $num.length; $i += 1) {
            $results.push(Math.roundNumber($num[$i], $scale, $tram));
        }
        return $results;
    }

    // if Tram is zero
    if ($tram === 0) {
        return Math.roundNumber($num, $scale);
    }

    // If string
    if (isString($num)) $num = parseFloat($num);

    // Add or subtract tram
    if (notNullUndf($tram) && $tram > 0) {
        let $delta = $tram - ($num % $tram);
        if ($delta < 0.5 * $tram) {
            $num += $delta;
        } else {
            $num -= $num % $tram;
        }
    }

    if (isNullUndf($scale)) $scale = 0;
    if (!('' + $num).includes('e')) {
        // noinspection JSCheckFunctionSignatures
        return +Number(Math.round($num + 'e+' + $scale) + 'e-' + $scale);
    }
    let $arr = ('' + $num).split('e');
    let $sig = '';
    if (+$arr[1] + $scale > 0) {
        $sig = '+';
    }
    let $i = +$arr[0] + 'e' + $sig + (+$arr[1] + $scale);
    // noinspection JSCheckFunctionSignatures
    return +(Math.round($i) + 'e-' + $scale);

};