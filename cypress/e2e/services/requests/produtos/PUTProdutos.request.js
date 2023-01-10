const payloadUpdateProduct = require("../../payloads/update-produto.json");
module.exports = {
  updateProduct(token, id) {
    return cy.request({
      method: "PUT",
      url: "produtos/" + id,
      body: payloadUpdateProduct,
      failOnStatusCode: false,
      headers: {
        Authorization: token,
      },
    });
  },
};
