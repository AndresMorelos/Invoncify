module.exports = {
  bail: true,
  // verbose: true,
  collectCoverage: true,
  setupFiles: ['./jest.shim.js', './jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/test/'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@styles/(.*)$': '<rootDir>/static/css/$1',
    '^@images/(.*)$': ['<rootDir>/static/imgs/$1', '<rootDir>/tour/imgs/$1'],
    '^@components/(.*)$': [
      '<rootDir>/app/components/$1',
      '<rootDir>/preview/components/$1',
      '<rootDir>/tour/components/$1',
    ],
  },
};
