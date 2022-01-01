const ipc = require('electron').ipcRenderer;

function encrypt({ docs, secretKey }) {
    if (Array.isArray(docs)) {
        return docs.map(doc => {
            if (doc.content) {
                return doc
            }

            const docToReturn = {
                _id: doc._id,
                _rev: doc._rev,
            }

            delete doc._id
            delete doc._rev

            const contentEncrypted = ipc.sendSync('encrypt-data', { message: JSON.stringify(doc), secretKey })

            Object.assign(docToReturn, {
                content: contentEncrypted
            })

            return docToReturn
        })
    }

    return ipc.sendSync('encrypt-data', { message: JSON.stringify(docs), secretKey })
}

function decrypt({ docs, secretKey }) {
    if (Array.isArray(docs)) {
        return docs.map(doc => {
            const contentDecrypted = ipc.sendSync('decrypt-data', { content: doc.content, secretKey })
            if (!contentDecrypted) return null;
            delete doc.content


            Object.assign(contentDecrypted, {
                _id: doc._id,
                _rev: doc._rev,
            })
            return contentDecrypted
        }).filter(doc => ![null, undefined].includes(doc))
    }

    const contentDecrypted = ipc.sendSync('decrypt-data', { content: docs.content, secretKey })
    if (!contentDecrypted) return null;

    delete docs.content

    Object.assign(contentDecrypted, {
        _id: docs._id,
        _rev: docs._rev,
    })
    return contentDecrypted;
}

function getSettings() {
    return ipc.sendSync('encryption-get-settings')
}

module.exports = { encrypt, decrypt, getSettings }
