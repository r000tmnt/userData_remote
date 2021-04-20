<?php
header('Access-Control-Allow-Origin:*');

$url = 'http://www.aigreen.com.tw/usrDataReceive/pratice.php';
$response = file_get_contents($url);
echo $response;
?>