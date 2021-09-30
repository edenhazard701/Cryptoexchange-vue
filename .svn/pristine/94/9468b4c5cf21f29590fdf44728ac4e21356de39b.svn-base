(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.fromExponential = factory());
}(this, (function () { 'use strict';

    /**
     * Return two parts array of exponential number
     * @param {number|string|Array} num
     * @return {string[]}
     */
    function getExponentialParts(num) {
      return Array.isArray(num) ? num : String(num).split(/[eE]/);
    }

    /**
     *
     * @param {number|string|Array} num - number or array of its parts
     */
    function isExponential(num) {
      var eParts = getExponentialParts(num);
      return !Number.isNaN(Number(eParts[1]));
    }

    /**
     * Converts exponential notation to a human readable string
     * @param {number|string|Array} num - number or array of its parts
     * @return {string}
     */
    function fromExponential(num) {
        var eParts = getExponentialParts(num);
        if (!isExponential(eParts)) {
            return eParts[0];
        }

        var sign = eParts[0][0] === '-' ? '-' : '';
        var digits = eParts[0].replace(/^-/, '');
        var digitsParts = digits.split('.');
        var wholeDigits = digitsParts[0];
        var fractionDigits = digitsParts[1] || '';
        var e = Number(eParts[1]);

        if (e === 0) {
            return sign + wholeDigits + '.' + fractionDigits;
        } else if (e < 0) {
            // move dot to the left
            var countWholeAfterTransform = wholeDigits.length + e;
            if (countWholeAfterTransform > 0) {
                // transform whole to fraction
                var wholeDigitsAfterTransform = wholeDigits.substr(0, countWholeAfterTransform);
                var wholeDigitsTransformedToFracton = wholeDigits.substr(countWholeAfterTransform);
                return sign + wholeDigitsAfterTransform + '.' + wholeDigitsTransformedToFracton + fractionDigits;
            } else {
                // not enough whole digits: prepend with fractional zeros

                // first e goes to dotted zero
                var zeros = '0.';
                e += 1;
                while (e) {
                    zeros += '0';
                    e += 1;
                }
                return sign + zeros + wholeDigits + fractionDigits;
            }
        } else {
            // move dot to the right
            var countFractionAfterTransform = fractionDigits.length - e;
            if (countFractionAfterTransform > 0) {
                // transform fraction to whole
                // countTransformedFractionToWhole = e
                var fractionDigitsAfterTransform = fractionDigits.substr(e);
                var fractionDigitsTransformedToWhole = fractionDigits.substr(0, e);
                return sign + wholeDigits + fractionDigitsTransformedToWhole + '.' + fractionDigitsAfterTransform;
            } else {
                // not enough fractions: append whole zeros
                var zerosCount = -countFractionAfterTransform;
                var _zeros = '';
                while (zerosCount) {
                    _zeros += '0';
                    zerosCount -= 1;
                }
                return sign + wholeDigits + fractionDigits + _zeros;
            }
        }
    }

    return fromExponential;

})));
