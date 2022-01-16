const { encryptData, decryptData } = require('../test/helper');

module.exports = {
  app: jest.fn(),
  ipcRenderer: {
    send: jest.fn(),
    on: jest.fn(),
    sendSync: jest.fn((name, { message, content }) => {
      if (name === 'encrypt-data') {
        const dataEncrypted = encryptData({ message });
        return dataEncrypted;
      }

      if (name === 'decrypt-data') {
        const dataDecrypted = decryptData({ content });
        return dataDecrypted;
      }
    }),
  },
  remote: {
    require: jest.fn((name) => {
      if (name === 'electron-settings') {
        return {
          setSync: jest.fn(),
          getSync: jest.fn(() => 'someSettings'),
        };
      }
    }),
  },
};
