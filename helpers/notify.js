const { Notification } = require('electron')

const Notify = ({ title, body }) =>
  new Notification(title, {
    body,
  });

module.exports = { Notify };
