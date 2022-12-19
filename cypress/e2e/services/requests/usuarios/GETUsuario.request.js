module.exports = {
    user(id) {
        return cy.request({
            method: 'GET',
            url: 'usuarios/' + id,
            failOnStatusCode: false
        })
    },

    allUsers() {
        return cy.request({
            method: "GET",
            url: "usuarios",
            failOnStatusCode: false,
        })
    }
}