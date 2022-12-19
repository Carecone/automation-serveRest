const payloadAddUser = require("../../payloads/add-usuario.json")

module.exports = {
    addUser() {
        return cy.request({
            method: 'POST',
            url: 'usuarios',
            body: payloadAddUser,
            failOnStatusCode: false
        })
    }
}
