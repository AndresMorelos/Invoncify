function getInvoiceValue(data) {
  function calSub(data) {
    return data.rows.reduce((value, row) => value + row.subtotal, 0);
  }

  function calDiscount(data) {
    if (data.discount) {
      if (data.discount.type === 'percentage') {
        const subtotal = calSub(data);
        return subtotal * data.discount.amount / 100;
      }
      return data.discount.amount;
    }
  }

  function calTax(data) {
    if (data.tax) {
      const subtotal = calSub(data);
      if (data.discount) {
        const discount = calDiscount(data);
        const afterDiscount = subtotal - discount;
        return afterDiscount * data.tax.amount / 100;
      }
      return subtotal * data.tax.amount / 100;
    }
  }

  function calTotal() {
    let grandTotal = calSub(data);
    if (data.discount) {
      const discountAmount = calDiscount(data);
      grandTotal -= discountAmount;
    }
    if (data.tax) {
      const taxAmount = calTax(data);
      if (data.tax.method === 'default') {
        grandTotal += taxAmount;
      }
    }
    return grandTotal;
  }

  function calPrePayments(data) {
    if (Array.isArray(data.paymentRows) && data.paymentRows.length > 0) {
      return data.paymentRows.reduce((value, row) => value + row.value, 0);
    }
    return 0
  }

  function calcRemaining() {
    let grandTotal = calTotal();


    const prepayment = calPrePayments(data);

    grandTotal -= prepayment;


    return grandTotal;
  }

  return {
    subtotal: calSub(data),
    discount: calDiscount(data),
    taxAmount: calTax(data),
    prepayment: calPrePayments(data),
    remaining: calcRemaining(),
    grandTotal: calTotal(),
  };
}

export { getInvoiceValue };
