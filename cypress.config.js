/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    projectId: 'x3bmp5',
    baseUrl: 'https://vollmedclient.vercel.app/',
    video: false,
    // video: true,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: true,
      json: false,
      timestamp: "mmddyyyy_HHMMss"
    },
    defaultCommandTimeout: 600000

  },

  // env: {
  //   "email": "clinica@gmail.com",
  //   "senha": "4321",
  //   "api_login": "http://localhost:8080/auth/login",
  //   "api_clinica": "http://localhost:8080/clinica",
  //   "api_especialista": "http://localhost:8080/especialista",
  //   "requestMode": true
  // }

});
