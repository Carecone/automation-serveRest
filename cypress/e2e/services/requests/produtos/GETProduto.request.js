module.exports = {
  getProduct(id) {
    return cy.request({
      method: "GET",
      url: "produtos/" + id,
      failOnStatusCode: false,
    });
  },

  getAllProduct() {
    return cy.request({
      method: "GET",
      url: "produtos",
      failOnStatusCode: false,
    });
  },
};
