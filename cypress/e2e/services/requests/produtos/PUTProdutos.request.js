const payloadUpdateProduct = require("../../payloads/update-produto.json");
module.exports = {
  updateProduct(token, id, name) {
    return cy.request({
      method: "PUT",
      url: "produtos/" + id,
      body: {
        payloadUpdateProduct,
        name: payloadUpdateProduct.nome + name
      },
      FailOnStatusCode: false,
      headers: {
        Authorization: token,
      },
    });
  },
};
