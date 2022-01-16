module.exports = {
  require: jest.fn((name) => {
    if (name === 'electron-settings') {
      return {
        setSync: jest.fn(),
        getSync: jest.fn(() => 'someSettings'),
      };
    }
  })
};
