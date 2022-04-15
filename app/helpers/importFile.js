const fs = require('fs');
const { decryptDataToImport } = require('./encryption');

function parseImportFile(filePath, secretKey, callback) {
  try {
    const fileData = fs.readFileSync(filePath);

    const parsedData = JSON.parse(fileData);

    const { data } = parsedData;

    const dataDecrypted = decryptDataToImport({ data, secretKey });

    const { contacts, invoices, settings, encryption } = dataDecrypted;

    const newContacts = contacts.map((doc) => {
      delete doc._rev;
      return doc;
    });

    const newInvoices = invoices.map((doc) => {
      delete doc._rev;
      return doc;
    });

    callback(null, {
      contacts: newContacts,
      invoices: newInvoices,
      settings,
      encryption,
    });
    return;
  } catch (error) {
    callback(error, null);
  }
}

module.exports = { parseImportFile };
