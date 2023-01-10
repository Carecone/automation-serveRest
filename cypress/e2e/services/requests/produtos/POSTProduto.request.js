const payloadPostProduct = require("../../payloads/add-produto.json");
module.exports = {
  addProduct(token) {
    return cy.request({
      method: "POST",
      url: "produtos",
      body: payloadPostProduct,
      failOnStatusCode: false,
      headers: {
        Authorization: token,
      },
    });
  },
};
