const payloadUpdateUser = require('../../payloads/update-usuario.json')
const payloadUpdateUserFake = require('../../payloads/update-usuario-fake.json')

module.exports = {
    updateUser(id) {
        return cy.request({
            method: 'PUT',
            url: 'usuarios/' + id,
            body: payloadUpdateUser,
            failOnStatusCode: false
        })
    },

    updateUserFake(id) {
        return cy.request({
            method: 'PUT',
            url: 'usuarios/' + id,
            body: payloadUpdateUserFake,
            failOnStatusCode: false
        })
    }
}

