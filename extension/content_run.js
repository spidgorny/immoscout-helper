/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var simpleParseNumber = __webpack_require__(2);
var IS24 = (function () {
    function IS24(document) {
        this.document = document;
        this.loc = this.document.location;
        //console.log(this.loc);
        var url = this.loc.protocol + '//' + this.loc.host + this.loc.pathname;
        //chrome.runtime.sendMessage({url: url}, this.injectJSON.bind(this));
        this.area = parseFloat(document.querySelector('dd.is24qa-wohnflaeche-ca').innerHTML);
        this.price = this.parseNumber(document.querySelector('dd.is24qa-kaufpreis').innerHTML);
        if (this.area) {
            this.price_per_m2 = Math.round(this.price / this.area);
        }
        this.injectJSON({
            'Area': this.area,
            'Price': this.price,
            'Price / m^2': this.price_per_m2,
        });
    }
    IS24.prototype.parseNumber = function (a) {
        return simpleParseNumber(a, { decimal: ',', grouping: '.' });
    };
    IS24.prototype.injectJSON = function (response) {
        // console.log(response);
        // console.log(window);
        var parent = this.document.querySelector('div.criteriagroup.print-two-columns');
        var originalFirstChild = parent.firstChild;
        for (var key in response) {
            var val = response[key];
            var html = "<dl class=\"grid\">\n\t\t\t\t<dt class=\"is24qa-haustyp-label grid-item two-fifths\">\n\t\t\t\t" + key + "\n\t\t\t\t</dt><dd class=\"is24qa-haustyp grid-item three-fifths\">\n\t\t\t\t" + val + "\n\t\t\t\t</dd></dl>";
            var temp = this.document.createElement('div');
            temp.innerHTML = html;
            var htmlObject = temp.firstChild;
            //console.log(htmlObject);
            //parent.prepend(htmlObject);
            parent.insertBefore(htmlObject, originalFirstChild);
        }
    };
    return IS24;
}());
exports.IS24 = IS24;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__is24_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__is24_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__is24_js__);


new __WEBPACK_IMPORTED_MODULE_0__is24_js__["IS24"](document);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var defaults = {
  grouping: ',',
  decimal: '.'
};
var regexp = /([.*+?^${}()|[\]\/\\])/g;

function escapeRegexp(s) {
  return s.replace(regexp, '\\$1');
}

function stripSymbols(s, grouping, decimal) {
  return s
    .replace(new RegExp(escapeRegexp(grouping), 'gm'), '')
    .replace(new RegExp(escapeRegexp(decimal), 'gm'), '.');
}

function parseNumber(s, options) {
  options = options || defaults;
  return parseFloat(stripSymbols(s, options.grouping, options.decimal));
}

module.exports = parseNumber;

/***/ })
/******/ ]);