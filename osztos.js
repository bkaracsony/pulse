function kanoc() {
  // Doksik betárazása
  var tuzer = SpreadsheetApp.openById("0AnDzmVYWYVeTdGFUcUVfWmRodUdESjhyOU1PYnVfOUE");
  var oszto = tuzer.getSheetByName("Osztás2");
  var stat = tuzer.getSheetByName("Stat");
  var soldiers = tuzer.getRangeByName("soldiers");
  var managers = tuzer.getRangeByName("managers");
  
  // Ha az erepDay script hibát adott (nem fut az erep oldal), nem fut le
  if(oszto.getRange(1,1).getValue() == "WrongDay"){
    oszto.getRange(2,2).setValue("WrongDayOszto");
    return;
  }
    
  // Minden nap más oszlopba kerül
  var erepDay = oszto.getRange(1,1).getValue()-1;
  var hetnapja = ((erepDay+1) % 7) + 1;
  
  // Osztólapról alapértékek beolvasása
  var ossztank = parseFloat(oszto.getRange(66,1).getValue());
  var alaptank = parseFloat(oszto.getRange(68,1).getValue());
  var opciokredit = parseFloat(oszto.getRange(70,1).getValue());
  var opcioutes = parseFloat(oszto.getRange(72,1).getValue());
  var modosito = parseFloat(oszto.getRange(74,1).getValue());
  var kompenzacio = Math.round(ossztank * 0.1);
  var letszam = soldiers.getHeight();
  
  // Erő olvasása Soldiers fülről
  var nev = new Array();
  var ero = new Array();
  var maxero = 0;
  // Átlagerő: a 15. leggyengébb erejű ember ereje
  var atlagero = soldiers.getCell(16,42).getValue();
  for(var i = 1; i <= letszam; i++){
    var id = parseInt(soldiers.getCell(i,1).getValue());
    ero[id] = Math.round(soldiers.getCell(i,33).getValue());
    nev[id] = soldiers.getCell(i,3).getValue();
    if(maxero < ero[id])
      maxero = ero[id];
  }
  
  // Erőmódosító számolása
  // szuperképlet: (-x^2 + x * y)/(10y) , ahol x az aktuális erő és y a maximum erő és 350-ben minimalizálva van
  var ero_m = new Array();
  for(var j in ero){
    if(((-ero[j]^2 + -ero[j]^2 * maxero) / (10 * maxero)) < 350)
       ero_m[j] = 350;
    else
      ero_m[j] = (-ero[j]^2 + -ero[j]^2 * maxero) / (10 * maxero);
  }
  
  // Manager tankok számítása
  var manager = new Array();
  var osszmanager = 0;
  var isEvenDay = new Boolean();
  if((erepDay)%2 != 0){
  // Aktuális napot nézzük, ezért fordított, akkor páros, ha van maradék
    isEvenDay = true;
  }
  else
    isEvenDay = false;
    
  for(var i = 1; i <= managers.getHeight(); i++){
    var id = managers.getCell(i,2).getValue();
    var cegszam = managers.getCell(i,4).getValue();
    var managertank;
    // Managertankok képlete, páros napon felfelé, páratlanon lefelé kerekítünk
    if(isEvenDay == true){
      managertank = Math.ceil(cegszam/2);
    }
    else{
      managertank = Math.floor(cegszam/2);
    }
    manager[id] = managertank;
    osszmanager += managertank;
  }
  
  // Egov lemásolása
  var kredit = new Array();
  var utes = new Array();
  var kill = new Array();
  var sebzes = new Array();
  var egovlink = "http://gat.kelengye.hu/api/osztos.php?day="+erepDay;
  var egovtext = UrlFetchApp.fetch(egovlink).getContentText();
  var vege = -1;
  var egovstart = 0;
  var osszkredit = 0;
  for(var i = 1; i <= letszam; i++){
      if (vege == -1){
        // Nev
        var nFrom = egovtext.indexOf("#",egovstart) + 2;
        var nTo = egovtext.indexOf(";", nFrom);
        //var nev = egovtext.substring(nFrom,nTo);
        
        // ID
        nFrom = nTo + 1;
        nTo = egovtext.indexOf(";", nFrom);
        var id = parseInt(egovtext.substring(nFrom,nTo));
        
        // Ütésszám
        nFrom = nTo + 1;
        nTo = egovtext.indexOf(";", nFrom);
        utes[id] = parseInt(egovtext.substring(nFrom,nTo));
       
        
        // Kill
        nFrom = nTo + 1;
        nTo = egovtext.indexOf(";", nFrom);
        kill[id] = parseInt(egovtext.substring(nFrom,nTo));
  
        
        // Sebzés
        nFrom = nTo + 1;
        nTo = egovtext.indexOf(";", nFrom);
        sebzes[id] = parseInt(egovtext.substring(nFrom,nTo));
        
        // Kredit
        nFrom = nTo + 1;
        nTo = egovtext.indexOf(";", nFrom);
        kredit[id] = parseInt(egovtext.substring(nFrom,nTo));
        osszkredit += kredit[id];
        
        // Ha túlfutnánk a listán, akkor lelőjük
        nFrom = nTo + 1;
        nTo = egovtext.indexOf(";", nFrom);
        egovstart = nTo;
        var vege_s = egovtext.substring(nTo,nTo+15);
        vege = vege_s.indexOf("@");
      }
      else
        break;
    }
  
  // egov link kiírása, egyelőre automata
  //oszto.getRange(1,hetnapja * 2).setValue("=hyperlink(\"" + egovlink + "\";\"" + erepDay + "\")");
  oszto.getRange(2,1).setValue("Taglétszám: " + letszam);
     
  // Stat oldal kitöltése
  i = 3;
  for (var j in ero){
    // Szamárpad
    if(utes[j] == undefined) continue;
    
    stat.getRange(i, 9*(hetnapja-1)+1).setValue(nev[j]);
    stat.getRange(i, 9*(hetnapja-1)+2).setValue(utes[j]);
    stat.getRange(i, 9*(hetnapja-1)+3).setValue(kill[j]);
    stat.getRange(i, 9*(hetnapja-1)+4).setValue(sebzes[j]);
    stat.getRange(i, 9*(hetnapja-1)+5).setValue(kredit[j]);
    stat.getRange(i, 9*(hetnapja-1)+6).setValue(Math.round(sebzes[j]/kredit[j]));
    i++;
  }
  // Sorbarendezés
  var stat_range = stat.getRange(3, 9*(hetnapja-1)+1, letszam, 6);
  stat_range.sort({column: 9*(hetnapja-1)+5, ascending: false});
  
  
    // Kredit sávozás: aki az összkredit 10%-nál többet szerzett, azt leszabályozza 10%-ra
    // Ütés sávozás: aki többet üt mint 500, azt lekorlátozza 500 ütésre
    for(var j in kredit){
      if((kredit[j] / osszkredit) > 0.1)
        kredit[j] = osszkredit * 0.1;
      if(utes[j] > 500)
        utes[j] = 500;
    }
    
    // tankovice: 3 tényező módosítókkal összeadva
    // summarum: a mérőszámok összege, az arányosítás nevezője
    var nullasok = 0;
    var kicsik = 0;
    var summarum = 0;
    var tankovice = new Array();
    for(var j in ero){
      
      var summa = (kredit[j]*opciokredit)+(utes[j]*opcioutes)+(ero_m[j]*modosito);
      // akik nulla kreditet ütöttek vagy nincsenek benne a listában
      if(isNaN(summa) || kredit[j] == undefined || kredit[j] == 0){
        nullasok++;
        summa = 0;
      }
      tankovice[j] = Math.round(summa);
      // Akik a 15 leggyengébb erővel rendelkeznek, azokat összeszámoljuk
      if(ero[j] < atlagero)
        kicsik++;
      // ha nem találunk az illetőhöz manager céget, akkor kinullázuk a managertankot
      if(manager[j] == undefined)
        manager[j] = 0;
      summarum += summa;
    }
    
    // pretank: osztandó tank számítás
    var i = 3;
    var pretank = new Array();
    var kompenzacio_kopf = Math.round(kompenzacio / kicsik);
    for (var j in ero){
      // nulla kreditesek
      if(tankovice[j] == 0)
        pretank[j] = alaptank + manager[j];
      // akik olyan keveset ütöttek, hogy kevesebbet kapnának, mint az alaptank, azoknak alaptank
      // az alaptankokat fixen kiosztjuk a managertankokkal együtt, ezért a számlálót csökkenteni kell
      // a keretből megmaradt maradék tankhoz arányosítjuk a mérőszámot
      else if(((ossztank - (nullasok * alaptank + osszmanager)) / summarum * tankovice[j]) <= alaptank){
        if(ero[j] < atlagero)
          pretank[j] = alaptank + manager[j] + kompenzacio_kopf;
        else
          pretank[j] = alaptank + manager[j];
      }
      // többet ütöttek mint az alaptank, szokásos arányosítás
      else{
        if(ero[j] < atlagero)
          pretank[j] = Math.round((ossztank - (nullasok * alaptank + osszmanager)) / summarum * tankovice[j] + manager[j] + kompenzacio_kopf);
        else
          pretank[j] = Math.round((ossztank - (nullasok * alaptank + osszmanager)) / summarum * tankovice[j] + manager[j]);
      }
      var profillink = "http://www.erepublik.com/en/economy/donate-items/" + j;
      oszto.getRange(i,1).setValue("=hyperlink(\"" + profillink + "\";\"" + nev[j] + "\")");
      oszto.getRange(i,hetnapja * 2).setValue(pretank[j]);
      i++;
    }
  }
