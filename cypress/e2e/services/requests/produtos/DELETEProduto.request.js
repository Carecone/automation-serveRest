module.exports = {
  deleteProduct(id, token) {
    return cy.request({
      method: "DELETE",
      url: "produtos/" + id,
      failOnStatusCode: false,
      headers: {
        Authorization: token
      }
    });
  },
};
