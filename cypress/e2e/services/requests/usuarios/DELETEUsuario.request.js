module.exports = {
    deleteUser(idUser) {
        return cy.request({
            method: 'DELETE',
            url: 'usuarios/' + idUser,
            failOnStatusCode: false,
        })
    }
}

