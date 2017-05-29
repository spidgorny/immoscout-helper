class IS24 {

	constructor() {
		let loc = document.location;
		let url = loc.protocol + '//' + loc.host + loc.pathname;
		console.log(loc);
		chrome.runtime.sendMessage({url: url}, this.injectJSON.bind(this));
	}

	injectJSON(response) {
		console.log(response);
		console.log(window);
		let parent: HTMLDivElement
			= <HTMLDivElement> document.querySelector(
				'div.criteriagroup.print-two-columns');
		for (let key in response) {
			let val = response[key];

			let html = `<dl class="grid">
				<dt class="is24qa-haustyp-label grid-item two-fifths">
				${key}
				</dt><dd class="is24qa-haustyp grid-item three-fifths">
				${val}
				</dd></dl>`;

			let temp = document.createElement('div');
			temp.innerHTML = html;
			let htmlObject = temp.firstChild;
			console.log(htmlObject);

			parent.prepend(htmlObject);
		}
	}

}

new IS24();
