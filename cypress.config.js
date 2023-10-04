const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  e2e: {
    specPattern: '**/*.feature',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('file:preprocessor', cucumber());
    },
    baseUrl : 'https://themoviedb.org',
    //testIsolation: false
  },
  chromeWebSecurity: false,
  pageLoadTimeout: 20000, //bisa ditambah kalau koneksi agak lemot
  defaultCommandTimeout: 10000,
  env: {
    username: '',
    password: ''
  },
  video: false
});
