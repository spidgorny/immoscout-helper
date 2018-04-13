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

		if (document.querySelector('div.is24-ex-details')) {
			this.render();
		}
	}

	log(code: string, value: any) {
		console.log(code, value);
	}

	render() {
		this.area = parseFloat(
			document.querySelector('dd.is24qa-wohnflaeche-ca').innerHTML);
		this.log('area', this.area);

		let kaufpreis = document.querySelector('dd.is24qa-kaufpreis');
		if (kaufpreis) {
			this.price = this.parseNumber(kaufpreis.innerHTML);
		}
		let kaltmiete = document.querySelector('dd.is24qa-kaltmiete');
		if (!this.price && kaltmiete) {
			this.price = this.parseNumber(kaltmiete.innerHTML);
		}
		this.log('price', this.price);

		if (this.area) {
			this.price_per_m2 = (this.price / this.area).toFixed(2);
		}
		this.log('ppm', this.price_per_m2);

		let baujahr = document.querySelector('dd.is24qa-baujahr');
		if (baujahr) {
			this.built = parseInt(baujahr.innerHTML);
			this.log('built', this.built);

			if (this.built) {
				const startDate = new Date(this.built, 1, 1);
				let endDate = new Date();
				this.age = moment.duration(endDate.getTime() - startDate.getTime()).years();
				this.log('age', this.age);
			}
		}

		const set = {
			// 'Area': this.area + ' m<sup>2</sup>',
			// 'Price': this.price + ' &euro;',
			'Price / m^2': this.price_per_m2 + ' &euro;',
		};
		if (this.age) {
			set['Age'] = this.age + ' years';
		}
		this.injectJSON(set);
	}

	parseNumber(a) {
		return simpleParseNumber(a, {decimal: ',', grouping: '.'});
	}

	injectJSON(response) {
		// console.log(response);
		// console.log(window);
		let parent: HTMLDivElement
			= <HTMLDivElement> this.document.querySelector(
			'div.criteriagroup.main-criteria-container');
		this.log('parent', parent);
		if (parent) {
			let originalOnlyDivs = Array.from(parent.childNodes)
				.filter(node => node.nodeType == Node.ELEMENT_NODE);
			let originalFirstChild = originalOnlyDivs[originalOnlyDivs.length-1];
			this.log('originalFirstChild', originalFirstChild);
			for (let key in response) {
				let val = response[key];

				// should not have EOL because firstChild below
				let html = `<div class="mainCriteria flex-item margin-vertical-xs"> 
	<div class="is24qa-ppm is24-value font-semibold"> ${val} </div>
	<div class="is24qa-ppm-label is24-label font-s"> ${key} </div> </div>`;

				let temp = this.document.createElement('div');
				temp.innerHTML = html;
				let onlyDivs = Array.from(temp.childNodes)
					.filter(node => {
					return node.nodeType == Node.ELEMENT_NODE;
				});

				let htmlObject = onlyDivs[onlyDivs.length-1];
				this.log('htmlObject', htmlObject);

				//parent.prepend(htmlObject);
				parent.insertBefore(htmlObject, null);
			}
		}
	}

}
