<?php

namespace ImmoScout;


use Stringy\Stringy;

class SS extends Stringy
{

	function getNumber()
	{
//		preg_match('/([0-9.]+)/', $this->str, $matches);
		preg_match('/((?:[0-9]+,)*[0-9]+(?:\.[0-9]+)?)/', $this->str, $matches);
//		print_r($matches);
		$longest = array_reduce($matches, function ($a, $b) {
			return strlen($a) > strlen($b) ? $a : $b;
		});
		$longest = str_replace('.', '', $longest);
		$longest = intval($longest);
		return $longest;
	}

}
