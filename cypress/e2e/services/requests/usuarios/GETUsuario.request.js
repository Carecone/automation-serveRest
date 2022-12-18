function allUsers() {
    return cy.request({
        method: "GET",
        url: "usuarios",
        failOnStatusCode: false,
    })
}

export { allUsers};