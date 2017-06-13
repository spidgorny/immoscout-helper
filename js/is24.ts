const simpleParseNumber = require("simple-parse-number");
const moment = require('moment');

export class IS24 {

	document: Document;

	loc: Location;

	area: number;

	price: number;

	price_per_m2: number;

	built: number;

	age: number;

	constructor(document) {
		this.document = document;
		this.loc = this.document.location;
		//console.log(this.loc);
		let url = this.loc.protocol + '//' + this.loc.host + this.loc.pathname;
		//chrome.runtime.sendMessage({url: url}, this.injectJSON.bind(this));

		this.area = parseFloat(
			document.querySelector('dd.is24qa-wohnflaeche-ca').innerHTML);
		let kaufpreis = document.querySelector('dd.is24qa-kaufpreis');
		if (kaufpreis) {
			this.price = this.parseNumber(kaufpreis.innerHTML);
		}
		let kaltmiete = document.querySelector('dd.is24qa-kaltmiete');
		if (!this.price && kaltmiete) {
			this.price = this.parseNumber(kaltmiete.innerHTML);
		}
		if (this.area) {
			this.price_per_m2 = Math.round(this.price / this.area);
		}
		this.built = parseInt(
			document.querySelector('dd.is24qa-baujahr').innerHTML);
		if (this.built) {
			const startDate = new Date(this.built, 1, 1);
			let endDate = new Date();
			this.age = moment.duration(endDate.getTime() - startDate.getTime()).years();
		}

		this.injectJSON({
			'Area': this.area + ' m<sup>2</sup>',
			'Price': this.price + ' &euro;',
			'Price / m^2': this.price_per_m2 + ' &euro;',
			'Age': this.age + ' years',
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
