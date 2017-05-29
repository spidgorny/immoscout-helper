var IS24 = (function () {
    function IS24() {
        var loc = document.location;
        var url = loc.protocol + '//' + loc.host + loc.pathname;
        console.log(loc);
        chrome.runtime.sendMessage({ url: url }, this.injectJSON.bind(this));
    }
    IS24.prototype.injectJSON = function (response) {
        console.log(response);
        console.log(window);
        var parent = document.querySelector('div.criteriagroup.print-two-columns');
        for (var key in response) {
            var val = response[key];
            var html = "<dl class=\"grid\">\n\t\t\t\t<dt class=\"is24qa-haustyp-label grid-item two-fifths\">\n\t\t\t\t" + key + "\n\t\t\t\t</dt><dd class=\"is24qa-haustyp grid-item three-fifths\">\n\t\t\t\t" + val + "\n\t\t\t\t</dd></dl>";
            var temp = document.createElement('div');
            temp.innerHTML = html;
            var htmlObject = temp.firstChild;
            console.log(htmlObject);
            parent.prepend(htmlObject);
        }
    };
    return IS24;
}());
new IS24();
