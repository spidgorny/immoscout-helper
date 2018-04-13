"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
        function (s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s), i, el = this;
            do {
                i = matches.length;
                while (--i >= 0 && matches.item(i) !== el) { }
                ;
            } while ((i < 0) && (el = el.parentElement));
            return el;
        };
}
var SearchResults = /** @class */ (function () {
    function SearchResults(document) {
        var _this = this;
        this.document = document;
        var resultList = this.document.querySelectorAll('ul.result-list');
        if (resultList.length) {
            this.render(resultList);
            for (var _i = 0, _a = Array.from(resultList); _i < _a.length; _i++) {
                var item = _a[_i];
                this.observeDOM(item, function () {
                    // console.log('dom changed');
                    _this.render(resultList);
                });
            }
        }
    }
    SearchResults.prototype.parseIntDE = function (val) {
        val = val.replace('.', '');
        val = val.replace(',', '.');
        return parseInt(val);
    };
    SearchResults.prototype.render = function (resultListSet) {
        for (var _i = 0, resultListSet_1 = resultListSet; _i < resultListSet_1.length; _i++) {
            var item = resultListSet_1[_i];
            this.renderOne(item);
        }
    };
    SearchResults.prototype.renderOne = function (list) {
        var articles = list.querySelectorAll('article');
        console.log('renderOne', articles.length);
        for (var _i = 0, _a = Array.from(articles); _i < _a.length; _i++) {
            var article = _a[_i];
            var dd = article.querySelectorAll('dd');
            var ppm = this.parseIntDE(dd[0].innerHTML) / parseInt(dd[1].innerHTML);
            // console.log(ppm);
            var dl = dd[0].closest('dl').closest('div.grid');
            dl.innerHTML += "\n  <dl class=\"grid-item result-list-entry__primary-criterion\">\n  <dd class=\"font-nowrap font-line-xs\">" + ppm.toFixed(2) + "</dd>\n  <dt class=\"font-s onlyLarge\">&euro;/m<sup>2</sup>\n  </dt>\n  </dl>";
        }
    };
    SearchResults.prototype.observeDOM = function (obj, callback) {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver, eventListenerSupported = window.addEventListener;
        if (MutationObserver) {
            // define a new observer
            var obs = new MutationObserver(function (mutations, observer) {
                if (mutations[0].addedNodes.length || mutations[0].removedNodes.length)
                    callback();
            });
            // have the observer observe foo for changes in children
            obs.observe(obj, {
                childList: true,
                subtree: false
            });
        }
        else if (eventListenerSupported) {
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    };
    return SearchResults;
}());
exports.SearchResults = SearchResults;
