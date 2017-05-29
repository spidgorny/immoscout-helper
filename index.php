<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once __DIR__.'/bootstrap.php';

$app = new \Slim\App([
	'settings' => [
		'displayErrorDetails' => true,
	],
]);
$app->get('/', function (Request $request, Response $response) {
	$response->getBody()->write('test');
	return $response;
});
$app->get('/hello/{name}', function (Request $request, Response $response) {
	$name = $request->getAttribute('name');
	$response->getBody()->write("Hello, $name".BR);
	$response->getBody()->write('<pre>'.print_r($_SERVER, true).'</pre>');

	return $response;
});
$app->get('/parse1/{url}', function (Request $request, Response $response) {
	$url = $request->getAttribute('url');
	$url = urldecode($url);
	$p = new \ImmoScout\Parser1($url);
	$content = $p->render();
	//$response->getBody()->write($content);
	$response = $response->withJson($content);
	return $response;
});
$app->run();
