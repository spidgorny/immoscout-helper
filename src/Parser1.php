<?php

namespace ImmoScout;

use Stringy\Stringy;

class Parser1 {

	public $content;
	public $proxy;
	protected $url;

	protected $soup;

	function __construct($url)
	{
		$url = str_replace('https://', 'http://', $url);
		$this->url = $url;
		$this->proxy = getenv('http_proxy');
		//echo $this->proxy, BR;
	}

	function render() {
		$this->content = $this->fetchData();
		$content['method'] = __METHOD__;
		$content['html_length'] = strlen($this->content);

		$data = \phpQuery::newDocument($this->content);
		$title = $data->find('h1#expose-title')->contents();
		$content['title'] = $title.'';

		$area = $data->find('dd.is24qa-wohnflaeche-ca');
		$content['area'] = $area->contents().'';

		$price = $data->find('dd.is24qa-kaufpreis');
		$price = SS::create($price->contents().'')->getNumber();
		$content['price'] = $price;

		$area = intval($area->contents().'');
		$content['price/m^2'] = number_format($price/$area, 2, '.', '');

		$content['price/m^2 %'] = number_format(($price/$area)/3500*100, 2, '.', '');

		$netto = null;
		$ausstattung = $data->find('pre.is24qa-ausstattung')->contents();
		$ausstattung = trimExplode("\n", $ausstattung);
//		print_r($ausstattung);
		foreach ($ausstattung as $line) {
			$line = SS::create($line);
			if ($line->containsAny(['Jahresnettomieteinnahme', 'einnahme'], false)) {
//				echo $line, BR;
				$netto = $line->getNumber();
			}
		}
		$content['Netto-einnahme'] = $netto;
		$content['Netto-einnahme in %'] = number_format($netto/$price*100, 2).'%';

		$constructed = $data->find('dd.is24qa-baujahr')->contents().'';
		$age = date('Y') - intval($constructed);
		$content['age'] = $age;

		$provision = $data->find('dd.is24qa-provision')->contents().'';
		$content['provision'] = $provision;

//		return implode(PHP_EOL, $content);
		return json_encode($content, JSON_PRETTY_PRINT);
	}

	function fetchData() {
		$hash = md5($this->url);
		$cache = __DIR__.'/../cache/'.$hash.'.cache';
		if (is_file($cache) && filesize($cache)) {
			$data = file_get_contents($cache);
		} else {
//			$data = $this->fetchFile();
			$data = $this->fetchGuzzle();
			file_put_contents($cache, $data);
		}
		return $data;
	}

	/**
	 * @return bool|string
	 * @deprecated
	 */
	function fetchFile() {
		$data = file_get_contents($this->url, false,
			stream_context_create([
				'http' => [
					'proxy' => $this->proxy,
				]
			]));
		return $data;
	}

	function fetchGuzzle() {
		$client = new \GuzzleHttp\Client();
		$res = $client->request('GET', $this->url);
		return $res->getBody()->getContents();
	}

}
