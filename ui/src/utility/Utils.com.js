'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var monment = require('moment');

var isNum = exports.isNum = function isNum(n) {
    return !isNaN(n);
};
var capitalize = exports.capitalize = function capitalize(str) {
    if (typeof str !== 'string') throw '[Capitalize] typeof parameter [n] must be string';
    return str[0].toUpperCase() + str.slice(1);
};

var num2ToTime = exports.num2ToTime = function num2ToTime(date) {
    var newDate = void 0;
    if (isNum(date)) {
        // date= +date;
        date = monment.unix(date);
        console.log(date.toString());
    }
    return date;
};

num2ToTime("1501894770");
