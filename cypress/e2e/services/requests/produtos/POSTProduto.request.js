module.exports ={
    addProduct() {
        return cy.request({
            method: POST
        })
    }
}