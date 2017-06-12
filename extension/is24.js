"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simpleParseNumber = require("simple-parse-number");
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
