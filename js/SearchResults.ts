if (window.Element && !Element.prototype.closest) {
	Element.prototype.closest =
		function(s) {
			var matches = (this.document || this.ownerDocument).querySelectorAll(s),
				i,
				el = this;
			do {
				i = matches.length;
				while (--i >= 0 && matches.item(i) !== el) {};
			} while ((i < 0) && (el = el.parentElement));
			return el;
		};
}

export class SearchResults {

	document: Document;

	constructor(document) {
		this.document = document;

		const resultList = this.document.querySelectorAll('ul.result-list');
		if (resultList.length) {
			this.render(resultList);

			for (let item of Array.from(resultList)) {
				this.observeDOM(item, () => {
					// console.log('dom changed');
					this.render(resultList);
				});
			}
		}
	}

	parseIntDE(val) {
		val = val.replace('.', '');
		val = val.replace(',', '.');
		return parseInt(val);
	}

	render(resultListSet) {
		for (let item of resultListSet) {
			this.renderOne(item);
		}
	}

	renderOne(list: HTMLUListElement) {
		const articles = list.querySelectorAll('article');
		console.log('renderOne', articles.length);
		for (let article of Array.from(articles)) {
			const dd = article.querySelectorAll('dd');
			const ppm = this.parseIntDE(dd[0].innerHTML) / parseInt(dd[1].innerHTML);
			// console.log(ppm);
			const dl = dd[0].closest('dl').closest('div.grid');
			dl.innerHTML += `
  <dl class="grid-item result-list-entry__primary-criterion">
  <dd class="font-nowrap font-line-xs">${ppm.toFixed(2)}</dd>
  <dt class="font-s onlyLarge">&euro;/m<sup>2</sup>
  </dt>
  </dl>`;
		}
	}

	observeDOM(obj, callback) {
		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
			eventListenerSupported = window.addEventListener;

		if( MutationObserver ){
			// define a new observer
			var obs = new MutationObserver(function(mutations, observer){
				if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
					callback();
			});
			// have the observer observe foo for changes in children
			obs.observe( obj, {
				childList:true,
				subtree:false
			});
		}
		else if( eventListenerSupported ){
			obj.addEventListener('DOMNodeInserted', callback, false);
			obj.addEventListener('DOMNodeRemoved', callback, false);
		}
	}

}
