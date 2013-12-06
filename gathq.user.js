// ==UserScript==
// @name       GATHQ
// @namespace  Gatmaxx baby
// @version    1.1
// @include        /^https?://www\.erepublik\.com/\w{2}/military/battlefield/\d+$/
// @updateURL	   http://gat.kelengye.hu/pulse/gathq.meta.js
// @downloadURL    http://gat.kelengye.hu/pulse/gathq.user.js
// ==/UserScript==

var $;
var SERVER_DATA = unsafeWindow.SERVER_DATA;

function sendData(query_data) {
        var url = "http://gat.kelengye.hu/pulse/prioritas.php";
        sent_query_data = query_data;

        $.ajax({
            type: 'POST',
            url: url,
            cache: false,
            data: sent_query_data,
            timeout: 5000    
        });
    }

function renderButtons(){
    var defenderId = 0;
    var invaderId = 0;
    if (typeof (SERVER_DATA) != 'undefined') {   
             if ($("#pvp_battle_area").length > 0) {
              
                    var html = "<table width='100%' style='margin: 0 auto -25px;position: relative;top: 40px;left: -300px;width: auto;'><tbody><tr><td>";
                    html += "<div id='priority_add' style='cursor: default;display: block;height: 25px;width: auto;' original-title='Kattints!'>";
                    html += "<small style='background-image: url(\"/images/modules/pvp/influence_left.png?1309432605\");background-position: left center;color: #FFFFFF;display: block;float: left;font-size: 11px;font-weight: bold;height: 25px;line-height: 25px;opacity: 0.7;padding: 0 5px;text-shadow: 0 1px 1px #333333;'>Prió *</small>";
                	html += "<a id='priority_add_1' href='javascript:;'><strong style='color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;width:35px;height:25px;font-size:12px;line-height:25px;padding:0 5px;background-image:url(\"/images/modules/pvp/influence_right.png?1309432605\");background-position:right'>Küld</strong></a></div></td></tr></tbody></table>";
                 
                    html += "<table width='100%' style='margin: 0 auto -25px;position: relative;top: 40px;left: -200px;width: auto;'><tbody><tr><td>";
                    html += "<div id='priority_add' style='cursor: default;display: block;height: 25px;width: auto;' original-title='Kattints!'>";
                    html += "<small style='background-image: url(\"/images/modules/pvp/influence_left.png?1309432605\");background-position: left center;color: #FFFFFF;display: block;float: left;font-size: 11px;font-weight: bold;height: 25px;line-height: 25px;opacity: 0.7;padding: 0 5px;text-shadow: 0 1px 1px #333333;'>Prió **</small>";
                	html += "<a id='priority_add_2' href='javascript:;'><strong style='color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;width:35px;height:25px;font-size:12px;line-height:25px;padding:0 5px;background-image:url(\"/images/modules/pvp/influence_right.png?1309432605\");background-position:right'>Küld</strong></a></div></td></tr></tbody></table>";
                 
                    html += "<table width='100%' style='margin: 0 auto -25px;position: relative;top: 40px;left: -100px;width: auto;'><tbody><tr><td>";
                    html += "<div id='priority_add' style='cursor: default;display: block;height: 25px;width: auto;' original-title='Kattints!'>";
                    html += "<small style='background-image: url(\"/images/modules/pvp/influence_left.png?1309432605\");background-position: left center;color: #FFFFFF;display: block;float: left;font-size: 11px;font-weight: bold;height: 25px;line-height: 25px;opacity: 0.7;padding: 0 5px;text-shadow: 0 1px 1px #333333;'>Prió ***</small>";
                	html += "<a id='priority_add_3' href='javascript:;'><strong style='color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;width:35px;height:25px;font-size:12px;line-height:25px;padding:0 5px;background-image:url(\"/images/modules/pvp/influence_right.png?1309432605\");background-position:right'>Küld</strong></a></div></td></tr></tbody></table>";
                 
                    $("#pvp_battle_area").append(html);
   	 	}
	} 
}
 

function main(){
   renderButtons();
    
    $('#priority_add_1').click(function(){
        var citizenId = SERVER_DATA.citizenId;
        var battleId = SERVER_DATA.battleId;
        var defenderId = SERVER_DATA.defenderId;

        var query = "";
        query += "citizenId=" + citizenId + "&battleId=" + battleId + "&defenderId=" + defenderId + "&priority=1";
        sendData(query);
        $('#priority_add_1 > strong').text('OK');
    });
    
    $('#priority_add_2').click(function(){
        var citizenId = SERVER_DATA.citizenId;
        var battleId = SERVER_DATA.battleId;
        var defenderId = SERVER_DATA.defenderId;

        var query = "";
        query += "citizenId=" + citizenId + "&battleId=" + battleId + "&defenderId=" + defenderId + "&priority=2";
        sendData(query);
        $('#priority_add_2 > strong').text('OK');
    });
    
    $('#priority_add_3').click(function(){
        var citizenId = SERVER_DATA.citizenId;
        var battleId = SERVER_DATA.battleId;
        var defenderId = SERVER_DATA.defenderId;

        var query = "";
        query += "citizenId=" + citizenId + "&battleId=" + battleId + "&defenderId=" + defenderId + "&priority=3";
        sendData(query);
        $('#priority_add_3 > strong').text('OK');
    });
}

function waitJQuery() {
	if (typeof(unsafeWindow.jQuery) != 'function') {
		setTimeout(function () { waitJQuery(); }, 200);
	}
	else {
		$ = unsafeWindow.jQuery;
		main();
	}
}

waitJQuery();
