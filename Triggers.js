function onEdit(e) {
  
  // Declaring sheet variables.
  
  var spreadsheet = {},
      sheet = {},
      cell = {},
      cellValue = "",
      address = "";
  
  // Assigning sheet variables.
  
  spreadsheet = SpreadsheetApp.getActive();
  sheet = spreadsheet.getActiveSheet();
  cell = sheet.getActiveCell();
  cellValue = cell.getValue();
  address = cell.getA1Notation();
  
  // Show/Hide Extra Time Zone Columns
  
  if (address === "A3" && sheet.getName() === "Schedule"){
    if (cellValue === "Show Extra Time Zones"){
      sheet.showColumns(7,2);
      sheet.showColumns(10);
      sheet.showColumns(12,3);
    }
    if (cellValue === "Hide Extra Time Zones"){
      sheet.hideColumns(7,2);
      sheet.hideColumns(10);
      sheet.hideColumns(12,3);
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
  
  spreadsheet = SpreadsheetApp.openById("1ye_HTjC_jrExwMDPM2X1mtXhSDQOtjg841SzBno0ExU");
  sheet = spreadsheet.getSheetByName("Schedule");
  acell = sheet.getRange(3,15);
  ecell = sheet.getRange(3,6);
  acellValue = acell.getValue();
  ecellValue = ecell.getValue();
  ad.setDate(ad.getDate() - 7);
  ed.setDate(ed.getDate() + 7);
  
  // Daylight Saving Time Checks.
  
  if (d.getDay() === 7) {
    if ((ad.getMonth() > 2 && d.getMonth() < 11) && acellValue === "Off") {
      acell.setValue("On");
    }
    if ((ad.getMonth() < 3 || d.getMonth() > 10) && acellValue === "On") {
      acell.setValue("Off");
    }
    if ((ed.getMonth() > 3 && ed.getMonth() < 11) && ecellValue === "Off") {
      ecell.setValue("On");
    }
    if ((ed.getMonth() < 4 || ed.getMonth() > 10) && ecellValue === "On") {
      ecell.setValue("Off");
    }
  }
}
