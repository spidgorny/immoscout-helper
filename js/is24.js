"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simpleParseNumber = require("simple-parse-number");
var moment = require('moment');
var IS24 = (function () {
    function IS24(document) {
        this.document = document;
        this.loc = this.document.location;
        //console.log(this.loc);
        var url = this.loc.protocol + '//' + this.loc.host + this.loc.pathname;
        //chrome.runtime.sendMessage({url: url}, this.injectJSON.bind(this));
        this.area = parseFloat(document.querySelector('dd.is24qa-wohnflaeche-ca').innerHTML);
        var kaufpreis = document.querySelector('dd.is24qa-kaufpreis');
        if (kaufpreis) {
            this.price = this.parseNumber(kaufpreis.innerHTML);
        }
        var kaltmiete = document.querySelector('dd.is24qa-kaltmiete');
        if (!this.price && kaltmiete) {
            this.price = this.parseNumber(kaltmiete.innerHTML);
        }
        if (this.area) {
            this.price_per_m2 = Math.round(this.price / this.area);
        }
        this.built = parseInt(document.querySelector('dd.is24qa-baujahr').innerHTML);
        if (this.built) {
            var startDate = new Date(this.built, 1, 1);
            var endDate = new Date();
            this.age = moment.duration(endDate.getTime() - startDate.getTime()).years();
        }
        this.injectJSON({
            'Area': this.area + ' m<sup>2</sup>',
            'Price': this.price + ' &euro;',
            'Price / m^2': this.price_per_m2 + ' &euro;',
            'Age': this.age + ' years',
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
