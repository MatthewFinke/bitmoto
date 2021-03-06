// Crawl Gmail and extract a download link and download file to drive


function downloadFileFromGmail() {
  
  var threads = GmailApp.search("label:reports");
  var message = threads[0].getMessages()[0];
  var content = message.getBody();
    
    // Dev - Make the first sheet active
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    SpreadsheetApp.setActiveSheet(ss.getSheets()[0]);
    
    var sheet = SpreadsheetApp.getActiveSheet();
    //var csvData = Utilities.parseCsv(attachment.getDataAsString(), ",");
  
    // Parses the html and extracts link
    var href = content.match(/href="([^"]*)/g)[5];
    var prelink = href.replace(/&amp;/g, "&");
    var link = prelink.replace('href="', "");
    
    // Clear the content of the sheet and import data
    sheet.clearContents();
    sheet.getRange(1, 1).setValue(link);


  // Downloading the file from the link
  
  var urlData = UrlFetchApp.fetch(link);

  var fileBlob = urlData.getBlob();
  var folder = DriveApp.getFolderById('1HiRl-YeX2tWMk8J8OQhl14fG6hu3B96l');
  var result = folder.createFile(fileBlob);

  
}
