var EMAIL_SENT = 'EMAIL_SENT';

/*
// Send an email with two attachments: a file from Google Drive and an HTML file.
var file = DriveApp.getFileById('1ExL17aFN8mj_cXwjMeQ5XuSlrup_Agsq'); //right click on document in google drive and select "Get shareable link" to view the ID
var blob = Utilities.newBlob('Insert any HTML content here', 'text/html', 'my_document.html');
*/

function sendEmails() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2; // First row of data to process
  var numRows = SpreadsheetApp.getActiveSpreadsheet().getLastRow()-1; // Number of rows to process
  // Fetch the range of cells A2:B3
  var dataRange = sheet.getRange(startRow, 1, numRows, 6);
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  var numSent = 0;
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var emailAddress = row[0]; // First column
    var name = row[1]; // Second column
    var subject = row[2]; // Thire column
    var plaintextBody = row[3]; // Fourth column
    var htmlBody = row[4]; // Fifth column
    var emailSent = row[5]; // Sixth column
    if (emailSent != EMAIL_SENT) { // Prevents sending duplicates
    MailApp.sendEmail(emailAddress, subject, plaintextBody, {
     name: name,
      htmlBody: htmlBody,
/*       attachments: [file.getAs(MimeType.PDF), blob]  //use ctrl+space after the MimeType. to see the list of MimeType options */
    });
      numSent = numSent + 1
      sheet.getRange(startRow + i, 6).setValue(EMAIL_SENT);
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
    }
  }
  
  
  var ui = SpreadsheetApp.getUi();
  var result = ui.alert(
     'Success',
     numSent + ' messages Sent',
     ui.ButtonSet.OK);
}
