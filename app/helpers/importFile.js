const fs = require('fs')

function parseImportFile(filePath, callback) {
    try {
        const data = fs.readFileSync(filePath);
        const parsedData = JSON.parse(data)

        const { contacts, invoices } = parsedData;

        const newContacts = contacts.map(doc => {
            delete doc._rev;
            return doc
        })

        const newInvoices = invoices.map(doc => {
            delete doc._rev;
            return doc
        })

        Object.assign(parsedData, { contacts: newContacts, invoices: newInvoices })

        callback(null, parsedData);
        return;
    } catch (error) {
        callback(error, null);
        return;
    }

}


module.exports = { parseImportFile }