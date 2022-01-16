const { v4: uuidv4 } = require('uuid');
const { encryptData } = require('../../../test/helper');

const contactDoc = {
  _id: 'id-string',
  _rev: 'id-string',
  content:
    '7d53384cd508b887b7327bb2874d39d2ae60ad70fe77f259a4da12c682c6aeddeefea17578516bca8e757dbe9077257d7759d0be24ed3ecd9cd6243c79',
};

const invoiceDoc = {
  _id: 'id-string',
  _rev: 'id-string',
  content:
    '7d53384cd508b887b7327ba887542199e127e929b069f95ba0cf5999cef8e389b58fa96f631f2989867d3eedde1f70313d65d0913bad7dc19ad4287768b2297ad11fa56f20534e13e367bbcedbecdb6af4610f15e0852a57950b6180dc45032422a8cfd9ae65e370beba7cfed98d07c57f7585a0966e9a28754b81f98bf8904974c327d3092b5c9f526016a7d3f0ee920dca6a2667d14b5e5e8f41fd587ac1',
};

const contactDocDecrypted = {
  id: 'jon-snow',
  fullname: 'Jon Snow',
  email: 'jon@hbo.com',
  _id: 'id-string',
  _rev: 'id-string',
};

const invoiceDocDecrypted = {
  id: 'jon-invoice',
  recipient: {
    fullname: 'Jon Snow',
    email: 'jon@hbo.com',
  },
  rows: [
    {
      id: 'id-string',
      description: 'Dragons',
      price: '100',
      quantity: '3',
    },
  ],
  _id: 'id-string',
  _rev: 'id-string',
};

const mockData = {
  contactsRecords: [contactDoc],
  invoicesRecords: [invoiceDoc],
};

const mockDataDecrypted = {
  contactsRecords: [contactDocDecrypted],
  invoicesRecords: [invoiceDocDecrypted],
};

const getAllDocs = jest.fn(
  (dbName) =>
    new Promise((resolve, reject) => {
      switch (dbName) {
        case 'contacts':
          resolve(mockData.contactsRecords);
        case 'invoices':
          resolve(mockData.invoicesRecords);
        default:
          reject(new Error('Incorrect database!'));
      }
    })
);

const saveDoc = jest.fn(
  (dbName, doc) =>
    new Promise((resolve, reject) => {
      !dbName && reject(new Error('No database found!'));
      !doc && reject(new Error('No doc found!'));
      dbName === 'contacts' && resolve([...mockData.contactsRecords, doc]);
      dbName === 'invoices' && resolve([...mockData.invoicesRecords, doc]);
    })
);

const updateDoc = jest.fn(
  (dbName, doc) =>
    new Promise((resolve, reject) => {
      !dbName && reject(new Error('No database found!'));
      !doc && reject(new Error('No doc found!'));
      dbName === 'contacts' && resolve([...mockData.contactsRecords]);
      dbName === 'invoices' && resolve([...mockData.invoicesRecords]);
    })
);

const getSingleDoc = jest.fn(
  (dbName, docID) =>
    new Promise((resolve, reject) => {
      !dbName && reject(new Error('No database found!'));
      !docID && reject(new Error('No docID found!'));
      dbName === 'contacts' && resolve([...mockData.contactsRecords][0]);
      dbName === 'invoices' && resolve([...mockData.invoicesRecords][0]);
    })
);

const deleteDoc = jest.fn(
  (dbName, docId) =>
    new Promise((resolve, reject) => {
      !dbName && reject(new Error('No database found!'));
      !docId && reject(new Error('No docID found!'));
      if (dbName === 'contacts') {
        docId === contactDocDecrypted.id
          ? resolve([])
          : reject(new Error('No contact found!'));
      }
      if (dbName === 'invoices') {
        docId === invoiceDocDecrypted.id
          ? resolve([])
          : reject(new Error('No invoice found!'));
      }
    })
);

module.exports = {
  getAllDocs,
  getSingleDoc,
  saveDoc,
  updateDoc,
  deleteDoc,
  mockData,
  mockDataDecrypted,
};
