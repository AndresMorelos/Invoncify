const fs = require('fs-extra');
const { decryptDataToImport } = require('./encryption');

function parseImportFile(filePath, secretKey, callback) {
  try {
    const fileData = fs.readJSONSync(filePath);

    const { data, encryptionSettings } = fileData;

    const { iv, salt } = encryptionSettings;

    const dataDecrypted = decryptDataToImport({
      data,
      iv,
      salt,
      secretKey,
    });

    const { contacts, invoices, settings } = dataDecrypted;

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
      encryption: encryptionSettings,
    });
    return;
  } catch (error) {
    callback(error, null);
  }
}

module.exports = { parseImportFile };
