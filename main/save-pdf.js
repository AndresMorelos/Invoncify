// Libs
const { BrowserWindow, ipcMain, shell } = require('electron');
const appConfig = require('electron-settings');
const path = require('path');
const fs = require('fs');
const { truncate } = require('lodash');
const { v4 } = require('uuid');



function createExportName(format, invoice) {
  const defaultLanguage = appConfig.getSync('general.language');
  
  const createdAt = new Date(invoice.created_at);
  const currentDate = new Date();
  format = format.replace(
    /{invoiceID}/g,
    invoice.invoiceID
      ? invoice.invoiceID
      : truncate(invoice._id, {
          length: 8,
          omission: '',
        })
  );
  
  format = format.replace(/{createdAt.month}/g, createdAt.getMonth() + 1);
  format = format.replace(/{createdAt.MMMM}/g, createdAt.toLocaleString(defaultLanguage, { month: 'long' }));
  format = format.replace(/{createdAt.day}/g, createdAt.getDate());
  format = format.replace(/{createdAt.year}/g, createdAt.getFullYear());
  format = format.replace(/{date.month}/g, currentDate.getMonth() + 1);
  format = format.replace(/{date.MMMM}/g, currentDate.toLocaleString(defaultLanguage, { month: 'long' }));
  format = format.replace(/{date.day}/g, currentDate.getDate());
  format = format.replace(/{date.year}/g, currentDate.getFullYear());
  format = format.replace(/{UUID}/g, v4());
  return format;
}

ipcMain.on('save-pdf', (event, invoice) => {
  const exportDir = appConfig.getSync('invoice.exportDir');
  const exportNamingFormat = appConfig.getSync('invoice.exportNamingFormat');
  const pdfPath = path.join(
    exportDir,
    `${createExportName(exportNamingFormat, invoice)}.pdf`
  );
  const win = BrowserWindow.fromWebContents(event.sender);

  let printOptions;
  if (appConfig.hasSync('general.printOptions')) {
    printOptions = appConfig.getSync('general.printOptions');
  } else {
    printOptions = {
      landscape: false,
      marginsType: 0,
      printBackground: true,
      printSelectionOnly: false,
    };
  }

  win.webContents
    .printToPDF(printOptions)
    .then((data) => {
      fs.writeFileSync(pdfPath, data);

      if (appConfig.getSync('general.previewPDF')) {
        // Open the PDF with default Reader
        shell.openPath(pdfPath);
      }
      // Show notification
      event.sender.send('pdf-exported', {
        title: 'PDF Exported',
        body: 'Click to reveal file.',
        location: pdfPath,
      });
    })
    .catch((err) => {
      throw err;
    });
});

ipcMain.on('reveal-file', (event, location) => {
  shell.showItemInFolder(location);
});
