import * as fs from "fs";
import {IS24} from '../extension/is24';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const test = require('tape');

if (true) {
	test('timing test', function (t) {
		// t.plan(2);

		t.equal(typeof Date.now, 'function');
		let start = Date.now();

		setTimeout(function () {
			t.ok((Date.now() - start) >= 100);
		}, 100);

		t.end();
	});
}

test('is24', t => {
	let fixture = fs.readFileSync('tests/fixture/Voll vermietetes Mehrfamilienhaus in zentraler Lage von Alt-Griesheim!.html');

	const dom = new JSDOM(fixture, {
		runScripts: "outside-only"
	});

	let title = dom.window.document.querySelector("title").textContent;
	t.equal(title, 'Voll vermietetes Mehrfamilienhaus in zentraler Lage von Alt-Griesheim!', 'title match');

	((window, document) => {
		// console.log(document.location);
		const is = new IS24(document);
		t.equal(is.loc.toString(), 'about:blank');

		t.equal(is.area, 281);
		t.equal(is.price, 699000);
		t.equal(is.price_per_m2, 2488);

		let fields = [];
		const dlList = document.querySelectorAll('div.criteriagroup.print-two-columns dl.grid');
		for (let i in dlList) {
			if (dlList.hasOwnProperty(i)) {
				let dl = dlList[i];
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
