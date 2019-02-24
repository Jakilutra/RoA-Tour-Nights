function InsertChronology() {
  
  // Declaring sheet variables.
  
  var spreadsheet = {},
      sheet = {},
      sheetName = "";
  
  // Assigning sheet variables.
  
  spreadsheet = SpreadsheetApp.getActive();
  sheet = spreadsheet.getActiveSheet();
  sheetName = sheet.getSheetName();
  
  // Sheet check.
  
  if (sheetName !== "Chronology") {
      throw new Error("You are on the " + sheetName + " Sheet! Go to the Chronology Sheet to use this macro!");
      return;
  }
  
  
  // Declaring and assigning another variable: lastRow = Last Filled Row #.
  
  var lastRow = 0;
  lastRow = sheet.getLastRow();
  
  // Adding a row.
  
  sheet.getRange((lastRow)+":"+(lastRow)).activate();
  sheet.insertRowAfter(lastRow);
  
  // Copying last week's row.
  
  sheet.getRange((lastRow+1)+":"+(lastRow+1)).activate();
  sheet.getRange("A"+(lastRow-20)+":"+"Q"+(lastRow-20)).copyTo(sheet.getRange("A"+(lastRow+1)+":"+"Q"+(lastRow+1)));
  
  // Declaring variables for the loop.
  
  var i, clearRanges = [];
  
  // Adding ranges of content to be cleared for the loop.
  
  clearRanges = ["E"+(lastRow+1)+":"+"G"+(lastRow+1),
                 "L"+(lastRow+1)+":"+"N"+(lastRow+1),
                 "P"+(lastRow+1)+":"+"P"+(lastRow+1)];
  
  // Clearing week specific content using the loop.
  
  for (i in clearRanges) {
    sheet.getRange(clearRanges[i]).clearContent();
  }
  
  
  // Declaring and assigning: night cell object and incremented edition #.
  
  var n = {}, nn = 0;
  n = sheet.getRange("C"+(lastRow+1)+":"+"C"+(lastRow+1));
  nn = n.getValue()+3;
  
  // Setting night edition #
  
  n.setValue(nn);
  
  // Copying last week's next week's tiers.
  
  var lastnextweek = "";
  lastnextweek = sheet.getRange("N"+(lastRow-20)+":"+"N"+(lastRow-20)).getValue();
  if (lastnextweek.indexOf(",") === -1 && lastnextweek !== "TBA" && lastnextweek !== "TBD") {
    lastnextweek = "RBY "+lastnextweek+", GSC "+lastnextweek+", ADV "+lastnextweek+", DPP "+lastnextweek+", BW "+lastnextweek+", ORAS "+lastnextweek;
  } 
  sheet.getRange("E"+(lastRow+1)+":"+"E"+(lastRow+1)).setValue(lastnextweek);
  
  // Declaring and assigning: date cell object, time value and incremented date.
  
  var d = {}, dd = {}, ddd = 0;
  d = sheet.getRange("Q"+(lastRow+1)+":"+"Q"+(lastRow+1));
  dd = new Date(d.getValue());
  ddd = dd.getTime() + 7*24*60*60*1000;
  dd = new Date(ddd);
  
  // Setting date.
  
  d.setValue(dd);
  
  
  // Declaring cases sheet expansion variables
  
  var targetRange = [],
      maxRow = 0,
      rowDif = 0;
  
  // Determing the quantity of rows needed for expansion
  
  sheet = spreadsheet.getSheetByName("Cases");
  targetRange = sheet.getRange("E6:E").getValues();
  lastRow = targetRange.filter(String).length + 5;    
  maxRow = sheet.getMaxRows();
  rowDif = lastRow + 7 - maxRow;
  
  // Expanding the cases sheet by the necessary number of rows.
  
  if (rowDif > 0) {
    sheet.insertRowsAfter(lastRow, rowDif);
    sheet.getRange((lastRow)+":"+(lastRow)).autoFill(sheet.getRange("A"+(lastRow)+":"+"M"+(lastRow+rowDif)), SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
  }
  
};

function InsertAliases() {
  
  // Declaring sheet variables.
  
  var spreadsheet = {},
      sheet = {},
      sheetName = "";
  
  // Assigning sheet variables.
  
  spreadsheet = SpreadsheetApp.getActive();
  sheet = spreadsheet.getActiveSheet();
  sheetName = sheet.getSheetName();
  
  // Sheet check.
  
  if (sheetName !== "Aliases") {
      throw new Error("You are on the " + sheetName + " Sheet! Go to the Aliases Sheet to use this macro!");
      return;
  }
  
  // Declaring and assigning another variable: lastRow = Last Filled Row #.
  
  var lastRow = 0;
  lastRow = sheet.getLastRow();
  
  // Adding a row.
  
  sheet.getRange(lastRow+":"+lastRow).activate();
  sheet.insertRowAfter(lastRow);
  
  // Copying the last row.
  
  sheet.getRange((lastRow+1)+":"+(lastRow+1)).activate();
  sheet.getRange("A"+(lastRow)+":"+"D"+(lastRow)).copyTo(sheet.getRange("A"+(lastRow+1)+":"+"D"+(lastRow+1)));
  
  
  // Clearing content.
  
  sheet.getRange("B"+(lastRow+1)+":"+"D"+(lastRow+1)).clearContent();
};

function UpdateStandings() {
  
  // Declaring variables.
  
  var spreadsheet = {},
      cSheet = {},
      hostSheet = {},
      tierSheet = {},
      winnerSheet = {},
      aliasSheet = {},
      makeArray = function () {},
      cHosts = [],
      cTiers = [],
      cWinners = [],
      hosts = [],
      gen = [],
      tiername = [],
      tiers = [],
      winners = [],
      h, g, t, n, w,
      upper = function () {},
      uHosts = [],
      uTiers = [],
      uWinners = [],
      nHosts = [],
      nTiers = [],
      nWinners = [],
      lastRow = 0;
  
  // Assigning sheet variables.
  
  spreadsheet = SpreadsheetApp.getActive();
  cSheet = spreadsheet.getSheetByName("Cases");
  hostSheet = spreadsheet.getSheetByName("Host Standings");
  tierSheet = spreadsheet.getSheetByName("Tier Standings");
  winnerSheet = spreadsheet.getSheetByName("Winner Standings");
  aliasSheet = spreadsheet.getSheetByName("Aliases");
  
  // Creating a function to convert ranges to arrays.
  
  makeArray = function (range){
    return range.getValues().join().split(',').filter(Boolean);
  };
  
  // Creating arrays from chronology sheet data.
  
  cHosts = makeArray(cSheet.getRange("B6:B")); 
  cTiers = makeArray(cSheet.getRange("C6:C"));
  cWinners = makeArray(cSheet.getRange("D6:D"));
  
  // Creating arrays from host, tier and winner standings that will later be compared with the chronology arrays.
  
  hosts = makeArray(hostSheet.getRange("C6:C")); 
  gen = makeArray(tierSheet.getRange("C5:C")); 
  tiername = makeArray(tierSheet.getRange("D5:D"));
  winners = makeArray(winnerSheet.getRange("C6:C"));
  
  // Concatenating tier names with their generations.
  
  for (g in gen){
    tiers[g] = gen[g]+" "+tiername[g];
  }
  
  // Creating function to map an array's elements to upper case.
  
  upper = function (array) { 
    return array.map(
      function(value) {
        return value.toUpperCase();
      }
    )
  };
  
  // Converting the host, tier and winner standings arrays to upper case.
  
  uHosts = upper(hosts);
  uTiers = upper(tiers);
  uWinners = upper(winners);
  
  // Comparing arrays of Hosts, Tiers, Winners and creating difference arrays.
  
  for (h in cHosts) {
    if (uHosts.indexOf(cHosts[h].toUpperCase()) === -1){
      nHosts.push(cHosts[h]);
    }
  }
  for (t in cTiers) {
    if (uTiers.indexOf(cTiers[t].toUpperCase()) === -1){
      nTiers.push(cTiers[t]);
    }
  }
  for (w in cWinners) {
    if (uWinners.indexOf(cWinners[w].toUpperCase()) === -1){
      nWinners.push(cWinners[w]);
    }
  }
  
  // Inserting and filling rows corresponding to the Hosts, Tiers and Winners difference arrays.
  
  lastRow = hostSheet.getLastRow();
  while (nHosts.length > 0) {
    hostSheet.getRange(lastRow+":"+lastRow).activate();
    hostSheet.insertRowAfter(lastRow);
    hostSheet.getRange("A"+(lastRow)+":"+"M"+(lastRow)).activate();
    hostSheet.getActiveRange().autoFill(hostSheet.getRange("A"+(lastRow)+":"+"M"+(lastRow+1)), SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
    hostSheet.getRange("C"+(lastRow+1)).activate();
    hostSheet.getCurrentCell().setValue(nHosts[0]);
    nHosts.shift();
    lastRow++;
  }
  lastRow = tierSheet.getLastRow();
  for (n in nTiers){
    nTiers[n] = nTiers[n].split(" ");
  }
  while (nTiers.length > 0) {
    tierSheet.getRange(lastRow+":"+lastRow).activate();
    tierSheet.insertRowAfter(lastRow);
    tierSheet.getRange("A"+(lastRow)+":"+"G"+(lastRow)).activate();
    tierSheet.getActiveRange().autoFill(tierSheet.getRange("A"+(lastRow)+":"+"G"+(lastRow+1)), SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
    tierSheet.getRange("C"+(lastRow+1)).activate();
    tierSheet.getCurrentCell().setValue(nTiers[0][0]);
    nTiers[0].shift();
    nTiers[0] = nTiers[0].join(" ");
    tierSheet.getRange("D"+(lastRow+1)).activate();
    tierSheet.getCurrentCell().setValue(nTiers[0]);
    nTiers.shift();
    lastRow++;
  }
  lastRow = winnerSheet.getLastRow();
  while (nWinners.length > 0) {
    winnerSheet.getRange(lastRow+":"+lastRow).activate();
    winnerSheet.insertRowAfter(lastRow);
    winnerSheet.getRange("A"+(lastRow)+":"+"L"+(lastRow)).activate();
    winnerSheet.getActiveRange().autoFill(winnerSheet.getRange("A"+(lastRow)+":"+"L"+(lastRow+1)), SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES);
    winnerSheet.getRange("C"+(lastRow+1)).activate();
    winnerSheet.getCurrentCell().setValue(nWinners[0]);
    nWinners.shift();
    lastRow++;
  }
  
  // Delay hack due to winnerSheet being prematurely sorted.
  
  lastRow = winnerSheet.getLastRow();
  
  // Sorting all tables.
  
  var sort = function (a,b,c,d) {
    a.getRange("A6:M").activate().sort([{column: 2, ascending: true}, {column: 5, ascending: false}, {column: 3, ascending: true}]);
    b.getRange("A5:G").activate().sort([{column: 2, ascending: true}, {column: 4, ascending: true}]);
    c.getRange("A6:L").activate().sort([{column: 2, ascending: true}, {column: 3, ascending: true}]);
    d.getRange("A6:D").activate().sort([{column: 2, ascending: true}]);
  }
  sort(hostSheet, tierSheet, winnerSheet, aliasSheet);
  
  // Setting up variables to find zeroes.
  
  var hostsN = [], 
      tiersN = [],
      winnersN = [], 
      h0 = 0, hc = 0, 
      t0 = 0, tc = 0,
      w0 = 0, wc = 0;
  
  hostsN = hostSheet.getRange("D6:D").getValues();
  tiersN = tierSheet.getRange("E6:E").getValues();
  winnersN = winnerSheet.getRange("D6:D").getValues();
  hc = 6; tc = 6; wc = 6;
  
  // Removing all hosts, tiers and winners with 0 usage from their respective standings.
  
  for (h0 in hostsN) {
    if (hostsN[h0][0] === 0) {
      hostSheet.deleteRow(parseInt(h0)+hc);
      hc--;
    }
  }
  for (t0 in tiersN) {
    if (tiersN[t0][0] === 0) {
      tierSheet.deleteRow(parseInt(t0)+tc);
      tc--;
    }
  }
  for (w0 in winnersN) {
    if (winnersN[w0][0] === 0) {
      winnerSheet.deleteRow(parseInt(w0)+wc);
      wc--;
    }
  }
  
  // Update Message.
  
  spreadsheet.toast("All Standings have been updated!")
};
