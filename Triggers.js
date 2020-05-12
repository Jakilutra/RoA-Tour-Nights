function onEdit(e) {
  
  // Declaring sheet variables.
  
  var spreadsheet = {},
      sheet = {},
      cell = {},
      colorRange = {},
      pools = {},
      poolTitles = {},
      cellValue = "",
      address = "";
  
  // Assigning sheet variables.
  
  spreadsheet = SpreadsheetApp.getActive();
  sheet = spreadsheet.getActiveSheet();
  cell = sheet.getActiveCell();
  cellValue = cell.getValue();
  address = cell.getA1Notation();
  
  // Schedule sheet.
  
  if (sheet.getName() === "Schedule") {
    
    // Show/Hide Extra Time Zone Columns
    
    if (address === "A3") {
      if (cellValue === "Show Extra Time Zones") {
        sheet.showColumns(7,2);
        sheet.showColumns(10);
        sheet.showColumns(12,3);
      }
      if (cellValue === "Hide Extra Time Zones") {
        sheet.hideColumns(7,2);
        sheet.hideColumns(10);
        sheet.hideColumns(12,3);
      }
    }
    
    // Change color of pools background.
    
    if (address === "P4"){
      colorRange = sheet.getRange("P4:Q4");
      poolTitles = {h:"#ff4d6a",t:"#db8903",w:"#dfc90c"};
      colorRange.setBackground(poolTitles[cellValue.substr(0,1).toLowerCase()]);
      colorRange = sheet.getRange("P5:Q27");
      pools = {h:"#ffbbcf",t:"#ffcd00",w:"#fffd49"};
      colorRange.setBackground(pools[cellValue.substr(0,1).toLowerCase()]);
    }
  }
  
  // Chronology Sheet.
  
  if (sheet.getName() === "Chronology") {
    
    // Correcting delimiters and removing excess spaces.
    if (e.oldValue !== cellValue) {
      if (address[0] === "H" || address[0] === "I" || address[0] === "J" || address[0] === "K" || address[0] === "R") {
        cell.setValue(cellValue.replace(/\s{2,}/," ").replace(/,(\S)/,", $1").replace(/^\s([^,\s])/,"$1").replace(/([^,\s])\s,/,"$1,").replace(/([^,\s])\s$/,"$1"));
      }
    }
  }  
}

function dstCheck () {
  
  // Declaring sheet variables.
  
  var spreadsheet = {},
      sheet = {},
      acell = {},
      ecell = {},
      acellValue = "",
      ecellValue = "",
      d = new Date(),
      ad = new Date(),
      ed = new Date();
  
  // Assigning sheet variables.
  
  spreadsheet = SpreadsheetApp.openById("1VdHbQb6uJdDPLLR5jtemBfmyVJBotbFXmfZocgVdoK8");
  sheet = spreadsheet.getSheetByName("Schedule");
  acell = sheet.getRange(3,6);
  ecell = sheet.getRange(3,15);
  acellValue = acell.getValue();
  ecellValue = ecell.getValue();
  ad.setDate(ad.getDate() - 7);
  ed.setDate(ed.getDate() + 7);
  
  // Daylight Saving Time Checks.
  
  if (d.getDay() === 0) {
    if ((ad.getMonth() > 1 && d.getMonth() < 10) && acellValue === "Off") {
      acell.setValue("On");
    }
    if ((ad.getMonth() < 2 || d.getMonth() > 9) && acellValue === "On") {
      acell.setValue("Off");
    }
    if ((ed.getMonth() > 2 && ed.getMonth() < 10) && ecellValue === "Off") {
      ecell.setValue("On");
    }
    if ((ed.getMonth() < 3 || ed.getMonth() > 9) && ecellValue === "On") {
      ecell.setValue("Off");
    }
  }
}
