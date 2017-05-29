<?php

require_once __DIR__.'/bootstrap.php';

$url = 'https://www.immobilienscout24.de/expose/95587838?referrer=RESULT_LIST_LISTING&navigationServiceUrl=%2FSuche%2Fcontroller%2FexposeNavigation%2Fnavigate.go%3FsearchUrl%3D%2FSuche%2FS-T%2FHaus-Kauf%2FHessen%2FFrankfurt-am-Main%2F-%2F-%2F200%2C00-%2FEURO--1500000%2C00%2F-%2F-%2F-%2F21%26exposeId%3D95587838&navigationHasPrev=true&navigationHasNext=true&navigationBarType=RESULT_LIST&searchId=a0c9aa79-56cd-322b-a647-6f078bd77ee7';
$url = 'https://www.immobilienscout24.de/expose/95656776?referrer=RESULT_LIST_LISTING&navigationServiceUrl=%2FSuche%2Fcontroller%2FexposeNavigation%2Fnavigate.go%3FsearchUrl%3D%2FSuche%2FS-T%2FHaus-Kauf%2FHessen%2FFrankfurt-am-Main%2F-%2F-%2F200%2C00-%2FEURO--1500000%2C00%2F-%2F-%2F-%2F21%26exposeId%3D95656776&navigationHasPrev=true&navigationHasNext=true&navigationBarType=RESULT_LIST&searchId=a0c9aa79-56cd-322b-a647-6f078bd77ee7';
$p = new \ImmoScout\Parser1($url);
$content = $p->render();
echo $content;

