# G-chimp
Google Apps script to send phishing emails automatically from a list of emails, subjects, and htmlBody found in a Google Sheet

## Usage Instructions
1. Log into the gmail/gsuite account you want to send emails from
2. Create a Google Sheet with the following columns
  * Column A - F must be as follows: email address, Sender display name, subject, plaintext body, html body, sent
  * The sent column will be filled with "EMAIL_SENT" by the script once it sends to that email
  * If you want to send again to the same email on a subsequent run of the script, erase "EMAIL_SENT" in that row.
  * The plaintext body will be used if the recipient email client does not support html messages. Otherwise the htmlBody will be used.
3. From the Google Sheet, "Select Tools-->Script Editor" and paste in this script
4. Press the "Play" button on the toolbar to run the script
5. Switch back to your Google Sheets tab to dismiss the dialog box and see the results

## Adding attachments
If you want to send attachments, uncomment the attachment code and adjust to your needs.

```
// Send an email with two attachments: a file from Google Drive and an HTML file.
var file = DriveApp.getFileById...
var blob = Utilities.newBlob...

attachments: [file.getAs(MimeType.PDF), blob]  //use ctrl+space after the MimeType. to see the list of MimeType options 
```
