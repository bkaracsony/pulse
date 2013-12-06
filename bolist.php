<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style>
td {
	font-size: 11px;
	font-family: verdana;
}
a {
	text-decoration: none;
	color: darkred;	
}
</style>
</head>
<body topmargin="2" marginwidth="0" marginheight="0">


<?php 
include '../admin/mysql.php';

function getStars($num){
	if($num>0){
		for($i=1;$i<=$num;$i++)
			$star.="<img class='priority_star' src='../img/bo/star.png'>";
	}
	else if($num == 0)
		$star.="<a title='Csak tájékoztatási célból, kredit nem jár érte' href='##'><img class='priority_arrow' src='../img/bo/arrow.png' alt='Csak tájékoztatási célból, kredit nem jár érte'></a>";
	else{
		$star.= "";
	}
	return $star;
}

$sql = "SELECT max(day) as day FROM armyDO";
$result = $mysqli->query($sql);
$row = $result->fetch_assoc();
$day = $row['day'];

echo "DO-s csaták $day. napra";
echo "<table id='do_table' cellpadding=1 cellspacing=1 align=center >";

$sql = "SELECT * FROM bo_do WHERE day = $day";
$result = $mysqli->query($sql) or die("Fosszar");
while($row = $result->fetch_array()){ 
	$rows[] = $row;
}

$i = 1;
foreach ($rows as $adat){
{
	print "<tr id='tr_$i'>
	<td>$i)</td>
	<td id='td_battle_$i'><a id='battle_$i' href=\"http://www.erepublik.com/en/military/battlefield/".$adat['battle']."\" target='_parent'>".$adat['region']."</a> </td>
	<td id='td_comment_$i'>Oldal: ". $adat['country']."</td></tr>";
	}
	$i++;
}

echo "</table><br/>";

////////////////////////////

echo "Priós csaták $day. napra";
echo "<table id='prio_table' cellpadding=1 cellspacing=1 align=center >";

$sql = "SELECT prio.battle, priority, c.name as side, p.region 
	FROM priorities prio 
	JOIN (SELECT battle, region FROM pulse WHERE day = $day GROUP BY battle) p ON p.battle = prio.battle
	JOIN countries c ON prio.side = c.id
	ORDER BY prio.battle DESC
	LIMIT 0,3";
	
$result = $mysqli->query($sql) or die("Fosszar");
while($row = $result->fetch_array()){ 
	$rows2[] = $row;
}

$i = 1;
foreach ($rows2 as $adat){
{
	$prio = getStars($adat['priority']);
	print "<tr id='tr_$i'>
	<td>$i)</td>
	<td id='td_battle_$i'><a id='battle_$i' href=\"http://www.erepublik.com/en/military/battlefield/".$adat['battle']."\" target='_parent'>".$adat['region']."</a></td>
	<td>$prio</td>
	<td id='td_comment_$i'>Oldal: ". $adat['side']."</td></tr>";
	}
	$i++;
}

echo "</table>";



?>
</body></html>
