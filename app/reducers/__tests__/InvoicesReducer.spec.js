import InvoicesReducer, { getInvoices } from '../InvoicesReducer';
import * as ACTION_TYPES from '../../constants/actions.jsx';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';

const initialState = [];

describe('Invoices Reducer', () => {
  it('should handle initial state', () => {
    expect(InvoicesReducer(undefined, {})).toEqual([]);
  });

  let docs;
  beforeEach(() => {
    docs = [
      { id: uuidv4(), name: faker.name.findName() },
      { id: uuidv4(), name: faker.name.findName() },
      { id: uuidv4(), name: faker.name.findName() },
    ];
  });

  it('should handle get all invoices', () => {
    expect(
      InvoicesReducer(initialState, {
        type: ACTION_TYPES.INVOICE_GET_ALL,
        payload: docs,
      })
    ).toEqual(docs);
  });

  it('should handle save invoice', () => {
    expect(
      InvoicesReducer(initialState, {
        type: ACTION_TYPES.INVOICE_SAVE,
        payload: docs,
      })
    ).toEqual(docs);
  });

  it('should handle get delete invoice', () => {
    expect(
      InvoicesReducer(initialState, {
        type: ACTION_TYPES.INVOICE_DELETE,
        payload: docs,
      })
    ).toEqual(docs);
  });
});

// Test Selectors
const state = {
  invoices: initialState,
};

describe('Invoices Selector', () => {
  it('should return invoices list', () => {
    expect(getInvoices(state)).toEqual(state.invoices);
  });
});
