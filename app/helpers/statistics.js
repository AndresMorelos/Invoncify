const currentDate = new Date();
const currentMonthDays = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  0
);

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function dataDaysByMonth() {
  const dataDaysByMonth = Array.from(
    Array(currentMonthDays.getDate()).keys()
  ).map((value, index) => {
    const dateToFormat = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      index + 1
    );
    return {
      x: formatDate(dateToFormat),
      y: 0,
    };
  });

  return dataDaysByMonth;
}

function processData(name, invoices = []) {
  const currentData = dataDaysByMonth();

  invoices.forEach((invoice) => {
    let date;

    if (invoice.updated_at) {
      date = new Date(invoice.updated_at);
    } else {
      date = new Date(invoice.created_at);
    }

    for (const object of currentData) {
      if (object.x === formatDate(date)) {
        object.y += invoice.grandTotal;
      }
    }
  });

  return {
    id: name,
    data: currentData,
  };
}

function groupBy(key, invoices = []) {
  return invoices.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

function processCalendarData(key, invoices = []) {
  const data = groupBy(key, invoices);
  return Object.entries(data).map((item) => ({
    value: item[1].length,
    day: item[0],
  }));
}

function processPieData(key, invoices) {
  const data = groupBy(key, invoices);

  return Object.entries(data).map((item) => ({
    id: item[0],
    label: item[0],
    value: item[1].length,
  }));
}

module.exports = {
  processData,
  processCalendarData,
  formatDate,
  processPieData,
};
