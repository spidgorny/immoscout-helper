class Background {

	constructor() {
		chrome.runtime.onMessage.addListener(this.startEvent.bind(this));
	}

	startEvent(request, sender, sendResponse) {
		const url = request.url;
		let promise = this.fetchInfo(url);
		promise.then(json => {
			console.log(json);
			sendResponse(json);
		});
		return true;	// async
	}

	fetchInfo(url) {
		console.log('fetchInfo', url);
		url = encodeURIComponent(url);
		url = encodeURIComponent(url);
		return fetch('http://localhost:8081/slawa/immoscout/parse1/'+url, {
			// mode: 'no-cors'
		})
			.then(data => {
				console.log(data);
				return data.json();
			})
			.then(json => {
				console.log(json);
				return json;
			})
			.catch(e => {
				console.error(e);
			});
	}

}

new Background();
