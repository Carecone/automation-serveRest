const payloadAddUser = require("../../payloads/add-usuario.json")

function addUser() {
    return cy.request({
        method: 'POST',
        url: 'usuarios',
        body: payloadAddUser,
        failOnStatusCode: false
    })
}

export { addUser }