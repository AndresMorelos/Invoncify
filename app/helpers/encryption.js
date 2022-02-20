const encryption = window.invoncify.encryption;

function encrypt({ docs, secretKey }) {
  if (Array.isArray(docs)) {
    return docs.map((doc) => {
      if (doc.content) {
        return doc;
      }

      const docToReturn = {
        _id: doc._id,
        _rev: doc._rev,
      };

      const contentEncrypted = encryption.encrypt({
        message: JSON.stringify(doc),
        secretKey,
      });

      Object.assign(docToReturn, {
        content: contentEncrypted,
      });

      return docToReturn;
    });
  }

  return encryption.encrypt({ message: JSON.stringify(docs), secretKey });
}

function decrypt({ docs, secretKey }) {
  if (Array.isArray(docs)) {
    return docs
      .map((doc) => {
        const contentDecrypted = encryption.decrypt({
          content: doc.content,
          secretKey,
        });
        if (!contentDecrypted) return null;

        Object.assign(contentDecrypted, {
          _id: doc._id,
          _rev: doc._rev,
        });
        return contentDecrypted;
      })
      .filter((doc) => ![null, undefined].includes(doc));
  }

  const contentDecrypted = encryption.decrypt({
    content: docs.content,
    secretKey,
  });
  if (!contentDecrypted) return null;

  Object.assign(contentDecrypted, {
    _id: docs._id,
    _rev: docs._rev,
  });
  return contentDecrypted;
}

function decryptDataToImport({ data, secretKey }) {
  const contentDecrypted = encryption.decrypt({
    content: data,
    secretKey,
  });
  if (!contentDecrypted) return null;

  return contentDecrypted;
}

function getSettings() {
  return encryption.getSettings();
}

function setSettings(iv, salt, validation) {
  return encryption.setSettings({ iv, salt, validation });
}

module.exports = {
  encrypt,
  decrypt,
  decryptDataToImport,
  getSettings,
  setSettings,
};
