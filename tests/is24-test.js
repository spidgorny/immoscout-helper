"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var is24_1 = require("../extension/is24");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
var test = require('tape');
if (true) {
    test('timing test', function (t) {
        // t.plan(2);
        t.equal(typeof Date.now, 'function');
        var start = Date.now();
        setTimeout(function () {
            t.ok((Date.now() - start) >= 100);
        }, 100);
        t.end();
    });
}
test('is24', function (t) {
    var fixture = fs.readFileSync('tests/fixture/Voll vermietetes Mehrfamilienhaus in zentraler Lage von Alt-Griesheim!.html');
    var dom = new JSDOM(fixture, {
        runScripts: "outside-only"
    });
    var title = dom.window.document.querySelector("title").textContent;
    t.equal(title, 'Voll vermietetes Mehrfamilienhaus in zentraler Lage von Alt-Griesheim!', 'title match');
    (function (window, document) {
        // console.log(document.location);
        var is = new is24_1.IS24(document);
        t.equal(is.loc.toString(), 'about:blank');
        t.equal(is.area, 281);
        t.equal(is.price, 699000);
        t.equal(is.price_per_m2, 2488);
        var fields = [];
        var dlList = document.querySelectorAll('div.criteriagroup.print-two-columns dl.grid');
        for (var i in dlList) {
            if (dlList.hasOwnProperty(i)) {
                var dl = dlList[i];
                // console.log(i, dl);
                fields.push(dl.querySelector('dt').innerHTML.trim());
            }
        }
        // console.log(fields);
        t.equal(fields[0], 'Area');
        t.equal(fields[1], 'Price');
        t.equal(fields[2], 'Price / m^2');
    })(dom.window, dom.window.document);
    t.end();
});
