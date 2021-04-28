/**
 ARRAY
 Extend array methods.
 */
"use strict";
/* eslint-disable no-extend-native */

/**
 * Returns circular definition at index.
 *
 * @param {number} $index
 * @returns {*}
 */
Array.prototype.cycle = function ($index) {

    $index %= this.length;
    if ($index < 0) $index = this.length + $index;
    if ($index === this.length) $index = 0;
    return this[$index];

};

/**
 * Returns the last element of an array.
 *
 * @param {number=} $index
 * @returns {*}
 */
Array.prototype.end = function ($index) {

    if (isNullUndf($index)) $index = 0;
    return this[this.length - 1 + $index];

};

// noinspection JSUnusedGlobalSymbols
/**
 * Returns the maximum numerical element of the array.
 *
 * @returns {number}
 */
Array.prototype.getMax = function () {

    return Math.max.apply(null, this);

};

/**
 * Returns the mean value of numerical elements of the array.
 *
 * @returns {number}
 */
Array.prototype.getMean = function () {

    if (this.length === 0) return 0;
    return this.getSum() / this.length;

};

// noinspection JSUnusedGlobalSymbols
/**
 * Returns the median of the data.
 *
 * @returns {*}
 */
Array.prototype.getMedian = function () {

    let $mid = Math.floor(this.length / 2),
        $nums = [...this].sort((a, b) => a - b);
    return this.length % 2 !== 0 ? $nums[$mid] : $nums[$mid - 1];

};

// noinspection JSUnusedGlobalSymbols
/**
 * Returns the minimal numerical element of the array.
 *
 * @returns {number}
 */
Array.prototype.getMin = function () {

    return Math.min.apply(
        null,
        this,
    );

};

/**
 * Returns the standard deviation of the numerical elements of the array.
 *
 * @returns {number}
 */
Array.prototype.getStd = function () {

    let $avg = this.getMean();
    let $squareDiffs = this.map(function ($value) {
        let $diff = $value - $avg;
        return $diff * $diff;
    });
    return Math.sqrt($squareDiffs.getMean());

};

/**
 * Returns the sum of numerical element of the array.
 *
 * @returns {number}
 */
Array.prototype.getSum = function () {

    let $s = 0;
    for (let $i = 0; $i < this.length; $i += 1) {
        $s += this[$i];
    }
    return $s;

};

/**
 * Returns true if the array has the requested item.
 *
 * @param {*} $item
 * @returns {boolean}
 */
Array.prototype.hasItem = function ($item) {

    return this.indexOf($item) !== -1;

};

/**
 * Returns a random element of an array.
 *
 * @returns {*}
 */
Array.prototype.randomElement = function () {

    let $i = Math.floor(Math.random() * this.length);
    return this[$i];

};

// noinspection JSUnusedGlobalSymbols
/**
 * Remove all objects from array.
 *
 * @returns {Array}
 */
Array.prototype.removeAll = function () {

    let $i = this.length;
    for (let $j = 0; $j < $i; $j += 1) {
        this.splice(0, 1);
    }
    return this;

};

// noinspection JSUnusedGlobalSymbols
/**
 * Remove a certain item from the array.
 *
 * @param $item - Item to remove
 */
Array.prototype.removeItem = function ($item) {

    let $indx = this.indexOf($item);
    if ($indx !== -1) {
        this.splice($indx, 1);
        return true;
    }
    return false;

};

// noinspection JSUnusedGlobalSymbols
/**
 * Sort array composed by sub-arrays of two by the first element.
 *
 * @retuns {Array}
 */
Array.prototype.sort2ByFirst = function () {

    this.sort((a, b) => a[0] - b[0]);
    return this;

};

// noinspection JSUnusedGlobalSymbols
/**
 * Remove circular definition at index.
 *
 * @param {number} $index
 * @param {number=} $total
 */
Array.prototype.spliceCycle = function ($index, $total) {

    if (isNullUndf($total)) $total = 1;
    $total = Math.max(1, $total);
    $index %= this.length;
    if ($index < 0) $index = this.length + $index;
    if ($index === this.length) $index = 0;
    this.splice($index, $total);

};