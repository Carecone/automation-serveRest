const payloadCarrinho = require("../../payloads/add-Carrinho.json");

module.exports = {
  addCarrinho(token, idPdt) {
    cy.readFile("add-Carrinho.json").then((carrinho) => {
      carrinho.produto[0].id = "newValue";
      cy.writeFile("add-Carrinho.json", data);
    });
    return cy.request({
      method: "POST",
      url: "carrinhos",
      body: payloadCarrinho,
      failOnStatusCode: false,
      headers: {
        Authorization: token,
      },
    });
  },
};
