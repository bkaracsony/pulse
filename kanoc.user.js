// ==UserScript==
// @name           Kanoc
// @namespace      pulse
// @description    Gabor Aron Tuzerei katonai szamara irt kiegeszito az ellatmanyozas megkonnyitesere
// @author         karaj22
// @contributor    Xavinyo, cukimaxx
// @run-at         document-end
// @homepage       http://gat.kelengye.hu
// @version        1.1
// @include        /^https?://www\.erepublik\.com/\w{2}$/
// @include        /^https?://www\.erepublik\.com/\w{2}/military/battlefield/\d+$/
// @include        /^https?://www\.erepublik\.com/\w{2}/main/pvp/.+$/
// @updateURL	   http://gat.kelengye.hu/pulse/kanoc.meta.js
// @downloadURL    http://gat.kelengye.hu/pulse/kanoc.user.js
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////////////

var $;
var SERVER_DATA = unsafeWindow.SERVER_DATA;
var saveDataTime = null;

function initializePersistence() {
    var pulse_queue = null;
    var pulse_version = "1.1";
    var DO_BattleID;
    var DO_Country;
    var DO_Region;
    var DO_SAVE;
    
////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
/// GATMAXX \o/ ///////
   
	$j("#logoNew a").css("background-image", "url(data:image/png;base64,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)")
///////////////////////////////////////////////////////////////////////
    var database = null;
    try {
        database = !window.globalStorage ? window.localStorage : window.globalStorage[location.hostname];
        if (database == null || database == undefined || database == "undefined") {
            database = !unsafeWindow.globalStorage ? unsafeWindow.localStorage : unsafeWindow.globalStorage[location.hostname];
        }
    } catch (e) {}
    if (database == null) {
        return;
    }

    var RX_JSON = (function () {
        try {
            return new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$');
        } catch (e) {
            return (/^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/);
        }
    }());


    function typecheck(type, compare) {
        return !type ? false : type.constructor.toString().match(new RegExp(compare + '\\(\\)', 'i')) !== null;
    }


    function prepareForStorage(value) {
        if (value === undefined) {
            return '';
        }

        if (typecheck(value, 'Object') ||
            typecheck(value, 'Array') ||
            typecheck(value, 'Function')) {
            return JSON.stringify(value);
        }

        return value;
    }

    function prepareForRevival(value) {
        return RX_JSON.test(value) ? JSON.parse(value) : value;
    }

    function storageGet(key) {
        var data = null;
        try {
            data = prepareForRevival(database.getItem(key));
        } catch (ex) {}

        return data;
    }

    function storageSet(key, value) {
        try {
            database.setItem(key, prepareForStorage(value));
        } catch (ex) {}
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    if (void 0 != $("#left_campaign_points").html()) {

        blueP = $("#left_campaign_points").html();
        redP = $("#red_campaign_points").html();

        if (blueP < redP) {

            $("h3:eq(1)").css("color", "#008800");

            $("h3:eq(2)").css("color", "#FF0000");

        } else {


            $("h3:eq(1)").css("color", "#FF0000");

            $("h3:eq(2)").css("color", "#008800");
        }

        blue = document.getElementById("blue_domination");
        newBlue = blue.innerHTML;
        newBlue = newBlue.replace("%", "");

        if (newBlue > 55) {

            blue.style.opacity = "1";
            blue.style.color = "#ff3300";
            blue.style.fontSize = "30px"
            blue.style.paddingLeft = "10px";
            blue.style.top = "-3px";
            blue.style.left = "50px";

        }
        if (newBlue < 53) {

            blue.style.opacity = "1";
            blue.style.color = "#ffff33";
            blue.style.fontSize = "30px"
            blue.style.paddingLeft = "10px";
            blue.style.top = "-3px";
            blue.style.left = "50px";

        }
        if (newBlue < 51) {

            blue.style.opacity = "1";
            blue.style.color = "#66cc00";
            blue.style.fontSize = "30px"
            blue.style.paddingRight = "10px";
            blue.style.top = "-3px";
            blue.style.left = "50px";
        }

    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    function replaceAll(text, busca, reemplaza) {
        while (text.toString().indexOf(busca) != -1)
            text = text.toString().replace(busca, reemplaza);
        return text;
    }

    function getCitizenId() {
        if (typeof (SERVER_DATA) != 'undefined') {
            if (typeof (SERVER_DATA.citizenId) != 'undefined') {
                return SERVER_DATA.citizenId;
            }
        }

        var srcCitizenId = $(".user_avatar").attr("href").trim();
        var srcIdParts = srcCitizenId.split("/");
        return srcIdParts[srcIdParts.length - 1];
    }

    function getRankByRankPoints(rank_points) {
        var rank_array = [10, 30, 60, 100, 150, 250, 350, 450, 600, 800, 1000, 1400, 1850, 2350, 3000, 3750, 5000, 6500, 9000, 12000, 15500, 20000, 25000, 31000, 40000, 52000, 67000, 85000, 110000, 140000, 180000, 225000, 285000, 355000, 435000, 540000, 660000, 800000, 950000, 1140000, 1350000, 1600000, 1875000, 2185000, 2550000, 3000000, 3500000, 4150000, 4900000, 5800000, 7000000, 9000000, 11500000, 14500000, 18000000, 22000000, 26500000, 31500000, 37000000, 43000000, 50000000, 100000000, 200000000, 500000000, 999999999];

        var rank = 0;
        for (rank = 0; rank < rank_array.length; rank++) {
            if (rank_points < rank_array[rank]) {
                return rank + 1;
            }
        }

        return rank + 1;
    }

    function getInfluence(rank_points, strength) {
        var rank = getRankByRankPoints(rank_points);

        var influence = ((rank - 1.0) / 20.0 + 0.3) * ((strength / 10.0) + 40.0) * 3;
        var level = parseInt($('.sidebar .user_section .user_level').text());
        if(level > 100){
            influence *= 1.1;
        }
        return parseInt(influence);
    }

    function getInfluenceByWeapon(rank_points, strength, weaponId) {
        if (weaponId == 10)
            return 10000;

        var rank = getRankByRankPoints(rank_points);
        var multiplier = 1.0;
        if (weaponId == 1) multiplier = 1.2;
        else if (weaponId == 2) multiplier = 1.4;
        else if (weaponId == 3) multiplier = 1.6;
        else if (weaponId == 4) multiplier = 1.8;
        else if (weaponId == 5) multiplier = 2.0;
        else if (weaponId == 6) multiplier = 2.2;
        else if (weaponId == 7) multiplier = 3.0;

        var influence = ((rank - 1.0) / 20.0 + 0.3) * ((strength / 10.0) + 40.0) * multiplier;
        
        var level = parseInt($('.sidebar .user_section .user_level').text());
        if(level > 100){
            influence *= 1.1;
        }
        return parseInt(influence);
    }

    /////////////////////////////////////////////////////////

    var currentBattleId = 0;

    function forceAjaxCheck() {

        $.ajax({
            type: 'GET',
            url: 'http://www.erepublik.com/en/military/battle-stats/' + currentBattleId,
            cache: true,
            dataType: 'json',
            timeout: 7000
        });

    }

    function queryCountryStats() {
        var b = false;

        var timestamp = new Date().getTime();
        var timestamp2 = storageGet("pulse-stats-ts");
        if (timestamp2 == null) {
            b = true;
        } else if (timestamp - timestamp2 > 1800000) {
            b = true;
        }

        if (b == true) {
            var url = 'http://199.19.119.44:443/index.php/PulseWS/countries';

            $.ajax({
                type: 'GET',
                url: url,
                cache: true,
                dataType: 'json',
                timeout: 15000,
                success: function (data) {

                    setCountryStats(data);
                },
                error: function (xhr, ajaxOptions, thrownError) {},
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true
            });

            var timestamp = new Date().getTime();
            storageSet("pulse-stats-ts", timestamp);
        }
    }

////////////////////////////////////////////
//// Daily Order lekérdezés ////////////////

    function saveDo() {
        var ts = new Date().getTime();

        storageSet("pulse-doBattleID", DO_BattleID);
        storageSet("pulse-doCountry", DO_Country);
        storageSet("pulse-doRegion", DO_Region);
        storageSet("pulse-doSave", ts);
    }
    
    function updateDo() {
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://www.erepublik.com/en",
            dataType: "html",
            onload: function (e) {
                                if (e.responseText == null) {
                                        return;
                                }
                            var arr = e.responseText.match(/var mapDailyOrder \=([^;]*);/);
                var mapDO = JSON.parse(arr[1]);

                DO_BattleID = mapDO['do_battle_id'];
                DO_Country = mapDO['do_for_country'];
                DO_Region = mapDO['do_region_name'];
                saveDo();
            }
        })
    }
    
    if (unsafeWindow.mapDailyOrder) {
                DO_BattleID = unsafeWindow.mapDailyOrder['do_battle_id'];
                DO_Country = unsafeWindow.mapDailyOrder['do_for_country'];
                DO_Region = unsafeWindow.mapDailyOrder['do_region_name'];
                saveDo();
    }
    else {
        var b = false;
        var ts = new Date().getTime();
        var ts2 = storageGet("pulse-doSave");

        if (ts2 == null) {
            b = true;
        } 
        else if (ts - ts2 > 3600000) {
            b = true;
        }
        if (b == true) {
        	updateDo();
        } 
        else {
            DO_BattleID = storageGet("pulse-doBattleID");
            DO_Country = storageGet("pulse-doCountry");
            DO_Region = storageGet("pulse-doRegion");
            DO_SAVE = storageGet("pulse-doSave");
        }
    }
    
////////////////////////////////////////////
    
    function setPlayerData(data) {
        if (data == null || data == undefined || data == 'undefined') {
            return;
        }

        var unitId = data.unitId;
        if (unitId != null && unitId != undefined && unitId != 'undefined') {
            setArmyId(unitId);
        }

        var citizenshipId = data.citizen;
        if (citizenshipId != null && citizenshipId != undefined && citizenshipId != 'undefined') {
            setCitizenshipId(citizenshipId);
        }
    }


    function addAll() {
        if (getShowAll() == false) {
            hideAll(false);
        } else {
            showAll();
        }
    }

    function addCountryAlliance() {
        if (typeof (SERVER_DATA) != 'undefined') {
            var defenderId = SERVER_DATA.defenderId;
            var invaderId = SERVER_DATA.invaderId;
            var mustInvert = SERVER_DATA.mustInvert;

            var country_stats = getCountryStats();
            if (typeof (country_stats) != 'undefined') {
                $("#left_counter_wrap").first().before("<h4 style='position: relative; top: -14px; left: 0px; width: 75px; text-align: center; font-size: 9pt; color: #666666;'>" + country_stats["" + defenderId + ""] + "</h4>");

                $(".country.left_side").css("cursor", "pointer");
                $(".country.left_side ~ div").css("cursor", "pointer");
                $(".country.left_side").attr("onclick", "javascript:popup('http://egov4you.info/country/overview/" + defenderId + "')");

                $("#right_counter_wrap").first().before("<h4 style='position: relative; top: -14px; left: 0px; width: 75px; text-align: center; font-size: 9pt; color: #666666;'>" + country_stats["" + invaderId + ""] + "</h4>");

                $(".country.right_side").css("cursor", "pointer");
                $(".country.right_side ~ div").css("cursor", "pointer");
                $(".country.right_side").attr("onclick", "javascript:popup('http://egov4you.info/country/overview/" + invaderId + "')");
            }
        }
    }


/*
 * QUEUE BASZÁS
 */
    var queue_on = 0;
    var retries = 0;

    function notifySendErrorRed() {
        $("#pulse_queue_length").css("color", "red");
    }

    function notifySendErrorBlack() {
        $("#pulse_queue_length").css("color", "inherit");
        setTimeout(function () {
            notifySendErrorRed();
        }, 350);
    }

    function notifySendError() {
        setTimeout(function () {
            notifySendErrorBlack();
        }, 100);
    }

    function updateQueueInfo() {

        var qlength = pulse_queue.getLength();
        $("#pulse_queue_length").text(qlength);

        if (qlength == 0) {
            queue_on = 0;
            $("#pulse_queue").css("visibility", "hidden");
            $("#queue_run").text("Send");
            $("#queue_run").css("visibility", "hidden");
            $("#pulse_queue_length").css("color", "inherit");
        } else {
            $("#pulse_queue").css("visibility", "visible");
            $("#queue_run").attr("disabled", "");
            $("#queue_run").css("visibility", "visible");
            $("#pulse_queue_length").css("color", "red");
        }
    }

    function dequeue() {
        if (retries > 4) {
            retries = 0;
            cancelQueue();
            return;
        }

        var queue_length = pulse_queue.getLength();
        if (queue_length > 0) {
            var peek = pulse_queue.dequeue();
            storageSet("pulse-queue-data", pulse_queue.sliceQueue());

            sendData(peek, false);
        } else {
            updateQueueInfo();
        }
    }

    var queue_timer = null;

    function stopDequeue() {
        if (queue_timer != null) {
            clearInterval(queue_timer);
            queue_timer = null;
        }
    }

    function startDequeue() {
        stopDequeue();

        var queue_length = pulse_queue.getLength();

        if (queue_length > 0) {
            queue_timer = setInterval(function () {
                dequeue();
            }, 5000);
        }
    }

    function toggleQueue() {
        if (queue_on) {
            stopDequeue();
            queue_on = 0;
            $("#queue_run").text("Start");
            $("#queue_run").show();
        } else {
            startDequeue();
            queue_on = 1;
            $("#queue_run").text("Stop");
            $("#queue_run").show();
        }
    }

    function cancelQueue() {
        stopDequeue();
        queue_on = 0;
        $("#queue_run").text("Start");
        $("#queue_run").show();
    }

    function reQueue(data) {
        pulse_queue.enqueue(data);
        storageSet("pulse-queue-data", pulse_queue.sliceQueue());

        updateQueueInfo();
        retries += 1;
        notifySendError();
    }

////////// QUEUE

////////////////////////////////////////////////////////////////////////////////////////
    function renderPulse(citizen_id) {
        if ($("#pulse_section_body").length > 0) {
            return false;
        }
        var citizen_id = getCitizenId();
        var army_id = storageGet("pulse-armyid");

        var pulse_section_header = "<div id='pulse_section_header'>";
        pulse_section_header += "<a id='all_show' href='javascript:;' class='f_light_blue_new'><span style='font-size: 10pt;'>Verzió: <font color='red'>" + pulse_version + "</font></span><a/>";
        pulse_section_header += "<a target='_blank' href='http://www.erepublik.com/en/newspaper/hadugyi-kozlony-177586/1' class='f_light_blue_new'><span style='color: red; font-size: 10pt;'>HK</span><a/>";
        pulse_section_header += "<a target='_blank' href='http://gat.kelengye.hu' class='f_light_blue_new'><span style='color: green; font-size: 10pt;'>Kanóc</span></a>";
        pulse_section_header += "</div>";


/*
 * QUEUE baszás
 */
        var queue_info = "<div id='pulse_queue' title='Az elküldetlen killek száma. Nyomd meg a \"Start\" gombot, és elküldi egyesével a szervernek.' style='display: block;'>";
        queue_info += "<div style='float: left;'>Puffer hossz:&nbsp;</div><div id='pulse_queue_length' style='float: left;'></div>";
        queue_info += "</div><a id='queue_run' class='f_light_blue_new' href='javascript:;' style='float: right;'>Start<a/>";

        $("#queue_run").live("click", function () {
            $("#queue_run").hide();
            setTimeout(function () {
                toggleQueue();
            }, 500);
        });
////////// QUEUE

        var pulse_section = "<div class='pulse_section user_section' id='pulse_section_body'>";
        pulse_section += pulse_section_header + queue_info +"</div>";

        if ($("#battle_listing").length > 0) {
            $("#battle_listing").after(pulse_section);
        } else {
            $(".award_pop_up").after(pulse_section);
        }


        $(".pulse_section").attr("style", "height: auto; margin-top: 11px; background-color: #FDFDFD;background-image: url('/images/modules/citizenprofile/activitybg.png?1305798401');background-position: center top;background-repeat: repeat-x;border: 1px solid #F0F0F0;margin-top: 10px;padding-bottom: 1px;color: #4D4D4D;display: inline;float: left;padding: 1;");

        try {
            renderWeaponDamage();
        } catch (err) {}

        try {
            addCountryAlliance();
        } catch (err) {}

        $("div.user_notify > a[href*=jobs]").css("bottom", "-350px");

        $("#queue_run").show();
        updateQueueInfo();

        return true;
    }

    ////////////////////////////////////

    function renderWeaponDamage() {
        var strength = $("#fighter_skill").text();
        if (strength == undefined && strength == null && strength == "") {
            return;
        }
        strength = parseInt(strength.replace(",", ""));

        var rank_points = $("#rank_min").text().split(" ")[0];
        rank_points = parseInt(rank_points.replace(/,/g, ""));

        if (rank_points == undefined && rank_points == null && rank_points == "") {
            return;
        }

        var weaponId = getWeaponId();
        var wdamage = getInfluenceByWeapon(rank_points, strength, weaponId);
        var wmaxdamage = getInfluenceByWeapon(rank_points, strength, 7);

        if ($(".wdurability").length > 0) {
            if ($("#wdamage").length == 0) {
                var html = "<p id='wdamage'>Damage<strong id='wdamagevalue'></strong></p>";
                $(".wdurability").append(html);
            }

            $("#wdamagevalue").text(wdamage);
        }

        if ($("#pvp_battle_area").length > 0) {
            if ($("#player_influence2").length == 0) {
                var html = "<table width='100%' style='margin: 0 auto -25px;position: relative;top: 130px;left: -264px;width: auto;'><tbody><tr><td>";
                html += "<div id='player_influence2' style='cursor: default;display: block;height: 25px;width: auto;' original-title='This is the influence you make with 1 hit with current weapon (it does NOT include natural enemy bonus)'>";
                html += "<small style='background-image: url(\"/images/modules/pvp/influence_left.png?1309432605\");background-position: left center;color: #FFFFFF;display: block;float: left;font-size: 11px;font-weight: bold;height: 25px;line-height: 25px;opacity: 0.7;padding: 0 5px;text-shadow: 0 1px 1px #333333;'>Damage</small>";
                html += "<strong id='player_influence2_val' style='color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;width:35px;height:25px;font-size:12px;line-height:25px;padding:0 5px;background-image:url(\"/images/modules/pvp/influence_right.png?1309432605\");background-position:right'>" + wdamage + "</strong></div></td></tr></tbody></table>";
                $("#pvp_battle_area").append(html);
            }

            $("#player_influence2_val").text(wdamage);

            if ($("#player_influence").length == 0) {
                var html = "<table width='100%' style='margin: 0 auto -25px;position: relative;top: 130px;left: -157px;width: auto;'><tbody><tr><td>";
                html += "<div id='player_influence' style='cursor: default;display: block;height: 25px;width: auto;' original-title='This is the maximum influence you can make with 1 hit using a Q7 weapon (it does NOT include natural enemy bonus)'>";
                html += "<small style='background-image: url(\"/images/modules/pvp/influence_left.png?1309432605\");background-position: left center;color: #FFFFFF;display: block;float: left;font-size: 11px;font-weight: bold;height: 25px;line-height: 25px;opacity: 0.7;padding: 0 5px;text-shadow: 0 1px 1px #333333;'>Max-hit</small>";
                html += "<strong id='player_influence_val' style='color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;width:35px;height:25px;font-size:12px;line-height:25px;padding:0 5px;background-image:url(\"/images/modules/pvp/influence_right.png?1309432605\");background-position:right'>" + wmaxdamage + "</strong></div></td></tr></tbody></table>";
                $("#pvp_battle_area").append(html);
            }

            $("#player_influence_val").text(wmaxdamage);
        }
    }

    function renderProfileInfluenceHinter(id, title, percent, damage, level) {
        var html = "<ul class='achiev'><div id='hinter_" + id + "' class='hinter' style='top: 15px;'><span><p class='padded' style='width: 100%; clear: both; height: 55px;'><img style='float: left;' id='hinter_img_" + id + "' src='' /><strong style=''>" + title + "</strong></p><p>" + percent + "% bonus" + "<br />" + damage + " damage</p></span></div></ul>";

        $("." + id).first().after(html);

        if (level > 0) {
            var img = "http://www.erepublik.com/images/icons/industry/2/q" + level + ".png";
            $("." + id).parents(".stat").find("#hinter_img_" + id).attr("src", img);
        }

        $("." + id).parents(".stat").find("#hinter_" + id).hide();
        $("." + id).hover(function () {
            var base = $(this).parent().offset().left + 15;
            $(this).parents(".stat").find("#hinter_" + id).css("left", ($(this).offset().left - base) + "px");

            $(this).parents(".stat").find("#hinter_" + id).show();
        }, function () {
            $(this).parents(".stat").find("#hinter_" + id).hide();
        });
    }

    function GetDivision(a) {
        if (a < 25) return 1;
        if (a < 30) return 2;
        if (a < 37) return 3;
        return 4
    }

    function renderProfileInfluence() {

        var citizen_content = $(".citizen_content");
        if (citizen_content.length == 0) {
            return;
        }

        var arr_citizen_military = $(citizen_content).first().find(".citizen_military");
        if (arr_citizen_military.length < 2) {
            return;
        }

        var html = "<div class='citizen_military'><strong>Influence</strong>";

        html += "<div style='margin-top:5px; width: 405px;' class='stat'><div style='width: 100%;'>";
        html += "<div class='left infq0' style='width: 29%; padding-left: 0px;'><small style='width: auto;'>Q0</small></div>";
        html += "<div class='left infq1' style='width: 7%; margin-left: -2px;'><small style='width: 50%;'>Q1</small></div>";
        html += "<div class='left infq2' style='width: 7%; margin-left: -1px;'><small style='width: 50%;'>Q2</small></div>";
        html += "<div class='left infq3' style='width: 7%'><small style='width: 50%;'>Q3</small></div>";
        html += "<div class='left infq4' style='width: 7%'><small style='width: 50%;'>Q4</small></div>";
        html += "<div class='left infq5' style='width: 7%; margin-left: -2px;'><small style='width: 50%;'>Q5</small></div>";
        html += "<div class='left infq6' style='width: 7%; margin-left: -1px;'><small style='width: 50%;'>Q6</small></div>";
        html += "<div class='left infq7' style='width: 29%;'><small style='width: auto; text-align: right;'>Q7</small></div>";
        html += "</div>";

        html += "<table border='0' width='100%' class='barholder'><tbody><tr><td>";
        html += "<div class='bar damage' style='width: 395px;'>";
        html += "<div class='border'>";
        html += "<span class='lefts'></span><span class='mids' style='width: 96%;'></span><span class='rights'></span>";
        html += "</div>"; // BORDER
        html += "<div class='fill'>";
        html += "<span class='lefts'></span><span style='width: 29%;' class='mids infq0'></span><span class='rights'></span>";
        for (i = 0; i < 6; i++) {
            if (i % 2 == 0) {
                html += "<span class='lefts'></span><span class='mids infq" + (i + 1) + "' style='width: 7%; background-color: #77B5D2; background-image: -webkit-linear-gradient(center bottom, #A0CBE0 0%, #77B5D2 100%); background-image: -webkit-gradient(linear, left bottom, left top, color-stop(1, #A0CBE0), color-stop(0, #77B5D2)); background-image: -moz-linear-gradient(center top , #A0CBE0 0%, #77B5D2 100%) !important; border-color: #4092B8;'></span><span class='rights'></span>";
            } else {
                html += "<span class='lefts'></span><span class='mids infq" + (i + 1) + "' style='width: 7%;'></span><span class='rights'></span>";
            }
        }
        html += "<span class='lefts'></span><span class='mids infq7' style='width: 29%; background-color: #77B5D2; background-image: -webkit-linear-gradient(center bottom, #A0CBE0 0%, #77B5D2 100%); background-image: -webkit-gradient(linear, left bottom, left top, color-stop(1, #A0CBE0), color-stop(0, #77B5D2)); background-image: -moz-linear-gradient(center top , #A0CBE0 0%, #77B5D2 100%) !important; border-color: #4092B8;'></span><span class='rights'></span>";

        html += "</div>"; // FILL
        html += "</div>";
        html += "</td></tr></tbody></table>";
        html += "<small style='float: left; white-space: nowrap;'><strong id='citizen_military_base_hit' style='left: 0px; margin-left: 0px;'>-</strong></small>";
        html += "<small style='width: 392px; white-space: nowrap;'><strong id='citizen_military_max_hit'>-</strong></small>";
        html += "</div>"; // STAT
        html += "</div>"; // citizen_military


        $(arr_citizen_military[1]).after(html);
        $(arr_citizen_military[1]).css("margin-bottom", "2px");

        var strength = replaceAll($(arr_citizen_military[0]).first().find("h4").text(), ",", "");
        strength = replaceAll(strength, " ", "");
        var rank_points = replaceAll($(arr_citizen_military[1]).first().find(".stat").first().find("strong").text(), ",", "");
        rank_points = rank_points.split("/")[0];
        rank_points = replaceAll(rank_points, " ", "");

        var inf_q0 = getInfluenceByWeapon(rank_points, strength, 0);
        var inf_q1 = getInfluenceByWeapon(rank_points, strength, 1);
        var inf_q2 = getInfluenceByWeapon(rank_points, strength, 2);
        var inf_q3 = getInfluenceByWeapon(rank_points, strength, 3);
        var inf_q4 = getInfluenceByWeapon(rank_points, strength, 4);
        var inf_q5 = getInfluenceByWeapon(rank_points, strength, 5);
        var inf_q6 = getInfluenceByWeapon(rank_points, strength, 6);
        var inf_q7 = getInfluenceByWeapon(rank_points, strength, 7);

        $("#citizen_military_base_hit").text("Base hit: " + inf_q0);
        $("#citizen_military_max_hit").text("Max-hit: " + inf_q7);

        renderProfileInfluenceHinter("infq0", "No weapon", "0", inf_q0, 0);
        renderProfileInfluenceHinter("infq1", "Q1 weapon", "20", inf_q1, 1);
        renderProfileInfluenceHinter("infq2", "Q2 weapon", "40", inf_q2, 2);
        renderProfileInfluenceHinter("infq3", "Q3 weapon", "60", inf_q3, 3);
        renderProfileInfluenceHinter("infq4", "Q4 weapon", "80", inf_q4, 4);
        renderProfileInfluenceHinter("infq5", "Q5 weapon", "100", inf_q5, 5);
        renderProfileInfluenceHinter("infq6", "Q6 weapon", "120", inf_q6, 6);
        renderProfileInfluenceHinter("infq7", "Q7 weapon", "200", inf_q7, 7);
    }

    //////////////////////////////////////////////////////////////////////////////////////////

    function getToday(day) {
        var today = storageGet("pulse-" + day);
        if (today == null || today == undefined || today == "undefined") {
            return 0;
        }

        return today;
    }

    function getCountryStats() {
        var cstats = storageGet("pulse-countrystats");
        if (cstats == null || cstats == undefined || cstats == "undefined") {
            return null;
        }

        return cstats;
    }

    function setCountryStats(cstats) {
        if (cstats == null || cstats == undefined || cstats == "undefined") {
            return;
        }

        storageSet("pulse-countrystats", cstats);
    }

    function setShowAll(b) {
        if (b == null || b == undefined || b == "undefined") {
            return;
        }

        storageSet("pulse-box-all", b);
    }

    function getShowAll() {
        var b = storageGet("pulse-box-all");
        if (b == null || b == undefined || b == "undefined") {
            return false;
        }

        return b;
    }

    function setArmyData(data) {

        if (data == null || data == undefined || data == "undefined") {
            return;
        }

        storageSet("pulse-armydata", data);
    }

    function getArmyData() {
        var data = storageGet("pulse-armydata");
        if (data == null || data == undefined || data == "undefined") {
            return "";
        }

        return data;
    }

    function setArmyId(data) {

        if (data == null || data == undefined || data == "undefined") {
            return;
        }

        storageSet("pulse-armyid", data);
    }

    function getArmyId() {
        var data = storageGet("pulse-armyid");
        if (data == null || data == undefined || data == "undefined") {
            return -1;
        }

        return data;
    }

    function setCitizenshipId(data) {

        if (data == null || data == undefined || data == "undefined") {
            return;
        }

        storageSet("pulse-citizenshipid", data);
    }

    function getCitizenshipId() {
        var data = storageGet("pulse-citizenshipid");
        if (data == null || data == undefined || data == "undefined") {
            return -1;
        }

        return data;
    }

    function setUpdateDate(data) {

        if (data == null || data == undefined || data == "undefined") {
            return;
        }

        storageSet("pulse-updatedate", data);
    }

    function getUpdateDate() {
        var data = storageGet("pulse-updatedate");
        if (data == null || data == undefined || data == "undefined") {
            return null;
        }

        return data;
    }

    //////////////////////////////////////////////////////////////////////////////////////////

    function addCommas(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    var sent_query_data;

    function sendData(query_data) {
        var url = "http://gat.kelengye.hu/pulse/pulse.php";

        sent_query_data = query_data;

        $.ajax({
            type: 'POST',
            url: url,
            cache: false,
            data: sent_query_data,
            timeout: 5000,
            success: function (data) {
//////////////////////////////////////////////
//unsafeWindow.console.log("SERVER SENT: >"+data+"<");
//////////////////////////////////////////////
                if (data == 'OK') {
                    updateQueueInfo();
                    retries = 0;
                } else if (data == 'STOP') {
                    updateQueueInfo();
                    retries = 0;
                    cancelQueue();
                } else {
                    reQueue(sent_query_data);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                reQueue(sent_query_data);
            }
        });
    }

    ///////////////////////////////////////////////////////////////////////////////

    function getDOMArmyId() {
        try {
            var groupId = $("#groupId");
            if (groupId.length > 0) {
                var value = $("#groupId").first().val();
                return value;
            }
        } catch (err) {}

        return -1;
    }

    function getDOMArmyData() {
        try {
            var oc = $("#orderContainer");
            if (oc.length > 0) {
                var link = $(oc).first().find("a").first();
                var linkParts = $(link).attr("href").trim().split("/");
                var dod = linkParts[linkParts.length - 1];

                var groupId = getDOMArmyId();
                var eday = $(".eday strong").text();
                eday = eday.replace(",", "");
                var livetime = $("#live_time").text();

                var value = groupId + "-" + dod + "-" + eday + " " + livetime.replace(":", "_");
                setArmyData(value);

                return value;
            }
        } catch (err) {}

        return "";
    }

    function getDOMCitizenshipId() {
        try {
            var menu4 = $("#menu4").first().find("ul").first().find("li");
            if (menu4.length >= 4) {
                var link = $(menu4[3]).find("a").first();
                var linkParts = $(link).attr("href").trim().split("/");
                var value = linkParts[linkParts.length - 1];
                return value;
            }
        } catch (err) {}

        return -1;
    }

    function getWeaponId() {
        try {
            var value = unsafeWindow.currentWeaponId;
            return value;
        } catch (err) {}

        return -1;
    }

    ///////////////////////////////////////////////////////////////////////////////

    function setGroupId() {
        var groupId = $("#groupId");
        if (groupId.length > 0) {
            var value = $("#groupId").first().val();
            setArmyId(value);
        }
    }

    function getGroupId() {
        var groupId = -1;
        try {
            groupId = getArmyId();
        } catch (err) {}

        return groupId;
    }

    ///////////////////////////////////////////////////////////////////////////////

    function getAttackerRounds() {
        return $("#left_campaign_points > strong").text();
    }

    function getDefenderRounds() {
        return $("#right_campaign_points > strong").text();
    }

    function enableFightButton() {

        var mode = 2;
        if (mode == 1) {
            $("#pvp_actions .action_holder").removeClass("disabled");
            $(".fight_btn").css("color", "#33aa33");
            $(".fight_btn").css("text-shadow", "#cccccc 2px 2px 2px");
        } else if (mode == 2) {
            $("#pvp_actions .action_holder").removeClass("disabled");
            $('.fight_btn').css('color', '');
            $('.fight_btn').css('text-shadow', '');
        } else {
            $('#pvp_actions .action_holder').removeClass('disabled');
            $('.fight_btn').css('color', '');
            $('.fight_btn').css('text-shadow', '');
        }
    }


    function disableFightButton() {
        var mode = 2;
        if (mode == 1) {
            $('#pvp_actions .action_holder').removeClass('disabled');
            $('.fight_btn').css('color', '#cc3333');
            $('.fight_btn').css('text-shadow', '#aaaaaa 2px 2px 2px');
        } else if (mode == 2) {
            $('#pvp_actions .action_holder').addClass('disabled');
            $('.fight_btn').css('color', 'inherit');
            $('.fight_btn').css('text-shadow', 'inherit');
        } else {
            $('#pvp_actions .action_holder').removeClass('disabled');
            $('.fight_btn').css('color', 'inherit');
            $('.fight_btn').css('text-shadow', 'inherit');
        }
    }

    /******************************************************************/
    /******************************************************************/

    function main2() {

        $.ajaxSetup({
            global: true,
            cache: false
        });

        try {
            queryCountryStats();
        } catch (err) {}

        var citizenId = 0;
        if (typeof (SERVER_DATA) != 'undefined') {
            citizenId = SERVER_DATA.citizenId;
        } else {}

        var ploaded = renderPulse(citizenId);
        if (ploaded == false) {
            return;
        }

        try {
            var groupId = getArmyId();
            if (groupId == -1) {
                groupId = getDOMArmyId();
                setArmyId(groupId);
            } else {}
        } catch (err) {}

        try {
            getDOMArmyData();
        } catch (err) {}

        try {
            var citizenshipId = getCitizenshipId();
            if (citizenshipId == -1) {
                citizenshipId = getDOMCitizenshipId();
                setCitizenshipId(citizenshipId);
            } else {}
        } catch (err) {}

        try {
            renderProfileInfluence();
        } catch (err) {}



        //////////////////////////////////

        var ajax_timeout = null;

        $(document).ajaxSuccess(function (e, xhr, settings) {
            if ((settings.url.match(/military\/fight-shoot$/) != null) ||
                (settings.url.match(/military\/fight-shoot/) != null) ||
                (settings.url.match(/military\/fight-shooot/) != null) ||
                (settings.url.match(/military\/deploy-bomb/) != null)) {

                var battleId = -1;
                var instantKill = -1;

                var citizenName = "";
                try {
                    citizenName = escape($(".user_avatar").attr("title"));
                } catch (err) {}
                var defenderId = SERVER_DATA.defenderId;
                var invaderId = SERVER_DATA.invaderId;
                var isResistance = SERVER_DATA.isResistance;
                var mustInvert = SERVER_DATA.mustInvert;

                try {
                    var citizenshipId = getCitizenshipId();
                    var groupId = getArmyId();
                } catch (err) {}

                if (settings.data != null) {
                    var queryStringData = new Array();
                    var pairs = settings.data.split("&");
                    for (p in pairs) {
                        var keyval = pairs[p].split("=");
                        queryStringData[keyval[0]] = keyval[1];
                    }

                    battleId = queryStringData["battleId"];
                    battleId = battleId.replace(/[^0-9]/g, '');
                    instantKill = queryStringData["instantKill"];
                    if (instantKill == null) {
                        instantKill = 0;
                    }
                }

                var responseText = xhr.responseText;
                var jresp = JSON.parse(responseText);
                var message = jresp.message;
                var error = jresp.error;

                if (!error && (message == "ENEMY_KILLED" || message == "OK")) {
                    var countdown = $("#battle_countdown").text();
                    var livetime = $("#live_time").text();
                    var eday = $(".eday strong").text();

                    var rank = 0;
                    var level = 0;
                    var exp = 0;
                    var wellness = 0;

                    var countWeapons = 0;
                    var skill = 0;
                    var weaponDamage = 0;
                    var weaponDurability = 0;
                    var givenDamage = 0;
                    var earnedXp = 0;
                    var enemyName = "";
                    var enemyIsNatural = 0;

                    if ((settings.url.match(/military\/deploy-bomb/) != null)) {
                        weaponDamage = jresp.bomb.booster_id;
                        givenDamage = jresp.bomb.damage;
                    } else {
                        storageSet("pulse-lastJresp", responseText);
                        rank = jresp.rank.points;
                        level = jresp.details.level;
                        exp = jresp.details.points;
                        wellness = jresp.details.wellness;

                        countWeapons = jresp.user.countWeapons;
                        skill = jresp.user.skill;
                        weaponDamage = jresp.user.weaponDamage;
                        weaponDurability = jresp.user.weaponDurability;
                        givenDamage = jresp.user.givenDamage;
                        earnedXp = jresp.user.earnedXp;

                        try {
                            enemyName = escape(jresp.oldEnemy.name);
                        } catch (err) {}

                        if (jresp.oldEnemy.isNatural == true)
                            enemyIsNatural = 1;
                    }

                    var domination = $("#blue_domination").text();
                    if (domination != null && domination != undefined && domination != 'undefined')
                        domination = domination.replace("%", "");

                    var att_points = SERVER_DATA.points.attacker;
                    var def_points = SERVER_DATA.points.defender;
                    var round = SERVER_DATA.zoneId;

                    var regionName = "";
                    try {
                        regionName = escape($("#pvp_header h2").text());
                    } catch (err) {}

                    var att_rounds = getAttackerRounds();
                    var def_rounds = getDefenderRounds();

                    var timestamp = new Date().getTime();
                    var armydata = getArmyData();

                    if (enemyName == null) {
                        enemyName = "none";
                    }
                    if (weaponDurability == null) {
                        weaponDurability = 1;
                    }
                    if (givenDamage == 10000) {
                        weaponDamage = 10000;
                    }
                    if (givenDamage == 50000) {
                        weaponDamage = 50000;
                    }
                    //if (earnedXp = null) { enemyName = "0"; }
                    if (exp == null) {
                        exp = "0";
                    }

                    var query = "";
                    query += "citizenId=" + citizenId + "&battleId=" + battleId + "&defenderId=" + defenderId;
                    query += "&citizenName=" + citizenName;
                    query += "&regionName=" + regionName;
                    query += "&givenDamage=" + givenDamage + "&earnedXp=" + earnedXp;
                    query += "&weaponDamage=" + weaponDamage;
                    query += "&skill=" + skill;
                    query += "&rank=" + rank + "&exp=" + exp;
                    query += "&enemyName=" + enemyName;
                    query += "&livetime=" + livetime + "&eday=" + eday;
                    query += "&domination=" + domination;
                    query += "&version=" + pulse_version;
                    query += "&ts=" + timestamp;
                    query += "&DOBattleID=" + DO_BattleID;
                    query += "&DOCountry=" + DO_Country;
                    query += "&DORegion=" + DO_Region;

//////////////////////////////////////////////
//unsafeWindow.console.log("query = " + query);
//////////////////////////////////////////////

                    sendData(query);
                }

            } else if (settings.url.match(/military\/change-weapon/) != null) {

                try {
                    renderWeaponDamage();
                } catch (e) {}
            }

            if (ajax_timeout != null) {
                clearInterval(ajax_timeout);
                ajax_timeout = null;
            }

            enableFightButton();

            ajax_timeout = setTimeout(function () {
                disableFightButton();
            }, 30000);

        });

        function saveData() {
			var ts = new Date().getTime();;

            if ((saveDataTime != null) && (ts < saveDataTime + 3000)) {
                return;
            }
            saveDataTime = ts;

			var domination = "";
            var regionName = "";
            var countdown = "00:00";
            var att_rounds = 0;
            var def_rounds = 0;

            try {
                domination = $("#blue_domination").text();
            } catch (err) {}

            if (domination != null && domination != undefined && domination != 'undefined') {
                domination = domination.replace("%", "");
            }

            try {
                regionName = escape($("#pvp_header h2").text());
            } catch (err) {}

            try {
                countdown = $("#battle_countdown").text();
            } catch (err) {}

            try {
                att_rounds = getAttackerRounds();
            } catch (err) {}

            try {
                def_rounds = getDefenderRounds();
            } catch (err) {}

            var saveObj = {
                domination: domination,
                region: regionName,
                countdown: countdown,
                attRounds: att_rounds,
                defRounds: def_rounds,
                sdata: SERVER_DATA };

            storageSet("pulse-saveData", saveObj);
//////////////////////////////////////////////
//unsafeWindow.console.log("saved data: " +saveDataTime);
//////////////////////////////////////////////
        }

        function sendPVPData() {
/////////// Ezek a változások így maradnak
            var instantKill = 0;
            var countWeapons = 0;
            var weaponDamage = 99999;
            var weaponDurability = 0;
            var earnedXp = 0;
            var enemyIsNatural = 0;


/////////// Mentett változók
            // az utolsó ütés mentett responseTextjéből
            var jresp = storageGet("pulse-lastJresp");
			if (jresp) {
                var rank = jresp.rank.points;
                var level = jresp.details.level;
                var exp = jresp.details.points;
                var wellness = jresp.details.wellness;
                var skill = jresp.user.skill;
            }

            // SERVER_DATA + egyebek PVP join elÅ‘ttrÅ‘l
            var saveObj = storageGet("pulse-saveData");
            var domination = null;
            var regionName = null;
            var countdown = "00:00";
            var defenderId = 0;
            var invaderId = 0;
            var mustInvert = 0;
            var att_points = 0;
            var def_points = 0;
            var round = 0;
            var isResistance = 0;
            var att_rounds = 0;
            var def_rounds = 0;

            domination = saveObj.domination;
            regionName = saveObj.region;
            countdown = saveObj.countdown;
            att_rounds = saveObj.attRounds;
            def_rounds = saveObj.defRounds;

            var BSD = saveObj.sdata;
            if (BSD != null && BSD != undefined && BSD != "undefined") {
                defenderId = BSD.defenderId;
                invaderId = BSD.invaderId;
                mustInvert = BSD.mustInvert;
                att_points = BSD.points.attacker;
                def_points = BSD.points.defender;
                round = BSD.zoneId;
                isResistance = BSD.isResistance;
            }

//////////// Ezek a változók kinyerhetők az oldalból
            var ErpkPvp = unsafeWindow.ErpkPvp;
            var givenDamage = ErpkPvp.user_data.influence || 0;
            var winnerId = ErpkPvp.info_display_data.match_winner || 0;
            var enemyName = escape(ErpkPvp.enemy_data.enemy_name) || 0;
            var citizenName = escape(ErpkPvp.user_data.user_name) || 0;
            var battleId = ErpkPvp.battleId || 0;
            var citizenId = ErpkPvp.citizenId || 0;

            var citizenshipId = getCitizenshipId();
            var groupId = getArmyId();

            var livetime = "00:00";
            var eday = 0;
 
            try {
                livetime = $("#live_time").text();
                eday = $(".eday strong").text();
            } catch (err) {}


            var timestamp = new Date().getTime();
            var armydata = getArmyData();

            var enemyDamage = 0;
            var userDamage = 0;
            try {
                for (var i = 0; i < ErpkPvp.log.length; i++) {
                    if (ErpkPvp.log[i].enemy_action == "fire" || ErpkPvp.log[i].enemy_action == "defend") {
                        enemyDamage += ErpkPvp.log[i].enemy_output;
                    }
                    if (ErpkPvp.log[i].user_action == "fire" || ErpkPvp.log[i].user_action == "defend") {
                        userDamage += ErpkPvp.log[i].user_output;
                    }
                }
            } catch (err) {}

            wellness -= userDamage;

            var query = "";
            query += "citizenId=" + citizenId + "&battleId=" + battleId + "&defenderId=" + defenderId;
            query += "&citizenName=" + citizenName;
            query += "&regionName=" + regionName;
            query += "&givenDamage=" + givenDamage + "&earnedXp=" + earnedXp;
            query += "&weaponDamage=" + weaponDamage;
            query += "&skill=" + skill;
            query += "&rank=" + rank + "&exp=" + exp;
            query += "&enemyName=" + enemyName;
            query += "&livetime=" + livetime + "&eday=" + eday;
            query += "&domination=" + domination;
            query += "&version=" + pulse_version;
            query += "&ts=" + timestamp;
            query += "&DOBattleID=" + DO_BattleID;
            query += "&DOCountry=" + DO_Country;
            query += "&DORegion=" + DO_Region;

//////////////////////////////////////////////
//unsafeWindow.console.log("query = " + query);
//////////////////////////////////////////////

            sendData(query, false);
        }


        (function () {
            if (unsafeWindow.pvp) {

                var proxied = unsafeWindow.pvp.showEndScreen;
                unsafeWindow.pvp.showEndScreen = function (obj) {

                    sendPVPData();

                    if (typeof proxied.apply == 'function') {
                        return proxied.apply(this, arguments);
                    } else {
                        return proxied(arguments[0]);
                    }
                };
            }
        })();

        (function () {
            if (unsafeWindow.ErpkPvp) {

                var proxied = unsafeWindow.ErpkPvp.joinFight;
                unsafeWindow.ErpkPvp.joinFight = function (extras) {

// Ez a funkcio meghivodik a PVP oldalon is amig varunk az ellenfelre
// ahol mar nincsenek meg a fontos adatok, ezert csak a battlefield
// oldalon mentjuk az adatokat
                    var curl = location.href;
                    if (curl == null || curl == undefined || curl == 'undefined') {
                        curl = window.location.href;
                    }
                    if (curl.search("battlefield") != -1) {
                        saveData();
                    }

                    if (typeof proxied.apply == 'function') {
                        return proxied.apply(this, arguments);
                    } else {
                        return proxied(arguments[0]);
                    }
                };

            }
        })();

        try {
            var curl = location.href;
            if (curl == null || curl == undefined || curl == 'undefined') {
                curl = window.location.href;
            }
            if (curl.search(/military/i) != -1) {
                var curlparts = curl.split('/');
                var bId = curlparts[curlparts.length - 1];
                bId = bId.split('?')[0];
                bId = bId.replace(/[^0-9]/g, '');
                currentBattleId = bId;
                setTimeout(function () {
                    forceAjaxCheck();
                }, 2000);
            }
        } catch (err) {}

        // REMOVED VERSION CHECK

    }

    /*
     * QUEUE BASZAS
     * 
     * Queue.js
     *
     * A function to represent a queue
     *
     * Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
     * the terms of the CC0 1.0 Universal legal code:
     * http://creativecommons.org/publicdomain/zero/1.0/legalcode
     *
     * Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
     * items are added to the end of the queue and removed from the front.
     */
    (function ($) {

        $.fn.queueCreate = function (inqueue, options) {
            // initialise the queue and offset

            var queue = inqueue;
            var offset = 0;

            this.sliceQueue = function () {
                queue = queue.slice(offset);
                offset = 0;
                return queue;
            }

            /* Returns the length of the queue. */
            this.getLength = function () {
                // return the length of the queue
                return (queue.length - offset);
            }

            /* Returns true if the queue is empty, and false otherwise. */
            this.isEmpty = function () {
                // return whether the queue is empty
                return (queue.length == 0);
            }

            /* Enqueues the specified item. The parameter is:
             * item - the item to enqueue */
            this.enqueue = function (item) {
                // enqueue the item
                queue.push(item);
            }

            /* Dequeues an item and returns it. If the queue is empty then undefined is returned. */
            this.dequeue = function () {
                // if the queue is empty, return undefined
                if (queue.length == 0) return undefined;

                // store the item at the front of the queue
                var item = queue[offset];

                // increment the offset and remove the free space if necessary
                if (++offset * 2 >= queue.length) {
                    queue = queue.slice(offset);
                    offset = 0;
                }

                // return the dequeued item
                return item;
            }

            /* Returns the item at the front of the queue (without dequeuing it). If the
             * queue is empty then undefined is returned. */
            this.peek = function () {
                // return the item at the front of the queue
                return (queue.length > 0 ? queue[offset] : undefined);
            }

        };

    })($);

    function initPulseQueue() {

        var queue_data = storageGet("pulse-queue-data");
        if (queue_data == null || queue_data == undefined || queue_data == "undefined" || queue_data == "" || typeof(queue_data) == "string") {
            queue_data = [];
            pulse_queue = new $.fn.queueCreate(queue_data);
            storageSet("pulse-queue-data", queue_data);
        } else {
            pulse_queue = new $.fn.queueCreate(queue_data);
            if (isNaN(pulse_queue.getLength())) {
                queue_data = [];
                pulse_queue = new $.fn.queueCreate(queue_data);
                storageSet("pulse-queue-data", queue_data);
            }

        }

        main2();
    }
//////// QUEUE

    disableFightButton();
    initPulseQueue();

//////////////////////////////////////////////
//    var queue = JSON.stringify(storageGet("pulse-queue-data"));
//    unsafeWindow.console.log("queue = " + queue);
//////////////////////////////////////////////
}

function waitJQuery() {
	if (typeof(unsafeWindow.jQuery) != 'function') {
		setTimeout(function () { waitJQuery(); }, 200);
	}
	else {
		$ = unsafeWindow.jQuery;
		initializePersistence();
	}
}

waitJQuery();
