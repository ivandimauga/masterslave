<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Origin, Content_Type, X-Auth-Token');

$mysqli = new mysqli("localhost", "root", "", "");

if ($mysqli -> connect_error) {
    die("Connection failed: " . $mysqli -> connect_error);
}

function copyMasterToSlave($masterDatabase, $slaveDatabase, $mysqli) {
    $query = "SHOW TABLES FROM $masterDatabase";
    $result = $mysqli -> query($query);

    if ($result) {
        $mysqli -> query("CREATE DATABASE IF NOT EXISTS $slaveDatabase");

        $mysqli -> select_db($slaveDatabase);

        while($row = $result -> fetch_array()) {
            $table = $row[0];

            $mysqli -> query("CREATE TABLE IF NOT EXISTS $table LIKE $masterDatabase.$table");

            $mysqli -> query("INSERT INTO $table SELECT * FROM $masterDatabase.$table");
        }

        echo "Database copied successfully from $masterDatabase to $slaveDatabase.";
    } else {
        echo "Error: " . $mysqli -> error;
    }
}

$masterDatabase = $_GET['masterDatabase'] ?? '';
$slaveDatabase = $_GET['slaveDatabase'] ?? '';

if (!empty($masterDatabase) && !empty($slaveDatabase)) {
    copyMasterToSlave($masterDatabase, $slaveDatabase, $mysqli);
} else {
    echo "Please select both master and slave databases.";
}

$mysqli -> close();