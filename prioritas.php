<?php

header('Content-Type: text/html; charset=utf-8'); 
header("Access-Control-Allow-Origin: http://www.erepublik.com");
include("../admin/mysql.php");

global $mysqli;

foreach($_REQUEST as $key => $value) $_REQUEST[$key] = $mysqli->real_escape_string($value);

$id = $_REQUEST['citizenId'];
$battle = $_REQUEST['battleId'];
$def = $_REQUEST['defenderId'];
$priority = $_REQUEST['priority'];
$ip = $_SERVER['REMOTE_ADDR'];


$sql = "INSERT INTO priorities (`battle`, `side`, `priority`) 
			VALUES ('".$battle."', '".$def."', '".$priority."') 
			ON DUPLICATE KEY UPDATE PRIORITY = '".$priority."'";
$mysqli->query($sql) or die($sql);

exit("OK");
 
?>
