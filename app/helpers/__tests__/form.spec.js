// Libs
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import omit from 'lodash';
import i18n from '../../../i18n/i18n';
import { decryptData } from '../../../test/helper';

// Helpers to test
import {
  getInvoiceData,
  validateFormData,
  validateRecipient,
  validateRows,
  validateDueDate,
  validateCurrency,
  validateDiscount,
  validateTax,
  validateNote,
  setEditRecipient,
} from '../form';

// Mocks
jest.mock('../../renderers/dialog');
const openDialog = require('../../renderers/dialog');

describe('getInvoiceData', () => {
  let formData;
  beforeEach(() => {
    formData = {
      invoiceID: 'Invoice: 123-456-789',
      recipient: {
        newRecipient: true,
        select: {
          id: uuidv4(),
          fullname: faker.name.findName(),
          email: faker.internet.email(),
          company: faker.company.companyName(),
          phone: faker.phone.phoneNumber(),
        },
        new: {
          fullname: faker.name.findName(),
          email: faker.internet.email(),
        },
      },
      rows: [
        {
          id: uuidv4(),
          description: faker.commerce.productName(),
          price: faker.commerce.price(),
          quantity: faker.datatype.number(100),
        },
        {
          id: uuidv4(),
          description: faker.commerce.productName(),
          price: faker.commerce.price(),
          quantity: faker.datatype.number(100),
        },
      ],
      dueDate: {
        selectedDate: null,
        paymentTerm: null,
        useCustom: true,
      },
      currency: {
        code: 'USD',
        placement: 'before',
        fraction: 2,
        separator: 'commaDot',
      },
      discount: {},
      tax: {},
      note: {},
      payment: {},
      settings: {
        editMode: {
          active: false,
        },
        open: false,
        required_fields: {
          invoiceID: false,
          dueDate: false,
          currency: false,
          discount: false,
          tax: false,
          note: false,
          payment: false,
        },
      },
      savedSettings: {
        tax: {},
        currency: {
          code: 'USD',
          placement: 'before',
          fraction: 2,
          separator: 'commaDot',
        },
        payment: {},
        required_fields: {
          invoiceID: false,
          dueDate: false,
          currency: false,
          discount: false,
          tax: false,
          note: false,
          payment: false,
        },
      },
    };
  });

  it('Should return correct data shape', () => {
    const invoiceData = getInvoiceData(formData);

    // Include custom invoiceID
    expect(invoiceData).not.toHaveProperty('invoiceID');
    // Include Rows & Recipient Data
    expect(invoiceData).toHaveProperty('currentInvoiceData');
    expect(invoiceData).toHaveProperty('recipient');

    // Not include non-required data
    expect(invoiceData).not.toHaveProperty('dueDate');
    expect(invoiceData).not.toHaveProperty('discount');
    expect(invoiceData).not.toHaveProperty('tax');
    expect(invoiceData).not.toHaveProperty('note');
    expect(invoiceData).not.toHaveProperty('settings');
    expect(invoiceData).not.toHaveProperty('savedSettings');
  });

  it('Should return rows data correctly', () => {
    const invoiceData = getInvoiceData(formData);
    const currentInvoiceData = decryptData({
      content: invoiceData.currentInvoiceData.content,
    });
    expect(currentInvoiceData.rows.length).toEqual(2);
  });

  it('should return correct recipient data', () => {
    let invoiceData = getInvoiceData(formData);
    let recipient = decryptData({ content: invoiceData.recipient.content });

    // Filter out data
    expect(recipient).not.toHaveProperty('new');
    expect(recipient).not.toHaveProperty('select');
    expect(recipient).not.toHaveProperty('newRecipient');

    // Choose new contact data
    expect(recipient).toHaveProperty('fullname');
    expect(recipient).toHaveProperty('email');
    expect(recipient).not.toHaveProperty('company');
    expect(recipient).not.toHaveProperty('phone');

    // Choose selected contact data
    (formData.recipient.newRecipient = false),
      (invoiceData = getInvoiceData(formData));
    recipient = decryptData({ content: invoiceData.recipient.content });

    expect(recipient).toHaveProperty('fullname');
    expect(recipient).toHaveProperty('email');
    expect(recipient).toHaveProperty('company');
    expect(recipient).toHaveProperty('phone');
    expect(recipient).toHaveProperty('id');
  });

  it('should return dueDate data when required', () => {
    const newFormData = { ...formData, dueDate: {
        selectedDate: {
          date: 20,
          months: 9,
          years: 2017,
        },
        useCustom: true,
        paymentTerm: null,
      },
      settings: { ...formData.settings, required_fields: { ...formData.settings.required_fields, dueDate: true,},},};
    const invoiceData = getInvoiceData(newFormData);
    const currentInvoiceData = decryptData({
      content: invoiceData.currentInvoiceData.content,
    });
    expect(currentInvoiceData.dueDate).toEqual({
      selectedDate: {
        date: 20,
        months: 9,
        years: 2017,
      },
      useCustom: true,
      paymentTerm: null,
    });
    expect(currentInvoiceData.dueDate).not.toEqual({
      date: 2,
      months: 10,
      years: 2016,
    });
  });

  it('should return currency data when required', () => {
    const newFormData = { ...formData, settings: { ...formData.settings, required_fields: { ...formData.settings.required_fields, currency: true,},},};

    const invoiceData = getInvoiceData(newFormData);
    const currentInvoiceData = decryptData({
      content: invoiceData.currentInvoiceData.content,
    });
    expect(currentInvoiceData.currency).toEqual({
      code: 'USD',
      placement: 'before',
      fraction: 2,
      separator: 'commaDot',
    });
    expect(currentInvoiceData.dueDate).not.toEqual({
      code: 'VND',
      placement: 'after',
      fraction: 0,
      separator: 'spaceDot',
    });
  });

  it('should return tax data when required', () => {
    const newFormData = { ...formData, tax: {
        amount: faker.datatype.number(20),
        method: 'reverse',
        tin: '123-456-789',
      },
      settings: { ...formData.settings, required_fields: { ...formData.settings.required_fields, tax: true,},},};
    const invoiceData = getInvoiceData(newFormData);
    const currentInvoiceData = decryptData({
      content: invoiceData.currentInvoiceData.content,
    });
    expect(currentInvoiceData.tax).toEqual(newFormData.tax);
  });

  it('should return discount when required', () => {
    const newFormData = { ...formData, discount: {
        amount: faker.datatype.number(20),
        type: 'flat',
      },
      settings: { ...formData.settings, required_fields: { ...formData.settings.required_fields, discount: true,},},};
    const invoiceData = getInvoiceData(newFormData);
    const currentInvoiceData = decryptData({
      content: invoiceData.currentInvoiceData.content,
    });
    expect(currentInvoiceData.discount).toEqual({
      type: newFormData.discount.type,
      amount: newFormData.discount.amount,
    });
  });

  it('should return note data when required', () => {
    const newFormData = { ...formData, note: {
        content: faker.lorem.paragraph(),
      },
      settings: { ...formData.settings, required_fields: { ...formData.settings.required_fields, note: true,},},};
    const invoiceData = getInvoiceData(newFormData);
    const currentInvoiceData = decryptData({
      content: invoiceData.currentInvoiceData.content,
    });
    expect(currentInvoiceData.note).toEqual(newFormData.note.content);
  });

  it('should return invoiceID data when required', () => {
    const newFormData = { ...formData, settings: { ...formData.settings, required_fields: { ...formData.settings.required_fields, invoiceID: true,},},};
    const invoiceData = getInvoiceData(newFormData);
    const currentInvoiceData = decryptData({
      content: invoiceData.currentInvoiceData.content,
    });
    expect(currentInvoiceData.invoiceID).toEqual('Invoice: 123-456-789');
  });

  it('should return correct metadata on editMode', () => {
    const invoiceID = uuidv4();
    const invoiceRev = uuidv4();
    const createdDate = Date.now();
    const newFormData = { ...formData, settings: { ...formData.settings, editMode: { ...formData.settings.editMode, active: true,
          data: { ...omit(formData, ['settings, savedSettings']), _id: invoiceID,
            _rev: invoiceRev,
            created_at: createdDate,},},},};
    const invoiceData = getInvoiceData(newFormData);
    const currentInvoiceData = decryptData({
      content: invoiceData.currentInvoiceData.content,
    });
    
    expect(invoiceData.currentInvoiceData._id).toEqual(invoiceID);
    expect(invoiceData.currentInvoiceData._rev).toEqual(invoiceRev);
    expect(currentInvoiceData.created_at).toEqual(createdDate);
  });

  // TODO
  test.todo('set status as pending when creating a new invoice');
  test.todo('always generate _id when creating a new invoice');
  test.todo('does not include _rev when creating a new invoice');
  test.todo('always recalculate subTotal and grandTotal');
});

describe('validateFormData', () => {
  let formData;
  beforeEach(() => {
    formData = {
      invoiceID: 'Invoice 123-456-789',
      recipient: {
        newRecipient: true,
        select: {},
        new: {
          fullname: faker.name.findName(),
          email: faker.internet.email(),
          company: faker.company.companyName(),
          phone: faker.phone.phoneNumber(),
        },
      },
      rows: [
        {
          id: uuidv4(),
          description: faker.commerce.productName(),
          price: faker.commerce.price(),
          quantity: faker.datatype.number(100),
        },
      ],
      dueDate: {
        selectedDate: faker.date.future(),
        useCustom: true,
        paymentTerm: null,
      },
      currency: {
        code: 'USD',
        placement: 'before',
        fraction: 2,
        separator: 'commaDot',
      },
      discount: {
        type: 'percentage',
        amount: 10,
      },
      tax: {
        amount: 10,
        method: 'reverse',
        tin: '123-456-789',
      },
      note: {
        content: faker.lorem.paragraph(),
      },
      settings: {
        open: false,
        required_fields: {
          invoiceID: true,
          dueDate: true,
          currency: true,
          discount: true,
          tax: true,
          note: true,
        },
      },
      payment: {},
      savedSettings: {
        tax: {
          amount: 10,
          method: 'reverse',
          tin: '123-456-789',
        },
        currency: {
          code: 'USD',
          placement: 'before',
          fraction: 2,
          separator: 'commaDot',
        },
        payment: {},
        required_fields: {
          invoiceID: true,
          dueDate: true,
          currency: true,
          discount: true,
          tax: true,
          note: true,
          payment: true,
        },
      },
    };
  });

  it('should PASS with CORRECT data', () => {
    const validation = validateFormData(formData);
    expect(validation).toEqual(true);
  });

  it('should NOT pass with INCORRECT recipient data', () => {
    const newFormData = { ...formData, recipient: { ...formData.recipient, new: {},},};
    const validation = validateFormData(newFormData);
    expect(validation).toEqual(false);
  });

  it('should NOT pass with INCORRECT rows data', () => {
    formData.rows[0].price = 0;
    const validation = validateFormData(formData);
    expect(validation).toEqual(false);
  });

  it('should NOT pass with INCORRECT dueDate data', () => {
    formData.dueDate.selectedDate = null;
    const validation = validateFormData(formData);
    expect(validation).toEqual(false);
  });

  it('should NOT pass with INCORRECT currency data', () => {
    formData.currency = {
      code: 'USD',
      fraction: -1,
      separator: 'commaDot',
      placement: 'before',
    };
    const validation = validateFormData(formData);
    expect(validation).toEqual(false);
  });

  it('should NOT pass with INCORRECT discount data', () => {
    formData.discount.amount = 0;
    const validation = validateFormData(formData);
    expect(validation).toEqual(false);
  });

  it('should NOT pass with INCORRECT tax data', () => {
    formData.tax.amount = '';
    const validation = validateFormData(formData);
    expect(validation).toEqual(false);
  });

  it('should NOT pass with INCORRECT note data', () => {
    formData.note.content = '';
    const validation = validateFormData(formData);
    expect(validation).toEqual(false);
  });

  it('should NOT pass with INCORRECT invoiceID', () => {
    formData.invoiceID = '';
    const validation = validateFormData(formData);
    expect(validation).toEqual(false);
  });
});

describe('validateRecipient', () => {
  it('should validate data presence', () => {
    const recipient = {
      newRecipient: true,
      new: {},
    };
    const validation = validateRecipient(recipient);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:recipient:empty:title'),
      message: i18n.t('dialog:validation:recipient:empty:message'),
    });
  });

  it('should validate required fields data', () => {
    const recipient = {
      newRecipient: true,
      new: {
        email: faker.internet.email(),
        company: faker.company.companyName(),
      },
    };
    const validation = validateRecipient(recipient);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:recipient:requiredFields:title'),
      message: i18n.t('dialog:validation:recipient:requiredFields:message'),
    });
  });

  it('should validate email format', () => {
    const recipient = {
      newRecipient: true,
      new: {
        fullname: faker.name.findName(),
        email: 'invalid-email-address',
      },
    };
    const validation = validateRecipient(recipient);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:recipient:email:title'),
      message: i18n.t('dialog:validation:recipient:email:message'),
    });
  });

  it('should not validate selected contact', () => {
    const recipient = {
      newRecipient: false,
    };
    const validation = validateRecipient(recipient);
    expect(validation).toEqual(true);
  });

  it('should pass correct recipient data', () => {
    const recipient = {
      newRecipient: true,
      new: {
        fullname: faker.name.findName(),
        company: faker.company.companyName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
      },
    };
    const validation = validateRecipient(recipient);
    expect(validation).toEqual(true);
  });
});

describe('validateRows', () => {
  it('should validate item description', () => {
    const rows = [{ description: '' }];
    const validation = validateRows(rows);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:rows:emptyDescription:title'),
      message: i18n.t('dialog:validation:rows:emptyDescription:message'),
    });
  });

  it('should validate item price', () => {
    const rows = [
      {
        description: faker.commerce.productName(),
        price: 0,
      },
    ];
    const validation = validateRows(rows);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:rows:priceZero:title'),
      message: i18n.t('dialog:validation:rows:priceZero:message'),
    });
  });

  it('should validate item quantity', () => {
    const rows = [
      {
        description: faker.commerce.productName(),
        price: faker.commerce.price(),
        quantity: 0,
      },
    ];
    const validation = validateRows(rows);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:rows:qtyZero:title'),
      message: i18n.t('dialog:validation:rows:qtyZero:message'),
    });

    const rows2 = [
      {
        description: faker.commerce.productName(),
        price: faker.commerce.price(),
        quantity: -1,
      },
    ];
    const validation2 = validateRows(rows2);
    expect(validation2).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:rows:qtyZero:title'),
      message: i18n.t('dialog:validation:rows:qtyZero:message'),
    });
  });

  it('should pass correct rows data', () => {
    const rows = [
      {
        description: faker.commerce.productName(),
        price: faker.commerce.price(),
        quantity: faker.datatype.number(100),
      },
    ];
    const validation = validateRows(rows);
    expect(validation).toEqual(true);
  });
});

describe('validateDueDate', () => {
  it('should validate selectedDate', () => {
    const dueDate = {
      useCustom: true,
      selectedDate: null,
      paymentTerm: null,
    };
    const validation = validateDueDate(true, dueDate);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:dueDate:title'),
      message: i18n.t('dialog:validation:dueDate:message'),
    });
  });

  it('should pass when not required', () => {
    const dueDate = {
      selectedDate: null,
    };
    const validation = validateDueDate(false, dueDate);
    expect(validation).toEqual(true);
  });

  it('should pass correct dueDate data', () => {
    const dueDate = {
      selectedDate: faker.date.future(),
    };
    const validation = validateDueDate(true, dueDate);
    expect(validation).toEqual(true);
  });
});

describe('validateCurrency', () => {
  it('should validate Currency', () => {
    const currency = {
      code: 'USD',
      fraction: -1,
      separator: 'commaDot',
      placement: 'before',
    };
    const validation = validateCurrency(true, currency);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:currency:fraction:title'),
      message: i18n.t('dialog:validation:currency:fraction:message'),
    });
  });

  it('should pass when not required', () => {
    const currency = {};
    const validation = validateCurrency(false, currency);
    expect(validation).toEqual(true);
  });

  it('should pass correct currency data', () => {
    const currency = {
      code: 'USD',
      placement: 'before',
      fraction: 2,
      separator: 'commaDot',
    };
    const validation = validateCurrency(true, currency);
    expect(validation).toEqual(true);
  });
});

describe('validateDiscount', () => {
  it('should validate discount data', () => {
    const discount = {
      type: 'flat',
      amount: 0,
    };
    const validation = validateDiscount(true, discount);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:discount:title'),
      message: i18n.t('dialog:validation:discount:message'),
    });
  });

  it('should pass when not required', () => {
    const discount = {};
    const validation = validateDiscount(false, discount);
    expect(validation).toEqual(true);
  });

  it('should pass correct discount data', () => {
    const discount = {
      type: 'flat',
      amount: 10,
    };
    const validation = validateDiscount(true, discount);
    expect(validation).toEqual(true);
  });
});

describe('validateTax', () => {
  it('should validate tax data', () => {
    const tax1 = { amount: 0 };
    const tax2 = { amount: '' };
    const tax3 = { amount: -1 };
    const validation1 = validateTax(true, tax1);
    expect(validation1).toEqual(true);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:tax:title'),
      message: i18n.t('dialog:validation:tax:message'),
    });

    const validation2 = validateTax(true, tax2);
    expect(validation2).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:tax:title'),
      message: i18n.t('dialog:validation:tax:message'),
    });

    const validation3 = validateTax(true, tax3);
    expect(validation3).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:tax:title'),
      message: i18n.t('dialog:validation:tax:message'),
    });
  });

  it('should pass when not required', () => {
    const tax = {};
    const validation = validateTax(false, tax);
    expect(validation).toEqual(true);
  });

  it('should pass correct tax data', () => {
    const tax = {
      amount: 10,
    };
    const validation = validateTax(true, tax);
    expect(validation).toEqual(true);
  });
});

describe('validateNote', () => {
  it('should validate note data', () => {
    const note = {
      content: '',
    };
    const validation = validateNote(true, note);
    expect(validation).toEqual(false);
    expect(openDialog).toBeCalledWith({
      type: 'warning',
      title: i18n.t('dialog:validation:note:title'),
      message: i18n.t('dialog:validation:note:message'),
    });
  });

  it('should pass when not required', () => {
    const note = {};
    const validation = validateNote(false, note);
    expect(validation).toEqual(true);
  });

  it('should pass correct note data', () => {
    const note = {
      content: faker.lorem.paragraph(),
    };
    const validation = validateNote(true, note);
    expect(validation).toEqual(true);
  });
});

describe('set correct recipient information to use in edit mode', () => {
  let allContacts;
  beforeEach(() => {
    allContacts = [
      {
        _id: uuidv4(),
        fullname: faker.name.findName(),
        email: faker.internet.email(),
        company: faker.company.companyName(),
        phone: faker.phone.phoneNumber(),
      },
      {
        _id: uuidv4(),
        fullname: faker.name.findName(),
        email: faker.internet.email(),
        company: faker.company.companyName(),
        phone: faker.phone.phoneNumber(),
      },
      {
        _id: uuidv4(),
        fullname: faker.name.findName(),
        email: faker.internet.email(),
        company: faker.company.companyName(),
        phone: faker.phone.phoneNumber(),
      },
    ];
  });

  it('should return current contact if it exist', () => {
    const currentContact = allContacts[1];
    const editRecipient = setEditRecipient(allContacts, currentContact);
    expect(editRecipient).toEqual({
      newRecipient: false,
      select: currentContact,
    });
  });

  it('should create a new contact if the current contact does not exist', () => {
    const currentContact = {
      _id: 'random-string',
      fullname: faker.name.findName(),
      email: faker.internet.email(),
      company: faker.company.companyName(),
      phone: faker.phone.phoneNumber(),
    };
    const editRecipient = setEditRecipient(allContacts, currentContact);
    expect(editRecipient).toEqual({
      newRecipient: true,
      new: {
        fullname: currentContact.fullname,
        email: currentContact.email,
        company: currentContact.company,
        phone: currentContact.phone,
      },
    });
  });
});
