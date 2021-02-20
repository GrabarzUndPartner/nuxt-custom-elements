module.exports = {
  preset: '@nuxt/test-utils',
  collectCoverageFrom: [
    'lib/**/*.js',
    '!lib/plugin.js',
    '!lib/tmpl/entry.js'
  ],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/lib/$1',
    '^~~$': '<rootDir>',
    '^@@$': '<rootDir>',
    '^@/(.*)$': '<rootDir>/lib/$1'
  },
  transformIgnorePatterns: [
    `/node_modules/(?!${['@nuxt/i18m']})`],
  testPathIgnorePatterns: [
    // 'test/browser.test.js'
  ]
};
