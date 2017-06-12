const simpleParseNumber = require("simple-parse-number");

export class IS24 {

	document: Document;

	loc: Location;

	area: number;

	price: number;

	price_per_m2: number;

	constructor(document) {
		this.document = document;
		this.loc = this.document.location;
		//console.log(this.loc);
		let url = this.loc.protocol + '//' + this.loc.host + this.loc.pathname;
		//chrome.runtime.sendMessage({url: url}, this.injectJSON.bind(this));

		this.area = parseFloat(
			document.querySelector('dd.is24qa-wohnflaeche-ca').innerHTML);
		this.price = this.parseNumber(
			document.querySelector('dd.is24qa-kaufpreis').innerHTML);
		if (this.area) {
			this.price_per_m2 = Math.round(this.price / this.area);
		}

		this.injectJSON({
			'Area': this.area,
			'Price': this.price,
			'Price / m^2': this.price_per_m2,
		});
	}

	parseNumber(a) {
		return simpleParseNumber(a, { decimal: ',', grouping: '.' });
	}

	injectJSON(response) {
		// console.log(response);
		// console.log(window);
		let parent: HTMLDivElement
			= <HTMLDivElement> this.document.querySelector(
				'div.criteriagroup.print-two-columns');
		let originalFirstChild = parent.firstChild;
		for (let key in response) {
			let val = response[key];

			let html = `<dl class="grid">
				<dt class="is24qa-haustyp-label grid-item two-fifths">
				${key}
				</dt><dd class="is24qa-haustyp grid-item three-fifths">
				${val}
				</dd></dl>`;

			let temp = this.document.createElement('div');
			temp.innerHTML = html;
			let htmlObject = temp.firstChild;
			//console.log(htmlObject);

			//parent.prepend(htmlObject);
			parent.insertBefore(htmlObject, originalFirstChild);
		}
	}

}

