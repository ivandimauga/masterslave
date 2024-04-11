<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$mysqli = new mysqli("localhost", "root", "", "");

if($mysqli -> connect_error) {
    die("Connection failed: " . $mysqli -> connect_error);
}

$query = "SHOW DATABASES";
$result = $mysqli -> query($query);

$databases = array();
while ($row = $result -> fetch_array()) {
    $databases[] = $row[0];
}

$mysqli -> close();

header('Content-Type: application/json');
echo json_encode($databases);
?>