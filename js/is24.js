"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simpleParseNumber = require("simple-parse-number");
var moment = require('moment');
var IS24 = /** @class */ (function () {
    function IS24(document) {
        this.document = document;
        this.loc = this.document.location;
        //console.log(this.loc);
        var url = this.loc.protocol + '//' + this.loc.host + this.loc.pathname;
        //chrome.runtime.sendMessage({url: url}, this.injectJSON.bind(this));
        if (document.querySelector('div.is24-ex-details')) {
            this.render();
        }
    }
    IS24.prototype.log = function (code, value) {
        console.log(code, value);
    };
    IS24.prototype.render = function () {
        this.area = parseFloat(document.querySelector('dd.is24qa-wohnflaeche-ca').innerHTML);
        this.log('area', this.area);
        var kaufpreis = document.querySelector('dd.is24qa-kaufpreis');
        if (kaufpreis) {
            this.price = this.parseNumber(kaufpreis.innerHTML);
        }
        var kaltmiete = document.querySelector('dd.is24qa-kaltmiete');
        if (!this.price && kaltmiete) {
            this.price = this.parseNumber(kaltmiete.innerHTML);
        }
        this.log('price', this.price);
        if (this.area) {
            this.price_per_m2 = (this.price / this.area).toFixed(2);
        }
        this.log('ppm', this.price_per_m2);
        var baujahr = document.querySelector('dd.is24qa-baujahr');
        if (baujahr) {
            this.built = parseInt(baujahr.innerHTML);
            this.log('built', this.built);
            if (this.built) {
                var startDate = new Date(this.built, 1, 1);
                var endDate = new Date();
                this.age = moment.duration(endDate.getTime() - startDate.getTime()).years();
                this.log('age', this.age);
            }
        }
        var set = {
            // 'Area': this.area + ' m<sup>2</sup>',
            // 'Price': this.price + ' &euro;',
            'Price / m^2': this.price_per_m2 + ' &euro;',
        };
        if (this.age) {
            set['Age'] = this.age + ' years';
        }
        this.injectJSON(set);
    };
    IS24.prototype.parseNumber = function (a) {
        return simpleParseNumber(a, { decimal: ',', grouping: '.' });
    };
    IS24.prototype.injectJSON = function (response) {
        // console.log(response);
        // console.log(window);
        var parent = this.document.querySelector('div.criteriagroup.main-criteria-container');
        this.log('parent', parent);
        if (parent) {
            var originalOnlyDivs = Array.from(parent.childNodes)
                .filter(function (node) { return node.nodeType == Node.ELEMENT_NODE; });
            var originalFirstChild = originalOnlyDivs[originalOnlyDivs.length - 1];
            this.log('originalFirstChild', originalFirstChild);
            for (var key in response) {
                var val = response[key];
                // should not have EOL because firstChild below
                var html = "<div class=\"mainCriteria flex-item margin-vertical-xs\"> \n\t<div class=\"is24qa-ppm is24-value font-semibold\"> " + val + " </div>\n\t<div class=\"is24qa-ppm-label is24-label font-s\"> " + key + " </div> </div>";
                var temp = this.document.createElement('div');
                temp.innerHTML = html;
                var onlyDivs = Array.from(temp.childNodes)
                    .filter(function (node) {
                    return node.nodeType == Node.ELEMENT_NODE;
                });
                var htmlObject = onlyDivs[onlyDivs.length - 1];
                this.log('htmlObject', htmlObject);
                //parent.prepend(htmlObject);
                parent.insertBefore(htmlObject, null);
            }
        }
    };
    return IS24;
}());
exports.IS24 = IS24;
