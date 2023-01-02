const payloadLoginAdm = require("../../payloads/login-adm.json");
const payloadLogin = require("../../payloads/login.json");
module.exports = {
  login() {
    return cy.request({
      method: "POST",
      url: "login",
      failOnStatusCode: false,
      body: payloadLogin,
    });
  },

  loginAdm() {
    return cy.request({
      method: "POST",
      url: "login",
      failOnStatusCode: false,
      body: payloadLoginAdm,
    });
  },
};
