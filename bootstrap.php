<?php

require_once __DIR__.'/vendor/autoload.php';

define('BR', "<br />\n");

function trimExplode($separator, $text)
{
	return
		array_filter(
			array_map('trim',
				explode($separator, $text)
			)
		);
}
