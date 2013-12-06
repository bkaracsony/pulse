<?php

header('Content-Type: text/html; charset=utf-8'); 
header("Access-Control-Allow-Origin: http://www.erepublik.com");
include("../admin/mysql.php");

function getRank($rank){
	// erepublik.ranks
  $ranks = array(
  array('level'=>'1','name'=>'Recruit','limit'=>'0'),
  array('level'=>'2','name'=>'Private','limit'=>'15'),
  array('level'=>'3','name'=>'Private*','limit'=>'45'),
  array('level'=>'4','name'=>'Private**','limit'=>'80'),
  array('level'=>'5','name'=>'Private***','limit'=>'120'),
  array('level'=>'6','name'=>'Corporal','limit'=>'170'),
  array('level'=>'7','name'=>'Corporal*','limit'=>'250'),
  array('level'=>'8','name'=>'Corporal**','limit'=>'350'),
  array('level'=>'9','name'=>'Corporal***','limit'=>'450'),
  array('level'=>'10','name'=>'Sergeant','limit'=>'600'),
  array('level'=>'11','name'=>'Sergeant*','limit'=>'800'),
  array('level'=>'12','name'=>'Sergeant**','limit'=>'1000'),
  array('level'=>'13','name'=>'Sergeant***','limit'=>'1400'),
  array('level'=>'14','name'=>'Lieutenant','limit'=>'1850'),
  array('level'=>'15','name'=>'Lieutenant*','limit'=>'2350'),
  array('level'=>'16','name'=>'Lieutenant**','limit'=>'3000'),
  array('level'=>'17','name'=>'Lieutenant***','limit'=>'3750'),
  array('level'=>'18','name'=>'Captain','limit'=>'5000'),
  array('level'=>'19','name'=>'Captain*','limit'=>'6500'),
  array('level'=>'20','name'=>'Captain**','limit'=>'9000'),
  array('level'=>'21','name'=>'Captain***','limit'=>'12000'),
  array('level'=>'22','name'=>'Major','limit'=>'15500'),
  array('level'=>'23','name'=>'Major*','limit'=>'20000'),
  array('level'=>'24','name'=>'Major**','limit'=>'25000'),
  array('level'=>'25','name'=>'Major***','limit'=>'31000'),
  array('level'=>'26','name'=>'Commander','limit'=>'40000'),
  array('level'=>'27','name'=>'Commander*','limit'=>'52000'),
  array('level'=>'28','name'=>'Commander**','limit'=>'67000'),
  array('level'=>'29','name'=>'Commander***','limit'=>'85000'),
  array('level'=>'30','name'=>'Lt Colonel','limit'=>'110000'),
  array('level'=>'31','name'=>'Lt Colonel*','limit'=>'140000'),
  array('level'=>'32','name'=>'Lt Colonel**','limit'=>'180000'),
  array('level'=>'33','name'=>'Lt Colonel***','limit'=>'225000'),
  array('level'=>'34','name'=>'Colonel','limit'=>'285000'),
  array('level'=>'35','name'=>'Colonel*','limit'=>'355000'),
  array('level'=>'36','name'=>'Colonel**','limit'=>'435000'),
  array('level'=>'37','name'=>'Colonel***','limit'=>'540000'),
  array('level'=>'38','name'=>'General','limit'=>'660000'),
  array('level'=>'39','name'=>'General*','limit'=>'800000'),
  array('level'=>'40','name'=>'General**','limit'=>'950000'),
  array('level'=>'41','name'=>'General***','limit'=>'1140000'),
  array('level'=>'42','name'=>'Field Marshal','limit'=>'1350000'),
  array('level'=>'43','name'=>'Field Marshal*','limit'=>'1600000'),
  array('level'=>'44','name'=>'Field Marshal**','limit'=>'1875000'),
  array('level'=>'45','name'=>'Field Marshal***','limit'=>'2185000'),
  array('level'=>'46','name'=>'Supreme Marshal','limit'=>'2550000'),
  array('level'=>'47','name'=>'Supreme Marshal*','limit'=>'3000000'),
  array('level'=>'48','name'=>'Supreme Marshal**','limit'=>'3500000'),
  array('level'=>'49','name'=>'Supreme Marshal***','limit'=>'4150000'),
  array('level'=>'50','name'=>'National Force','limit'=>'4900000'),
  array('level'=>'51','name'=>'National Force*','limit'=>'5800000'),
  array('level'=>'52','name'=>'National Force**','limit'=>'7000000'),
  array('level'=>'53','name'=>'National Force***','limit'=>'9000000'),
  array('level'=>'54','name'=>'World Class Force','limit'=>'11500000'),
  array('level'=>'55','name'=>'World Class Force*','limit'=>'14500000'),
  array('level'=>'56','name'=>'World Class Force**','limit'=>'18000000'),
  array('level'=>'57','name'=>'World Class Force***','limit'=>'22000000'),
  array('level'=>'58','name'=>'Legendary Force','limit'=>'26500000'),
  array('level'=>'59','name'=>'Legendary Force*','limit'=>'31500000'),
  array('level'=>'60','name'=>'Legendary Force**','limit'=>'37000000'),
  array('level'=>'61','name'=>'Legendary Force***','limit'=>'43000000'),
  array('level'=>'62','name'=>'God of War','limit'=>'50000000'),
  array('level'=>'63','name'=>'God of War*','limit'=>'100000000'),
  array('level'=>'64','name'=>'God of War**','limit'=>'200000000'),
  array('level'=>'65','name'=>'God of War***','limit'=>'500000000'),
  array('level'=>'66','name'=>'Titan','limit'=>'1000000000'),
  array('level'=>'67','name'=>'Titan*','limit'=>'2000000000'),
  array('level'=>'68','name'=>'Titan**','limit'=>'4000000000'),
  array('level'=>'69','name'=>'Titan***','limit'=>'10000000000')
  );
  
  $prev_rank = 0;
  foreach ($ranks as $r){
	if($rank < $r['limit']){
		return $prev_rank;
	}
	$prev_rank = $r['level'];
  } 
}

global $mysqli;

foreach($_REQUEST as $key => $value) $_REQUEST[$key] = $mysqli->real_escape_string($value);

$id = $_REQUEST['citizenId'];
$battle = $_REQUEST['battleId'];
$def = $_REQUEST['defenderId'];
$region = $_REQUEST['regionName'];
$eday = str_replace(",", "", $_REQUEST['eday']);
$dom = $_REQUEST['domination'];
$time = $_REQUEST['livetime'];
$rank = $_REQUEST['rank'];
$str = str_replace(",", "", $_REQUEST['skill']);
$xp = $_REQUEST['exp'];
$hits = $_REQUEST['earnedXp'];
$inf = $_REQUEST['givenDamage'];
$weapon = $_REQUEST['weaponDamage'];
$citizenName = $_REQUEST['citizenName'];
$version = $_REQUEST['version'];
$region = str_replace("Refresh: off12345678910 second/s", "", $region );
$DOBattleID = $_REQUEST['DOBattleID'];
$DOCountry = $_REQUEST['DOCountry'];
$DORegion = $_REQUEST['DORegion'];
$ip = $_SERVER['REMOTE_ADDR'];

// Az elertxp-bol szamitja az utest, ez akkor 0 ha tomegpusztitoval utunk vagy gerillázunk
// igy minden esetben minimum 1
if ($hits == 0) { $hits = 1;} 

if ($id == 0 or $id == '') { exit ("OK"); } // Ha nincs meg a karakter ID-je

// RAW DATA TO armyDO TABLE
if($DORegion != '') {
	$sql = "INSERT INTO armyDO (`inserted`, `id`, `day`, `time`, `DOBattleID`, `DOCountry`, `DORegion`) 
		VALUES ('".time()."', '".$id."', '".$eday."', '".$time."', '".$DOBattleID."', '".$DOCountry."' , '".$DORegion."') 
		ON DUPLICATE KEY UPDATE inserted = '".time()."'";
	$mysqli->query($sql) or die("STOP");
}

// GERILLA
if($weapon == 99999){
	$winnerId = $_REQUEST['winnerId'];
	$userDamage = $_REQUEST['userDamage'];
	$enemyDamage = $_REQUEST['enemyDamage'];
	$enemy = $_REQUEST['enemyName'];
	
	if($region == ''){
		// Mivel ilyenkor nincs régiónév, ezért kikeressük
		$sql = "SELECT region FROM `pulse` WHERE battle = $battle and region <> '' limit 0,1";
		$result = $mysqli->query($sql);
		$r = $result->fetch_assoc();
		$region = $r['region'];
	}
	$sql = "INSERT INTO gerilla (`inserted`, `id`, `battle`, `day`, `winnerId`, `userDamage`, `enemyDamage`, `time`, `enemy`)
			VALUES ('".time()."', '$id', '$battle', '$eday', '$winnerId', '$userDamage', '$enemyDamage', '$time', '$enemy')
			ON DUPLICATE KEY UPDATE id='$id'";
	$mysqli->query($sql) or die("STOP");
}

// RAW DATA TO PULSE TABLE
$sql2 = "INSERT INTO pulse (`inserted`, `id`, `battle`, `defender`, `region`, `day`, `time`, `domination`, `hits`, `inf`, `weapon`, `version`) 
		VALUES ('".time()."', '$id', '$battle', '$def', '$region', '$eday', '$time', '$dom', '$hits', '$inf', '$weapon', '$version') 
		ON DUPLICATE KEY UPDATE id='$id'";
$mysqli->query($sql2) or die("STOP");

// If dropped a bomb
if ($xp == 0) { exit("OK");}

// UPDATE STATS FOR MILITARY TABLE
$level = getRank($rank);

if($xp < 5000){
	$division = 0;
}
elseif($xp >= 5000 && $xp < 25000){
	$division = 1;
}
elseif($xp >= 25000 && $xp < 60000){
	$division = 2;
}
else{
	$division = 3;
}

$q0hit = (($level-1)/20 + 0.3)*(($str/10)+40);
//ELITE CITIZEN HIT BONUSZ
if ($xp > 385000) { $q0hit *= 1.1; }

$sql3 = "INSERT INTO military (`STRENGTH`, `XP`, `MRP`, `RANK`, `HIT`, `UPDATED`, `ID`, `NAME`) 
			VALUES ('".$str."', '".$xp."', '".$rank."', '".$level."', '".$q0hit."', '".time()."', '$id', '$citizenName') 
			ON DUPLICATE KEY UPDATE NAME = '".$citizenName."', STRENGTH = '".$str."', XP = '".$xp."', MRP = '".$rank."', RANK = '".$level."', HIT = '".$q0hit."', LEVEL = '".$division."', NAME='$citizenName', UPDATED = '".time()."'";
$mysqli->query($sql3) or die("STOP");

exit("OK");
 
?>
