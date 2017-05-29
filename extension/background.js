var Background = (function () {
    function Background() {
        chrome.runtime.onMessage.addListener(this.startEvent.bind(this));
    }
    Background.prototype.startEvent = function (request, sender, sendResponse) {
        var url = request.url;
        var promise = this.fetchInfo(url);
        promise.then(function (json) {
            console.log(json);
            sendResponse(json);
        });
        return true; // async
    };
    Background.prototype.fetchInfo = function (url) {
        console.log('fetchInfo', url);
        url = encodeURIComponent(url);
        url = encodeURIComponent(url);
        return fetch('http://localhost:8081/slawa/immoscout/parse1/' + url, {})
            .then(function (data) {
            console.log(data);
            return data.json();
        })
            .then(function (json) {
            console.log(json);
            return json;
        })
            .catch(function (e) {
            console.error(e);
        });
    };
    return Background;
}());
new Background();
