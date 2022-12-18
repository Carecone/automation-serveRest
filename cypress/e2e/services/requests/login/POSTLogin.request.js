const payloadLogin = require('../../payloads/login.json')

function login() {
    return cy.request({
        method: 'POST',
        url: 'login',
        failOnStatusCode: false,
        body: payloadLogin
    })
}

export {login};